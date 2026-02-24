// Servicio para migrar datos desde un CSV hacia PostgreSQL y MongoDB
// - Lee el CSV, inserta/actualiza filas en PostgreSQL y añade registros en MongoDB
// - Diseñado para ser sencillo; para volúmenes grandes habría que optimizar (batching, transacciones)
const fs = require('fs');
const csv = require('csv-parser');
const { pool } = require('../config/postgres');
const PatientHistory = require('../models/PatientHistory');

const migrateData = async (csvPath) => {
    const results = [];
    
    return new Promise((resolve, reject) => {
        // Validación: existe el archivo CSV
        if (!fs.existsSync(csvPath)) {
            return reject(new Error(`El archivo CSV no existe en la ruta: ${csvPath}`));
        }

        // Lectura secuencial del CSV
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    console.log(`Iniciando procesamiento de ${results.length} filas...`);

                    // NOTA: Este bucle realiza operaciones síncronas await por fila.
                    // Para grandes conjuntos de datos se recomienda:
                    // - usar transacciones por lote en PostgreSQL
                    // - agrupar inserts (COPY) o usar bulk inserts
                    // - manejar la concurrencia al empujar a MongoDB

                    for (const row of results) {
                        // 1) SQL: Insertar/Obtener Seguro (aseguradora)
                        const insRes = await pool.query(
                            'INSERT INTO insurance (insurance_name) VALUES ($1) ON CONFLICT (insurance_name) DO UPDATE SET insurance_name = EXCLUDED.insurance_name RETURNING insurance_id',
                            [row.insurance_provider]
                        );
                        const insuranceId = insRes.rows[0].insurance_id;

                        // 2) SQL: Insertar/Obtener Doctor
                        const docRes = await pool.query(
                            'INSERT INTO doctor (doctor_name, doctor_email, specialty) VALUES ($1, $2, $3) ON CONFLICT (doctor_email) DO UPDATE SET doctor_name = EXCLUDED.doctor_name RETURNING doctor_id',
                            [row.doctor_name, row.doctor_email, row.specialty]
                        );
                        const doctorId = docRes.rows[0].doctor_id;

                        // 3) SQL: Insertar/Obtener Paciente
                        const patRes = await pool.query(
                            'INSERT INTO patient (patient_name, patient_email, patient_phone, patient_address, insurance_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (patient_email) DO UPDATE SET patient_name = EXCLUDED.patient_name RETURNING patient_id',
                            [row.patient_name, row.patient_email, row.patient_phone, row.patient_address, insuranceId]
                        );
                        const patientId = patRes.rows[0].patient_id;

                        // 4) SQL: Insertar Tratamiento (si no existe)
                        await pool.query(
                            'INSERT INTO treatment (treatment_code, treatment_description, treatment_cost) VALUES ($1, $2, $3) ON CONFLICT (treatment_code) DO NOTHING',
                            [row.treatment_code, row.treatment_description, row.treatment_cost]
                        );

                        // 5) SQL: Insertar Cita
                        await pool.query(
                            'INSERT INTO appointment (appointment_date, patient_id, doctor_id, treatment_code, coverage_percentage, amount_paid) VALUES ($1, $2, $3, $4, $5, $6)',
                            [row.appointment_date, patientId, doctorId, row.treatment_code, row.coverage_percentage, row.amount_paid]
                        );

                        // 6) NoSQL: Actualizar Historial en MongoDB (documento por paciente)
                        //    - Usamos findOneAndUpdate con upsert: true para crear/actualizar
                        await PatientHistory.findOneAndUpdate(
                            { patientEmail: row.patient_email },
                            { 
                                patientName: row.patient_name,
                                $push: { 
                                    appointments: {
                                        appointmentDate: row.appointment_date,
                                        doctorName: row.doctor_name,
                                        specialty: row.specialty,
                                        treatmentDescription: row.treatment_description,
                                        treatmentCost: row.treatment_cost,
                                        insuranceName: row.insurance_provider,
                                        amountPaid: row.amount_paid
                                    } 
                                }
                            },
                            { upsert: true }
                        );
                    }
                    resolve({ ok: true, count: results.length });
                } catch (error) {
                    // Rechazamos con el error para que el llamador lo maneje
                    reject(error);
                }
            });
    });
};

module.exports = { migrateData };