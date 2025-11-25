# Deployment Guide for Bolt Chef

## Quick Start

This integrated platform is ready for deployment. Follow these steps:

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use Supabase/Neon)
- Clerk account for authentication
- API keys for AI providers (OpenAI, Anthropic, Google)

### 1. Environment Setup

Create `.env` file with these variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/boltchef"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# AI Providers (at least one required)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_AI_API_KEY="..."

# App Configuration
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database
npm run seed
```

### 4. Build Application

```bash
npm run build
```

### 5. Deploy

#### Option A: Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy automatically

#### Option B: Docker

```bash
docker build -t bolt-chef .
docker run -p 3000:3000 --env-file .env bolt-chef
```

#### Option C: Manual

```bash
npm start
```

## Features Verification Checklist

After deployment, verify these features work:

### Bolt.diy Features
- [ ] Create new project
- [ ] AI code generation with OpenAI
- [ ] AI code generation with Anthropic
- [ ] AI code generation with Google
- [ ] Project file management
- [ ] AI chat for development assistance
- [ ] Project deployment tracking

### Chef Features
- [ ] Browse recipes
- [ ] Search recipes
- [ ] Filter by category/cuisine
- [ ] Create new recipe
- [ ] AI recipe generation from ingredients
- [ ] Like/unlike recipes
- [ ] Comment on recipes
- [ ] View recipe details

### Integrated Features
- [ ] User authentication (sign up/in/out)
- [ ] User profile management
- [ ] Theme switching (light/dark)
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Navigation between Projects and Recipes
- [ ] Unified search

## Configuration Options

### Theme Customization

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### AI Provider Configuration

The platform supports multiple AI providers. Configure in `.env`:

- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus
- **Google**: Gemini Pro, Gemini Ultra

### Database Options

Supported databases:
- PostgreSQL (recommended)
- MySQL
- SQLite (development only)

Update `DATABASE_URL` in `.env` accordingly.

## Monitoring & Logging

Add these optional services:

### Error Tracking
- Sentry
- LogRocket

### Analytics
- Google Analytics
- Plausible

### Performance
- Vercel Analytics
- Web Vitals

## Security Checklist

- [ ] All API keys stored in environment variables
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] SQL injection protection (via Prisma)
- [ ] XSS protection enabled
- [ ] Authentication secured with Clerk

## Scaling Considerations

### Database
- Connection pooling enabled
- Indexes on frequently queried fields
- Regular backups scheduled

### Caching
- Redis for session storage
- CDN for static assets
- Edge caching for API responses

### Load Balancing
- Multiple server instances
- Horizontal scaling ready
- Database read replicas

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor error logs daily
- Review performance metrics weekly
- Backup database daily

### Troubleshooting

Common issues and solutions:

1. **Database connection failed**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Check firewall rules

2. **AI generation not working**
   - Verify API keys are correct
   - Check API provider status
   - Review rate limits

3. **Authentication issues**
   - Verify Clerk keys
   - Check webhook configuration
   - Review CORS settings

## Contact

For issues or questions:
- GitHub Issues
- Documentation
- Support Email

---

**Status**: Ready for Production ✅
**Last Updated**: 2024
**Version**: 1.0.0
