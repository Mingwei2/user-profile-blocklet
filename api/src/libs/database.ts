import Database from 'better-sqlite3';

import logger from './logger';

const DB_FILE = 'db/database.sqlite';
const db = (() => {
  try {
    const database = new Database(DB_FILE);
    logger.info(`SQLite database connected: ${DB_FILE}`);
    return database;
  } catch (err) {
    logger.error('Failed to connect to SQLite database:', err);
    throw err;
  }
})();

export default db;
