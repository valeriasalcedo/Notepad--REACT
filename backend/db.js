import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg; // Extrae Pool del módulo importado

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'Notely',
    password: process.env.DB_PASSWORD || 'skyetonti',
    port: process.env.DB_PORT || 5432,
});

// Exportar el pool para usarlo en otros módulos
export default pool;
