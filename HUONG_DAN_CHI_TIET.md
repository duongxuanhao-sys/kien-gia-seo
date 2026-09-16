# 📖 HƯỚNG DẪN CHI TIẾT - KIẾN GIÁ SEO

**Cho: duongxuanhao-sys**

Hướng dẫn này giúp bạn setup project KIẾN GIÁ SEO từ A-Z và push lên GitHub.

---

## 🎯 MỤC ĐÍCH

Sau hướng dẫn này, bạn sẽ có:
- ✅ Project KIẾN GIÁ SEO chạy local (localhost:3000 + 3001)
- ✅ GitHub repo: https://github.com/duongxuanhao-sys/kien-gia-seo
- ✅ Ready để develop thêm features

---

## 📥 STEP 1: TẢI CÁC FILES CẦN THIẾT

Tôi sẽ cung cấp các files:
1. `frontend-package.json` → `frontend/package.json`
2. `backend-package.json` → `backend/package.json`
3. `GITIGNORE` → `.gitignore`
4. `README-PROJECT.md` → `README.md`
5. `SETUP_GUIDE.md` → `SETUP_GUIDE.md`
6. Frontend code (React components)
7. Backend code (Node.js Express)

---

## 🗂️ STEP 2: TẠO FOLDER STRUCTURE

**Trên máy của bạn:**

```bash
# Tạo folder project
mkdir kien-gia-seo
cd kien-gia-seo

# Tạo subfolder
mkdir frontend backend

# Tạo files chính
touch README.md
touch SETUP_GUIDE.md
touch .gitignore
```

**Kết quả:**
```
kien-gia-seo/
├── frontend/
├── backend/
├── README.md
├── SETUP_GUIDE.md
└── .gitignore
```

---

## 📝 STEP 3: COPY FILES VÀO FOLDER

### Frontend setup:
```bash
cd frontend

# Copy package.json từ tôi
# Tôi sẽ gửi file `frontend-package.json`
# Bạn rename thành `package.json`

touch package.json
# Paste nội dung từ frontend-package.json vào đây

# Tạo source folder
mkdir -p src/pages src/components src/services src/styles
touch src/main.tsx
touch src/App.tsx
touch vite.config.ts
touch tsconfig.json
touch .env

# Copy Tailwind config
touch tailwind.config.js
touch postcss.config.js
```

### Backend setup:
```bash
cd ../backend

# Package.json
touch package.json
# Paste nội dung từ backend-package.json

# Source folder
mkdir -p src/routes src/controllers src/services src/models src/middleware
touch src/index.ts
touch tsconfig.json
touch .env

# Database migration
mkdir -p src/db
touch src/db/migrate.ts
```

### Root level:
```bash
cd ..

# Copy .gitignore
# Paste nội dung từ GITIGNORE file

# Copy README
# Paste nội dung từ README-PROJECT.md

# Copy SETUP_GUIDE
# Paste nội dung từ SETUP_GUIDE.md
```

---

## 🔌 STEP 4: SETUP ENVIRONMENT VARIABLES

### Backend `.env`:
```bash
cd backend

# Tạo .env file
nano .env
# Hoặc mở với editor yêu thích

# Paste cái này vào:
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/kien_gia_seo
OPENAI_API_KEY=your-api-key-here
AHREFS_API_KEY=
JWT_SECRET=your-secret-key-change-this-in-production
```

### Frontend `.env`:
```bash
cd ../frontend

# Tạo .env file
nano .env

# Paste:
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=KIẾN GIÁ SEO
```

**⚠️ QUAN TRỌNG:** 
- `.env` files KHÔNG được commit lên GitHub
- `.gitignore` sẽ tự động ignore chúng

---

## 💾 STEP 5: INSTALL DEPENDENCIES

### Backend:
```bash
cd backend
npm install
# Chờ 2-3 phút...
```

### Frontend:
```bash
cd ../frontend
npm install
# Chờ 2-3 phút...
```

---

## ▶️ STEP 6: CHẠY PROJECT LOCALLY

### Terminal 1 - Backend:
```bash
cd backend
npm run dev

# Kết quả:
# ✓ Server running on http://localhost:3001
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev

# Kết quả:
# ✓ Vite dev server running at: http://localhost:3000
```

### Test:
- Mở browser: http://localhost:3000
- Nên thấy login page
- Login: admin@seo-tool.local / Admin@123
- Nếu thấy dashboard = Success! ✅

---

## 🌐 STEP 7: SETUP GIT & GITHUB

### 1. Khởi tạo Git repo local:
```bash
cd kien-gia-seo

# Initialize git
git init

# Add files
git add .

# First commit
git commit -m "Initial commit: KIẾN GIÁ SEO MVP"

# Set main branch
git branch -M main
```

### 2. Tạo repo trên GitHub:
1. Vào https://github.com/new
2. Điền thông tin:
   - Repository name: `kien-gia-seo`
   - Description: `AI-Powered SEO Content Generator`
   - Public (để share code)
   - Uncheck "Initialize with README" (vì bạn có rồi)
3. Click "Create repository"

### 3. Push code lên GitHub:
```bash
# Add remote
git remote add origin https://github.com/duongxuanhao-sys/kien-gia-seo.git

# Push
git push -u origin main

# Verify
git remote -v
# Output:
# origin  https://github.com/duongxuanhao-sys/kien-gia-seo.git (fetch)
# origin  https://github.com/duongxuanhao-sys/kien-gia-seo.git (push)
```

### 4. Verify trên GitHub:
- Vào https://github.com/duongxuanhao-sys/kien-gia-seo
- Nên thấy toàn bộ files
- Branch: main ✅

---

## ✅ STEP 8: VERIFY SETUP

Kiểm tra lại tất cả:

```bash
# 1. Git setup
git remote -v
# Should show origin URL

# 2. Backend running
curl http://localhost:3001/api/health
# Should return: { status: "ok" }

# 3. Frontend running
curl http://localhost:3000
# Should return HTML

# 4. Database connected
# Check backend logs (Terminal 1)
# Should see: "Database connected"

# 5. OpenAI API working
# Try creating content in app
# Should see AI response
```

---

## 🎉 SELESAI!

**Selamat! Bạn có:**
- ✅ Project KIẾN GIÁ SEO chạy local
- ✅ GitHub repo setup
- ✅ Ready untuk develop

**Next steps:**
1. Explore features
2. Test create content with AI
3. Customize theo nhu cầu
4. Deploy (Vercel + Railway) tuần sau

---

## 🔗 Useful Links

- GitHub: https://github.com/duongxuanhao-sys/kien-gia-seo
- OpenAI Docs: https://platform.openai.com/docs
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- PostgreSQL Docs: https://www.postgresql.org/docs

---

## 🆘 TROUBLESHOOT

### Q: "npm command not found"
**A:** Node.js chưa install. Download từ https://nodejs.org

### Q: "Port 3000 already in use"
**A:** Kill process:
```bash
lsof -i :3000
kill -9 <PID>
```

### Q: "Database connection error"
**A:** PostgreSQL chưa chạy:
```bash
sudo service postgresql start
```

Hoặc dùng SQLite temp:
```
DATABASE_URL=sqlite:database.db
```

### Q: "OpenAI API error"
**A:** Key sai? Check:
- https://platform.openai.com/account/api-keys
- Có credits không? https://platform.openai.com/account/billing

### Q: "git push rejected"
**A:** SSH key chưa setup:
```bash
# Use HTTPS instead
git remote set-url origin https://github.com/duongxuanhao-sys/kien-gia-seo.git
git push
```

---

## 📞 CẦN GIÚP?

Có vấn đề? Gửi message cho tôi với:
1. Lỗi message
2. Nơi bạn bị stuck
3. Terminal output

---

**Good luck! You got this! 🚀**

---

*Last updated: September 2026*
*For: duongxuanhao-sys*
