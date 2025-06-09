# Development Setup Guide

## Overview

This guide will help you set up your local development environment for the QNom project. Follow these steps to get started with development.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Git** (version 2.25 or higher)
  ```bash
  git --version
  ```

- **Node.js** (version 18.x or higher)
  ```bash
  node --version
  ```

- **npm** or **yarn** (latest version)
  ```bash
  npm --version
  # or
  yarn --version
  ```

- **Database** (choose one):
  - PostgreSQL 14+ 
  - MySQL 8+
  - MongoDB 5+

- **Redis** (version 6.x or higher) - for caching
  ```bash
  redis-cli --version
  ```

### Optional Tools

- **Docker** & **Docker Compose** - for containerized development
- **VS Code** or your preferred IDE
- **Postman** or similar API testing tool
- **pgAdmin** or database GUI tool

## Environment Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/[organization]/qnom.git

# Navigate to the project directory
cd qnom
```

### 2. Install Dependencies

```bash
# Install project dependencies
npm install
# or
yarn install

# Install global dependencies (if needed)
npm install -g nodemon jest
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your local configuration:

```env
# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=qnom_dev
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Email (for development, use a service like Mailtrap)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# API Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AWS (if using)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
S3_BUCKET=

# Logging
LOG_LEVEL=debug
LOG_FORMAT=dev
```

### 4. Database Setup

#### PostgreSQL Setup

```bash
# Create database
createdb qnom_dev

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

#### Using Docker for Database

```bash
# Start PostgreSQL with Docker
docker run --name qnom-postgres \
  -e POSTGRES_DB=qnom_dev \
  -e POSTGRES_USER=qnom \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:14

# Start Redis with Docker
docker run --name qnom-redis \
  -p 6379:6379 \
  -d redis:6-alpine
```

### 5. Running the Application

#### Development Mode

```bash
# Start the development server with hot reload
npm run dev
# or
yarn dev
```

#### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm start
```

#### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Development Workflow

### 1. Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name
```

### 2. Code Style

We use ESLint and Prettier for code formatting:

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### 3. Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.spec.js
```

### 4. Database Operations

```bash
# Create a new migration
npm run db:migration:create -- --name=add_users_table

# Run migrations
npm run db:migrate

# Rollback migrations
npm run db:migrate:undo

# Reset database
npm run db:reset
```

## Project Structure

```
qnom/
├── src/
│   ├── api/              # API routes
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Database models
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── app.js           # Express app setup
├── tests/                # Test files
├── scripts/              # Build/deployment scripts
├── public/               # Static files
├── docs/                 # Documentation
├── .env.example          # Environment variables example
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── docker-compose.yml    # Docker compose configuration
├── package.json         # Node.js dependencies
└── README.md            # Project readme
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier

# Documentation
npm run docs:generate    # Generate API docs
npm run docs:serve       # Serve documentation
```

## IDE Setup

### VS Code

Install recommended extensions:
- ESLint
- Prettier
- GitLens
- Docker
- Thunder Client (API testing)

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript"],
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### Database Connection Issues
- Ensure database service is running
- Check credentials in `.env`
- Verify database exists
- Check firewall/network settings

#### Module Not Found
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Permission Errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Getting Help

1. Check the [documentation](../README.md)
2. Search existing [issues](https://github.com/[organization]/qnom/issues)
3. Ask in the development Slack channel
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details

## Next Steps

1. Read the [Contributing Guidelines](CONTRIBUTING.md)
2. Review the [Technical Architecture](../architecture/TECHNICAL_ARCHITECTURE.md)
3. Check the [API Documentation](../api/README.md)
4. Set up your [development tools](#ide-setup)
5. Start with a simple task from the issue tracker

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Documentation](https://docs.docker.com/)
- [Git Flow Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)