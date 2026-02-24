const { pool } = require('./postgres');

// Inicializa el esquema de la base de datos SQL si no existe
// - Ejecuta varias sentencias CREATE TABLE IF NOT EXISTS
// - Diseñado para ser idempotente: puede llamarse cada vez al iniciar
const initDatabase = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS insurance (
        insurance_id SERIAL PRIMARY KEY,
        insurance_name VARCHAR(100) UNIQUE NOT NULL,
        insurance_phone VARCHAR(20),
        insurance_address VARCHAR(150)
    );

    CREATE TABLE IF NOT EXISTS patient (
        patient_id SERIAL PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        patient_email VARCHAR(100) UNIQUE NOT NULL,
        patient_phone VARCHAR(20),
        patient_address VARCHAR(150),
        insurance_id INT REFERENCES insurance(insurance_id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS doctor (
        doctor_id SERIAL PRIMARY KEY,
        doctor_name VARCHAR(100) NOT NULL,
        doctor_email VARCHAR(100) UNIQUE NOT NULL,
        specialty VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS treatment (
        treatment_code VARCHAR(10) PRIMARY KEY,
        treatment_description VARCHAR(150) NOT NULL,
        treatment_cost NUMERIC(10,2) NOT NULL CHECK (treatment_cost >= 0)
    );

    CREATE TABLE IF NOT EXISTS appointment (
        appointment_id SERIAL PRIMARY KEY,
        appointment_date DATE NOT NULL,
        patient_id INT NOT NULL REFERENCES patient(patient_id) ON DELETE CASCADE,
        doctor_id INT NOT NULL REFERENCES doctor(doctor_id) ON DELETE CASCADE,
        treatment_code VARCHAR(10) NOT NULL REFERENCES treatment(treatment_code) ON DELETE RESTRICT,
        coverage_percentage NUMERIC(5,2) CHECK (coverage_percentage BETWEEN 0 AND 100),
        amount_paid NUMERIC(10,2) NOT NULL CHECK (amount_paid >= 0)
    );
  `;

  try {
    await pool.query(queryText);
    console.log('✅ PostgreSQL: Esquema creado exitosamente');
  } catch (err) {
    console.error('❌ PostgreSQL Error al crear esquema:', err);
    throw err;
  }
};

module.exports = initDatabase;