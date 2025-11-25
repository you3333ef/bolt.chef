# Chef + Bolt.diy Merged Application

This application combines the powerful infrastructure automation capabilities of [Chef](https://github.com/chef/chef) with the AI-powered development platform [Bolt.diy](https://github.com/stackblitz-labs/bolt.diy).

## Features

- **Unified Workflow**: AI-powered application generation + infrastructure automation
- **API Gateway**: Node.js/Express bridge between Ruby and TypeScript components
- **Containerized**: Docker + Docker Compose ready
- **Scalable**: PostgreSQL + Redis shared services
- **Secure**: JWT authentication with RBAC

## Architecture

```
Chef (Ruby)  <--> API Gateway (Node.js) <--> Bolt.diy (TypeScript)
     |                    |                       |
     └────────────────────┼───────────────────────┘
                          |
                 Shared Services (PostgreSQL, Redis)
```

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/you3333ef/bolt.chef.git
cd bolt.chef
```

2. **Install dependencies**
```bash
npm install
```

3. **Start services**
```bash
docker-compose up -d
```

4. **Run the API gateway**
```bash
npm start
```

## API Endpoints

- `POST /api/unified/applications` - Create full-stack app with infrastructure
- `GET /api/chef/nodes/:nodeName` - Get Chef node status
- `POST /api/bolt/projects/generate` - Generate project from prompt

## Technology Stack

- **Backend**: Node.js, Express, Ruby (Chef)
- **Frontend**: React/Next.js (Bolt.diy)
- **Database**: PostgreSQL
- **Cache**: Redis
- **DevOps**: Docker, Kubernetes-ready

## Documentation

- [Integration Plan](docs/integration-plan.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## License

MIT License
