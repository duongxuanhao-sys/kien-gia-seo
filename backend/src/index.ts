import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ============ DATABASE ============
interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
}

interface Keyword {
  id: number
  userId: number
  keyword: string
  volume: number
  difficulty: number
  cpc: number
  competition: string
  createdAt: Date
}

interface Content {
  id: number
  userId: number
  keywordId: number
  title: string
  outline: string
  article: string
  seoOptimized: string
  internalLinks: string[]
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const db = {
  users: [
    { id: 1, name: 'Hảo', email: 'test@example.com', password: 'password', createdAt: new Date() }
  ] as User[],
  keywords: [] as Keyword[],
  contents: [] as Content[]
}

// ============ AUTH ============
app.get('/', (req, res) => {
  res.json({ message: 'KIẾN GIÁ SEO Backend', status: 'running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64');

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// ============ KEYWORDS ============
app.post('/api/keywords/search', (req, res) => {
  const { keyword } = req.body;

  const mockKeywords: any = {
    'seo': [
      { keyword: 'seo tips', volume: 8900, difficulty: 52, cpc: 3.2, competition: 'High' },
      { keyword: 'seo for beginners', volume: 6700, difficulty: 35, cpc: 2.8, competition: 'Medium' },
      { keyword: 'seo tools', volume: 5400, difficulty: 48, cpc: 2.9, competition: 'High' },
    ],
    'running shoes': [
      { keyword: 'best running shoes', volume: 12100, difficulty: 45, cpc: 2.5, competition: 'High' },
      { keyword: 'running shoes for men', volume: 8900, difficulty: 38, cpc: 2.1, competition: 'High' },
    ],
  };

  const results = mockKeywords[keyword.toLowerCase()] || [
    {
      keyword: keyword,
      volume: Math.floor(Math.random() * 10000),
      difficulty: Math.floor(Math.random() * 100),
      cpc: (Math.random() * 5).toFixed(2),
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
    }
  ];

  res.json({ results });
});

app.get('/api/keywords/my-searches', (req, res) => {
  const userKeywords = db.keywords;
  res.json({ keywords: userKeywords });
});

// ============ CONTENT ============
app.post('/api/content/generate', (req, res) => {
  const { keyword, step } = req.body;

  const mockContent: any = {
    1: { content: { keyword } },
    2: { content: { keyword, outline: `1. Intro\n2. Why ${keyword} Matters\n3. Best Practices` } },
    3: { content: { keyword, article: `# ${keyword}\n\nComprehensive guide...` } },
    4: { content: { seoOptimized: `Meta Title: ${keyword}\nMeta Desc: Learn about ${keyword}` } },
    5: { content: { internalLinks: [`Check our ${keyword} guide`] } },
    6: { content: { keyword } }
  };

  res.json({ content: mockContent[step] || {} });
});

app.post('/api/content/publish', (req, res) => {
  const { keyword, title, article, platform } = req.body;

  const content: Content = {
    id: db.contents.length + 1,
    userId: 1,
    keywordId: 0,
    title,
    outline: '',
    article,
    seoOptimized: '',
    internalLinks: [],
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  db.contents.push(content);

  res.json({
    message: `Content published to ${platform}`,
    content
  });
});

app.get('/api/content/my-articles', (req, res) => {
  res.json({ articles: db.contents });
});

// ============ USER ============
app.get('/api/user/stats', (req, res) => {
  res.json({
    stats: {
      totalKeywords: db.keywords.length,
      totalArticles: db.contents.length,
      articlesPublished: db.contents.filter(c => c.status === 'published').length
    }
  });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});