import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'database.db')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    subscription TEXT DEFAULT 'free',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    keyword TEXT NOT NULL,
    volume INTEGER,
    difficulty INTEGER,
    cpc REAL,
    competition TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    keywordId INTEGER,
    title TEXT NOT NULL,
    outline TEXT,
    content TEXT,
    seoOptimized TEXT,
    status TEXT DEFAULT 'draft',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (keywordId) REFERENCES keywords(id) ON DELETE SET NULL
  );
`)

// Insert demo user if not exists
const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('test@example.com')
if (!existingUser) {
  db.prepare('INSERT INTO users (name, email, password, subscription) VALUES (?, ?, ?, ?)').run(
    'Hảo',
    'test@example.com',
    'password',
    'free'
  )
}

console.log('✅ Database initialized successfully!')

export default db