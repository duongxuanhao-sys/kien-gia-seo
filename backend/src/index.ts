import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock users database
const users = [
  { id: 1, name: 'Hảo', email: 'test@example.com', password: 'password' }
];

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'KIẾN GIÁ SEO Backend', 
    status: 'running'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Login API
// Thêm dòng này vào file backend/src/index.ts (sau login API)

// Keyword search API
app.post('/api/keywords/search', (req, res) => {
  const { keyword } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  // Mock keyword data (thay bằng Ahrefs API sau)
  const mockKeywords: any = {
    'running shoes': [
      { keyword: 'best running shoes', volume: 12100, difficulty: 45, cpc: 2.5, competition: 'High' },
      { keyword: 'running shoes for men', volume: 8900, difficulty: 38, cpc: 2.1, competition: 'High' },
      { keyword: 'running shoes for women', volume: 7200, difficulty: 35, cpc: 1.9, competition: 'Medium' },
      { keyword: 'best running shoes 2024', volume: 4500, difficulty: 28, cpc: 2.3, competition: 'Medium' },
    ],
    'seo': [
      { keyword: 'seo tips', volume: 8900, difficulty: 52, cpc: 3.2, competition: 'High' },
      { keyword: 'seo for beginners', volume: 6700, difficulty: 35, cpc: 2.8, competition: 'Medium' },
      { keyword: 'seo tools', volume: 5400, difficulty: 48, cpc: 2.9, competition: 'High' },
    ]
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
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Mock JWT token
  const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64');

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// Logout API (bỏ qua, frontend xóa token là được)
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

// Protected route example
app.get('/api/user/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});