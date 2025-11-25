# 🚀 Quick Start Guide - Bolt Chef

## Immediate Setup (5 minutes)

### Step 1: Navigate to Project
```bash
cd /data/data/com.termux/files/home/bolt-chef-integrated
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
- Get Clerk keys from: https://clerk.com
- Get OpenAI key from: https://platform.openai.com
- Setup PostgreSQL or use: https://neon.tech (free tier)

### Step 4: Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### Step 5: Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🎯 What You'll See

### Home Page (/)
- Hero section with platform introduction
- Features showcase
- Call-to-action buttons

### Projects Page (/projects)
- Bolt.diy features
- AI code generation
- Project management

### Recipes Page (/recipes)
- Chef features
- Recipe browsing
- Search and filters

## 🔑 Key Features to Test

1. **Sign Up/Sign In**
   - Visit `/sign-up` or `/sign-in`
   - Create account with Clerk

2. **Create Project**
   - Go to `/projects`
   - Click "New Project"
   - Add project details

3. **Browse Recipes**
   - Go to `/recipes`
   - Search recipes
   - Filter by category

4. **AI Generation**
   - Use API: `POST /api/ai/generate`
   - Generate code or recipes

## 📱 Mobile Testing

The platform is fully responsive:
- Open on mobile browser
- Test navigation menu
- Try all features

## 🐛 Troubleshooting

**Issue**: Database connection error
**Fix**: Check DATABASE_URL in `.env`

**Issue**: Clerk authentication not working
**Fix**: Verify Clerk keys in `.env`

**Issue**: AI generation fails
**Fix**: Check AI provider API keys

## 📚 Documentation

- Full docs: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- Integration report: `INTEGRATION_REPORT.md`

## ✅ Checklist

- [ ] Install dependencies
- [ ] Configure environment
- [ ] Setup database
- [ ] Run development server
- [ ] Test authentication
- [ ] Test projects features
- [ ] Test recipes features
- [ ] Test AI generation
- [ ] Review documentation

## 🎉 You're Ready!

Your integrated Bolt Chef platform is running!

Next steps:
1. Customize theme colors
2. Add your content
3. Deploy to production

---

**Happy Building! 🚀**
