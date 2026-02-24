// Helper para conectar a MongoDB usando mongoose
// - Lee `MONGODB_URI` y `MONGODB_DB` desde variables de entorno
const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    console.log(`✅ MongoDB: Connected to ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectMongo;