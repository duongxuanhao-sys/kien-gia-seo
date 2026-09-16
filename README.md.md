# 🔧 KIẾN GIÁ SEO

**AI-Powered SEO Content Generator** - Full-stack SaaS platform cho phép tạo nội dung blog tối ưu SEO tự động.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-Tiếng%20Việt-red)

---

## 🎯 Tính năng chính

✅ **Bước 1: Phân tích từ khóa** - Integrate Ahrefs API, hiển thị difficulty, volume, CPC, intent  
✅ **Bước 2: Tạo Outline** - Analyze top 3 Google result, suggest H2/H3 tự động  
✅ **Bước 3: Viết bài với AI** - OpenAI GPT-4 viết 2000+ từ tối ưu SEO  
✅ **Bước 4: Tối ưu SEO** - Auto-check title, meta, heading, mật độ từ khóa  
✅ **Bước 5: Chèn liên kết** - Internal linking suggestions, external backlink DB  
✅ **Bước 6: Xuất bản & Báo cáo** - Publish WordPress/Shopify/LinkedIn, tracking ranking  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Node.js** + Express
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **TypeORM** - ORM
- **JWT** - Authentication
- **OpenAI API** - Content generation

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend + Database hosting
- **GitHub** - Version control

---

## 📋 Prerequisites

- Node.js 18.0.0+
- npm 9.0.0+
- Git
- PostgreSQL 14+ (hoặc SQLite để dev local)
- OpenAI API key

---

## 🚀 Quick Start

### 1. Clone repository
```bash
git clone https://github.com/duongxuanhao-sys/kien-gia-seo.git
cd kien-gia-seo
```

### 2. Setup Environment
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env với API keys của bạn

# Frontend
cd ../frontend
cp .env.example .env
```

### 3. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run Locally
```bash
# Terminal 1 - Backend (http://localhost:3001)
cd backend
npm run dev

# Terminal 2 - Frontend (http://localhost:3000)
cd frontend
npm run dev
```

### 5. Test
- Browser: http://localhost:3000
- Login: admin@seo-tool.local / Admin@123
- Try creating content!

---

## 📁 Project Structure

```
kien-gia-seo/
├── frontend/                 # React app (Vite)
│   ├── src/
│   │   ├── pages/           # Dashboard, Keyword, Content, etc.
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API client
│   │   └── styles/          # Global CSS
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Business logic
│   │   ├── services/        # OpenAI, DB services
│   │   ├── models/          # Database entities
│   │   └── index.ts         # Entry point
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
├── README.md                # This file
└── SETUP_GUIDE.md          # Detailed setup instructions

```

---

## 🔑 Environment Variables

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kien_gia_seo

# APIs
OPENAI_API_KEY=sk-proj-xxx
AHREFS_API_KEY=xxx (optional)

# Auth
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=KIẾN GIÁ SEO
```

---

## 📚 API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Keywords
```
GET    /api/keywords           # List all keywords
POST   /api/keywords           # Create keyword
GET    /api/keywords/:id       # Get detail
DELETE /api/keywords/:id       # Delete
```

### Content Generation
```
POST   /api/content/generate   # Generate via OpenAI
GET    /api/content/:id        # Get content
PUT    /api/content/:id        # Update
```

### Publishing
```
POST   /api/publish/wordpress  # Publish to WordPress
POST   /api/publish/shopify    # Publish to Shopify
GET    /api/publish/status     # Check publish status
```

---

## 🌐 Deployment

### Deploy Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts, select Next.js template if asked
```

### Deploy Backend (Railway)
```bash
cd backend
npm install -g railway
railway init
railway up
```

### Setup Database (Railway PostgreSQL)
```
1. Create PostgreSQL plugin in Railway
2. Copy DATABASE_URL to backend .env
3. Run: npm run db:migrate
```

---

## 🐛 Troubleshooting

### "OPENAI_API_KEY is not set"
- Kiểm tra `.env` có đúng key không
- Verify key on: https://platform.openai.com/account/api-keys

### "Cannot connect to database"
- PostgreSQL running? `sudo service postgresql status`
- Database URL correct in `.env`?
- Try SQLite temp: `DATABASE_URL=sqlite:database.db`

### "Port 3000 already in use"
```bash
# Kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
VITE_PORT=3002 npm run dev
```

---

## 📝 Roadmap

- [ ] Phase 1 (Week 1-2): MVP with Bước 1-3 ✅
- [ ] Phase 2 (Week 3-4): Bước 4-6 + Publishing
- [ ] Phase 3 (Week 5-6): Team collaboration + White-label
- [ ] Phase 4 (Week 7-8): Advanced backlink analysis
- [ ] Phase 5: Mobile app (iOS/Android)

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📞 Support

Issues? Questions?
- 📧 Email: duongxuanhao@gecko.vn
- 🐛 GitHub Issues: https://github.com/duongxuanhao-sys/kien-gia-seo/issues
- 💬 Discussions: https://github.com/duongxuanhao-sys/kien-gia-seo/discussions

---

## 📜 License

MIT License © 2024 Hảo Dương

Feel free to use, modify, and distribute this project for your business! 🚀

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Ahrefs for keyword data
- Vercel for hosting
- Railway for backend hosting

---

**Happy building! 🎉**

Need help? Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.
