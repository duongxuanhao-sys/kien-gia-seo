# 🚀 KIẾN GIÁ SEO - Setup & GitHub Guide

## 📋 Project Overview

**KIẾN GIÁ SEO** = Full-stack AI SEO Content Generator
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + PostgreSQL
- **AI Engine:** OpenAI GPT-4
- **Language:** Tiếng Việt 100%

---

## 📁 Project Structure

```
kien-gia-seo/
├── frontend/                 # React app
│   ├── src/
│   │   ├── pages/           # Login, Dashboard, Keyword, Content, etc.
│   │   ├── components/      # Reusable components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API calls
│   │   ├── styles/          # Global CSS
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models
│   │   ├── services/        # OpenAI, Ahrefs, etc.
│   │   ├── middleware/      # Auth, error handling
│   │   └── index.ts
│   ├── .env                 # API Keys (SECRET!)
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore               # Ignore .env, node_modules
├── README.md                # Project docs
└── docker-compose.yml       # PostgreSQL (optional)
```

---

## 🔧 STEP 1: Cài đặt Prerequisites

### ✅ Kiểm tra bạn đã có:

1. **Node.js 18+**
   ```bash
   node -v          # Should be v18.0.0 or higher
   npm -v           # Should be 9.0.0 or higher
   ```

2. **Git**
   ```bash
   git --version    # Should show version
   ```

3. **PostgreSQL** (optional - có thể dùng SQLite để test)
   ```bash
   psql --version
   ```

---

## 📦 STEP 2: Tải Project

### Option A: Clone từ GitHub (sau khi push)
```bash
git clone https://github.com/duongxuanhao-sys/kien-gia-seo.git
cd kien-gia-seo
```

### Option B: Download file từ tôi + Setup local

Tôi sẽ tạo file `.zip` chứa:
- Frontend complete
- Backend complete
- .env template
- Setup script

---

## 🔑 STEP 3: Setup Environment Variables

### Backend `.env` file:
```bash
# .env (NEVER commit this!)
cd backend
touch .env

# Add these:
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/kien_gia_seo
OPENAI_API_KEY=your-api-key-here
AHREFS_API_KEY=your_ahrefs_key_here
JWT_SECRET=your_random_secret_key
```

**⚠️ IMPORTANT:** `.env` được added trong `.gitignore` - NEVER push lên GitHub!

---

## 🚀 STEP 4: Setup & Run Locally

### Terminal 1 - Backend:
```bash
cd backend
npm install
npm run dev
# Server runs on: http://localhost:3001
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
# App runs on: http://localhost:3000
```

### Test:
- Browser: http://localhost:3000
- Login: admin@seo-tool.local / Admin@123
- Thấy dashboard = Success! ✅

---

## 📤 STEP 5: Push lên GitHub

### 1. Tạo repo mới trên GitHub:
```
1. Vào https://github.com/new
2. Repository name: kien-gia-seo
3. Description: AI SEO Content Generator
4. Public (vì muốn share)
5. Click "Create repository"
```

### 2. Push code lên:
```bash
cd kien-gia-seo

# Initialize git (nếu chưa có)
git init
git add .
git commit -m "Initial commit: KIẾN GIÁ SEO MVP"

# Add remote
git branch -M main
git remote add origin https://github.com/duongxuanhao-sys/kien-gia-seo.git

# Push
git push -u origin main
```

### 3. Verify:
```bash
# Check remote
git remote -v
# Should show:
# origin  https://github.com/duongxuanhao-sys/kien-gia-seo.git (fetch)
# origin  https://github.com/duongxuanhao-sys/kien-gia-seo.git (push)
```

---

## 🌐 STEP 6: Deploy (Optional - Later)

### Frontend → Vercel:
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts
```

### Backend → Railway:
```bash
cd backend
npm install -g railway
railway init
railway up
```

---

## 📝 API Endpoints

### Auth
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Keywords
```
GET /api/keywords
POST /api/keywords
GET /api/keywords/:id
```

### Content
```
POST /api/content/generate
GET /api/content/:id
PUT /api/content/:id
```

### Publishing
```
POST /api/publish/wordpress
POST /api/publish/shopify
GET /api/publish/status/:id
```

---

## 🐛 Troubleshooting

### Port already in use?
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
VITE_PORT=3002 npm run dev
```

### Database connection error?
```bash
# Check PostgreSQL running
sudo service postgresql status

# Or use SQLite (temp solution)
DATABASE_URL=sqlite:database.db
```

### OpenAI API error?
```bash
# Verify key is correct
echo $OPENAI_API_KEY

# Check if account has credits
# Visit: https://platform.openai.com/account/billing/overview
```

---

## 📞 Support

Issues? Reach out:
- GitHub Issues: https://github.com/duongxuanhao-sys/kien-gia-seo/issues
- Email: [your email]

---

## 📜 License

MIT License - Feel free to use for your business! 🚀

---

**Happy coding! 🎉**
