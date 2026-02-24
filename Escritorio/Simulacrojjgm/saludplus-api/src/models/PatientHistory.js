const mongoose = require('mongoose');

// Esquema MongoDB para almacenar el historial clínico por paciente
// - `patientEmail` es único y permite recuperar el documento rápidamente
// - `appointments` está embebido para lecturas rápidas sin JOINs
const PatientHistorySchema = new mongoose.Schema({
  patientEmail: { type: String, unique: true, required: true },
  patientName: String,
  // Aquí "incrustamos" las citas para que la lectura sea ultra rápida (sin JOINs)
  appointments: [{
    appointmentDate: Date,
    doctorName: String,
    specialty: String,
    treatmentDescription: String,
    treatmentCost: Number,
    insuranceName: String,
    amountPaid: Number
  }]
});

module.exports = mongoose.model('PatientHistory', PatientHistorySchema);