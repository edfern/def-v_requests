require('dotenv').config();

const DATABASE_USER = {
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || 'fernando',
  database: process.env.DATABASE_DB || 'solicitudes',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const PROFESSOR_BY_NAME = 'SELECT * FROM professors ORDER BY name';

module.exports = {
  database: DATABASE_USER,
  PROFESSOR_BY_NAME,
};

