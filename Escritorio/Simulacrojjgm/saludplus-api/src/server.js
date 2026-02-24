// Servidor principal de la API
// - Carga variables de entorno desde `.env` (si existe)
// - Inicializa conexiones a MongoDB y PostgreSQL
// - Monta rutas y arranca el servidor
const express = require('express');
const fs = require('fs');
const path = require('path');
const connectMongo = require('./config/mongodb');
const { pool } = require('./config/postgres');
const initDatabase = require('./config/init_db');
const simulacroRoutes = require('./routes/simulacro');

// CARGA MANUAL DE VARIABLES desde `.env` (útil en entornos sin `dotenv`)
// Si existe, parsea el fichero y añade variables a `process.env`.
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

console.log('--- DIAGNÓSTICO DE VARIABLES ---');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ CARGADA' : '❌ NO ENCONTRADA');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ CARGADA' : '❌ NO ENCONTRADA');
console.log('--------------------------------');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en peticiones
app.use(express.json());

// Monta las rutas del simulacro bajo /api/simulacro
// - `simulacroRoutes` incluye endpoints para migración, reportes y consultas
app.use('/api/simulacro', simulacroRoutes);

const startServer = async () => {
    try {
        if (!process.env.MONGODB_URI) throw new Error("Falta MONGODB_URI");

        // 1) Conexión a MongoDB (NoSQL)
        //    - Contiene historial rápido de pacientes (documentos)
        await connectMongo();

        // 2) Comprobación de PostgreSQL (SQL relacional) y creación de tablas
        //    - pool.query('SELECT NOW()') sirve para verificar la conexión
        await pool.query('SELECT NOW()');
        console.log('✅ PostgreSQL: Connected successfully');
        // initDatabase crea tablas necesarias si no existen
        await initDatabase();
        console.log('✅ PostgreSQL: Tables checked/created');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error.message);
        process.exit(1);
    }
};

startServer();