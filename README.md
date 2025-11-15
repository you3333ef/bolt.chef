# Bolt Chef - Integrated Platform

A unified platform combining **bolt.diy** AI-powered development features with **Chef** recipe management capabilities.

## Features

### Bolt.diy Features (AI Development)
- AI-powered code generation with multiple providers (OpenAI, Anthropic, Google)
- Project management with file versioning
- Real-time AI chat for development assistance
- Multiple deployment options (Netlify, Vercel, GitHub Pages)
- Support for 19+ AI providers

### Chef Features (Recipe Management)
- AI-powered recipe generation from ingredients
- Recipe browsing by category, cuisine, difficulty
- Social features (likes, comments, sharing)
- Nutrition information tracking
- Step-by-step cooking instructions

### Integrated Features
- Unified authentication and user management
- Shared AI infrastructure
- Consistent UI/UX with custom theme
- Combined search and discovery
- Cross-platform data integration

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI, Anthropic Claude, Google Gemini
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- API keys for AI providers

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bolt-chef-integrated
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- Database URL
- Clerk keys
- AI provider API keys

4. Initialize database
```bash
npx prisma generate
npx prisma db push
```

5. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
bolt-chef-integrated/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── projects/      # Project management APIs
│   │   ├── recipes/       # Recipe management APIs
│   │   └── ai/           # AI generation APIs
│   ├── projects/         # Projects pages
│   ├── recipes/          # Recipes pages
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/              # UI components
│   ├── layout/          # Layout components
│   ├── projects/        # Project-specific components
│   └── recipes/         # Recipe-specific components
├── lib/                 # Utility libraries
│   ├── prisma.ts       # Database client
│   ├── ai.ts           # AI integrations
│   └── utils.ts        # Helper functions
├── prisma/             # Database schema
│   └── schema.prisma
├── styles/             # Global styles
│   └── globals.css
└── public/             # Static assets
```

## Theme & Design

The platform uses a custom theme with colors inspired by the reference image:

- **Primary**: Red tones (#ef4444)
- **Secondary**: Green tones (#22c55e)
- **Accent**: Orange tones (#f97316)
- **Neutral**: Gray scale

Custom typography:
- **Sans**: Inter
- **Display**: Poppins
- **Mono**: JetBrains Mono

## API Endpoints

### Projects
- `GET /api/projects` - List all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Recipes
- `GET /api/recipes` - List recipes with filters
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/[id]` - Get recipe details
- `PUT /api/recipes/[id]` - Update recipe
- `DELETE /api/recipes/[id]` - Delete recipe

### AI
- `POST /api/ai/generate` - Generate code, recipes, or chat responses

## Database Schema

### Core Models
- **User**: Unified user management
- **Project**: Development projects (bolt.diy)
- **Recipe**: Cooking recipes (Chef)
- **AIChat**: AI conversation history
- **ProjectFile**: Project file management
- **Deployment**: Deployment tracking

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [repository-url]/issues
- Documentation: [docs-url]

---

Built with ❤️ combining bolt.diy and Chef platforms
