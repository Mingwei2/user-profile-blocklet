import Database from 'better-sqlite3';

import logger from './logger';

const DB_FILE = process.env.DB_FILE || 'db/database.sqlite';
let db: Database.Database | null = null;

function connectToDatabase() {
  if (!db) {
    try {
      db = new Database(DB_FILE);
      logger.info(`SQLite database connected: ${DB_FILE}`);
    } catch (err) {
      logger.error('Failed to connect to SQLite database:', err);
      throw err;
    }
  }
  return db;
}

function closeDatabase() {
  if (db) {
    try {
      db.close();
      logger.info('SQLite database connection closed.');
    } catch (err) {
      logger.error('Failed to close SQLite database connection:', err);
    }
  }
}

process.on('SIGINT', () => {
  closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', () => {
  closeDatabase();
  process.exit(0);
});

export default connectToDatabase();
