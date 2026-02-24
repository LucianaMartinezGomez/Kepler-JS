**Proyecto**: SaludPlus - API de migración y consulta

- **Propósito**: Este repositorio contiene una API Express que migra datos desde un CSV hacia PostgreSQL (esquema relacional) y MongoDB (historial por paciente), además de exponer consultas/reportes.

**Archivos clave comentados**
- `src/server.js`: arranque, carga de variables, conexión a DBs y montaje de rutas.
- `src/config/*.js`: helpers para PostgreSQL y MongoDB; `init_db.js` crea tablas si no existen.
- `src/routes/simulacro.js`: endpoints para migración y consultas.
- `src/services/migrationService.js`: lógica de migración CSV -> PostgreSQL + MongoDB.
- `src/models/PatientHistory.js`: esquema MongoDB para historial.

**Requisitos**
- Docker y Docker Compose (recomendado para levantar BD locales)
- Node.js (v18+ recomendado) y npm

**Variables de entorno (.env)**
- `PORT` (opcional) — puerto donde corre la API
- `DATABASE_URL` — conexión PostgreSQL, ejemplo: `postgresql://user:pass@localhost:5433/db`
- `MONGODB_URI` — URI MongoDB, ejemplo: `mongodb://localhost:27017`
- `MONGODB_DB` — nombre de la base de datos Mongo
- `SIMULACRO_CSV_PATH` — ruta al CSV de datos (por defecto `./data/simulacro_saludplus_data.csv`)

**Levantar bases con Docker Compose**
```bash
docker-compose up -d
```

**Instalar dependencias y ejecutar la API (sin Docker)**
```bash
npm install
node src/server.js
```

**Migrar datos desde CSV**
- Endpoint: `POST /api/simulacro/migrate`
- Ejemplo con `curl`:
```bash
curl -X POST http://localhost:3000/api/simulacro/migrate
```

**Comprobaciones rápidas**
- PostgreSQL: conectar con psql en el puerto `5433` (según `docker-compose`) y consultar tablas: `SELECT COUNT(*) FROM patient;`
- MongoDB: conectar con `mongosh` y revisar colección `patienthistories` (o similar): `db.patienthistories.find().pretty()`

**Notas de diseño y recomendaciones**
- La migración actual hace inserts/updates fila a fila. Para grandes volúmenes se recomienda optimizar con bulk inserts o COPY y transacciones.
- El historial de paciente se guarda como documento embebido para lecturas rápidas.
- Las tablas se crean si no existen al iniciar el servidor (`init_db.js`).

Si quieres, puedo:
- Ejecutar la migración ahora y verificar resultados.
- Añadir tests automatizados o scripts `npm` para ejecutar la migración.


Servicio,Host,Puerto,Usuario / DB,Contraseña
PostgreSQL,localhost,5432,user_salud / saludplus_db,password_salud
MongoDB,localhost,27017,saludplus_nosql,(Sin contraseña)