import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Database from 'better-sqlite3'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Initialize Database
const dbPath = path.join(process.cwd(), 'database.db')
const db = new Database(dbPath)
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    subscription TEXT DEFAULT 'free',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
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
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    keywordId INTEGER,
    title TEXT NOT NULL,
    content TEXT,
    status TEXT DEFAULT 'draft',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (keywordId) REFERENCES keywords(id)
  );
`)

// Insert demo user
try {
  db.prepare('INSERT INTO users (name, email, password, subscription) VALUES (?, ?, ?, ?)').run(
    'Hảo', 'test@example.com', 'password', 'free'
  )
} catch (e) {
  // User already exists
}

console.log('✅ Database initialized!')

// ============ ROUTES ============

app.get('/', (req, res) => {
  res.json({ message: 'KIẾN GIÁ SEO Backend', status: 'running' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// ============ AUTH ============

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password)
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64')
    
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ KEYWORDS ============

app.post('/api/keywords/search', (req, res) => {
  const { keyword } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  try {
    const user = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Mock data
    const mockKeywords: any = {
      'seo': [
        { keyword: 'seo tips', volume: 8900, difficulty: 52, cpc: 3.2, competition: 'High' },
        { keyword: 'seo for beginners', volume: 6700, difficulty: 35, cpc: 2.8, competition: 'Medium' },
        { keyword: 'seo tools', volume: 5400, difficulty: 48, cpc: 2.9, competition: 'High' },
      ],
    }
    
    const results = mockKeywords[keyword.toLowerCase()] || [
      {
        keyword: keyword,
        volume: Math.floor(Math.random() * 10000),
        difficulty: Math.floor(Math.random() * 100),
        cpc: (Math.random() * 5).toFixed(2),
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      }
    ]
    
    // Save to database
    results.forEach((kw: any) => {
      db.prepare(`
        INSERT INTO keywords (userId, keyword, volume, difficulty, cpc, competition)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(user.id, kw.keyword, kw.volume, kw.difficulty, kw.cpc, kw.competition)
    })
    
    res.json({ results })
  } catch (err: any) {
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

app.get('/api/keywords/my-searches', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  try {
    const user = JSON.parse(Buffer.from(token, 'base64').toString())
    
    const keywords = db.prepare(`
      SELECT * FROM keywords WHERE userId = ? ORDER BY createdAt DESC LIMIT 50
    `).all(user.id)
    
    res.json({ keywords })
  } catch (err: any) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ ARTICLES ============

app.post('/api/content/generate', (req, res) => {
  const { keyword, step } = req.body
  
  const mockContent: any = {
    1: { content: { keyword } },
    2: { content: { keyword, outline: `1. Intro\n2. Why ${keyword} Matters\n3. Best Practices` } },
    3: { content: { keyword, article: `# ${keyword}\n\nComprehensive guide...` } },
    4: { content: { seoOptimized: `Meta Title: ${keyword}` } },
    5: { content: { internalLinks: [`Check our ${keyword} guide`] } },
    6: { content: { keyword } }
  }
  
  res.json({ content: mockContent[step] || {} })
})

app.post('/api/content/publish', (req, res) => {
  const { keyword, title, article } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  try {
    const user = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Save article to database
    const result = db.prepare(`
      INSERT INTO articles (userId, title, content, status)
      VALUES (?, ?, ?, 'published')
    `).run(user.id, title, article)
    
    res.json({
      message: 'Content published successfully',
      id: result.lastInsertRowid
    })
  } catch (err: any) {
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

app.get('/api/content/my-articles', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  try {
    const user = JSON.parse(Buffer.from(token, 'base64').toString())
    
    const articles = db.prepare(`
      SELECT * FROM articles WHERE userId = ? ORDER BY createdAt DESC LIMIT 50
    `).all(user.id)
    
    res.json({ articles })
  } catch (err: any) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ============ USER ============

app.get('/api/user/stats', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  try {
    const user = JSON.parse(Buffer.from(token, 'base64').toString())
    
    const keywordCount = db.prepare('SELECT COUNT(*) as count FROM keywords WHERE userId = ?').get(user.id) as any
    const articleCount = db.prepare('SELECT COUNT(*) as count FROM articles WHERE userId = ?').get(user.id) as any
    const publishedCount = db.prepare('SELECT COUNT(*) as count FROM articles WHERE userId = ? AND status = ?').get(user.id, 'published') as any
    
    res.json({
      stats: {
        totalKeywords: keywordCount.count,
        totalArticles: articleCount.count,
        articlesPublished: publishedCount.count
      }
    })
  } catch (err: any) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
})