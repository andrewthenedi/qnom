# Deployment Guide

## Overview

This guide covers the deployment process for QNom, including environment setup, deployment strategies, and production best practices.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Configuration](#environment-configuration)
- [Deployment Strategies](#deployment-strategies)
- [Cloud Platform Deployment](#cloud-platform-deployment)
- [Container Deployment](#container-deployment)
- [Database Deployment](#database-deployment)
- [Monitoring Setup](#monitoring-setup)
- [Security Considerations](#security-considerations)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

### Code Readiness
- [ ] All tests pass (unit, integration, E2E)
- [ ] Code coverage meets minimum threshold (80%)
- [ ] No critical security vulnerabilities
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Version number updated
- [ ] CHANGELOG.md updated

### Infrastructure Readiness
- [ ] Server requirements met
- [ ] Database provisioned and tested
- [ ] Redis/cache layer configured
- [ ] CDN configured (if applicable)
- [ ] SSL certificates installed
- [ ] Domain/DNS configured
- [ ] Backup systems in place

### Security Checklist
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] API keys rotated
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] CORS policy configured
- [ ] Security headers implemented

## Environment Configuration

### Production Environment Variables

```bash
# Application
NODE_ENV=production
PORT=3000
APP_URL=https://api.qnom.io

# Database
DB_HOST=prod-db.qnom.io
DB_PORT=5432
DB_NAME=qnom_prod
DB_USER=qnom_app
DB_PASSWORD=${SECURE_DB_PASSWORD}
DB_SSL=true
DB_POOL_MIN=2
DB_POOL_MAX=10

# Redis
REDIS_HOST=prod-redis.qnom.io
REDIS_PORT=6379
REDIS_PASSWORD=${SECURE_REDIS_PASSWORD}
REDIS_TLS=true

# Security
JWT_SECRET=${SECURE_JWT_SECRET}
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12
SESSION_SECRET=${SECURE_SESSION_SECRET}

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=${SENDGRID_API_KEY}
EMAIL_FROM=noreply@qnom.io

# Monitoring
SENTRY_DSN=${SENTRY_DSN}
NEW_RELIC_LICENSE_KEY=${NEW_RELIC_KEY}
LOG_LEVEL=info

# External Services
STRIPE_SECRET_KEY=${STRIPE_PROD_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_KEY}
S3_BUCKET=qnom-prod-assets
```

### Environment-Specific Configurations

```javascript
// config/environments/production.js
module.exports = {
  server: {
    port: process.env.PORT || 3000,
    cors: {
      origin: ['https://app.qnom.io', 'https://www.qnom.io'],
      credentials: true
    }
  },
  database: {
    ssl: { rejectUnauthorized: false },
    logging: false,
    pool: {
      min: 2,
      max: 10,
      acquire: 60000,
      idle: 10000
    }
  },
  cache: {
    ttl: 3600, // 1 hour
    checkPeriod: 600 // 10 minutes
  },
  security: {
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // requests per window
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"]
        }
      }
    }
  }
};
```

## Deployment Strategies

### Blue-Green Deployment

```yaml
# docker-compose.blue-green.yml
version: '3.8'

services:
  app-blue:
    image: qnom/api:${BLUE_VERSION}
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.blue.rule=Host(`api.qnom.io`) && Headers(`X-Version`, `blue`)"

  app-green:
    image: qnom/api:${GREEN_VERSION}
    ports:
      - "3002:3000"
    environment:
      - NODE_ENV=production
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.green.rule=Host(`api.qnom.io`) && Headers(`X-Version`, `green`)"

  load-balancer:
    image: traefik:v2.5
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./traefik.yml:/etc/traefik/traefik.yml
      - /var/run/docker.sock:/var/run/docker.sock
```

### Rolling Deployment

```bash
#!/bin/bash
# rolling-deploy.sh

INSTANCES=4
IMAGE="qnom/api:$VERSION"

for i in $(seq 1 $INSTANCES); do
  echo "Updating instance $i..."
  
  # Stop old container
  docker stop qnom-api-$i
  
  # Start new container
  docker run -d \
    --name qnom-api-$i \
    --env-file .env.production \
    -p 300$i:3000 \
    $IMAGE
  
  # Health check
  ./scripts/health-check.sh 300$i
  
  # Wait before next instance
  sleep 30
done
```

### Canary Deployment

```nginx
# nginx.conf for canary deployment
upstream backend {
    server prod-v1.qnom.io:3000 weight=90;  # 90% traffic
    server prod-v2.qnom.io:3000 weight=10;  # 10% traffic (canary)
}

server {
    listen 443 ssl;
    server_name api.qnom.io;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Cloud Platform Deployment

### AWS Deployment

#### Using Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
eb init -p node.js-14 qnom-api

# Create environment
eb create qnom-prod --envvars NODE_ENV=production

# Deploy
eb deploy

# Set environment variables
eb setenv NODE_ENV=production DB_HOST=xxx ...
```

#### Using ECS with Fargate

```json
// task-definition.json
{
  "family": "qnom-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "qnom-api",
      "image": "qnom/api:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:db-password"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/qnom-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Google Cloud Platform

```yaml
# app.yaml for App Engine
runtime: nodejs14
env: standard
instance_class: F2

automatic_scaling:
  min_instances: 2
  max_instances: 10
  target_cpu_utilization: 0.6

env_variables:
  NODE_ENV: "production"

handlers:
  - url: /.*
    script: auto
    secure: always

vpc_access_connector:
  name: projects/PROJECT_ID/locations/REGION/connectors/CONNECTOR_NAME
```

### Azure Deployment

```json
// azure-deploy.json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "siteName": {
      "type": "string",
      "defaultValue": "qnom-api"
    }
  },
  "resources": [
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2021-02-01",
      "name": "[parameters('siteName')]",
      "location": "[resourceGroup().location]",
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', 'qnom-plan')]",
        "siteConfig": {
          "nodeVersion": "14-lts",
          "appSettings": [
            {
              "name": "NODE_ENV",
              "value": "production"
            }
          ]
        }
      }
    }
  ]
}
```

## Container Deployment

### Docker Build

```dockerfile
# Dockerfile.production
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine

RUN apk add --no-cache tini
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 3000
USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/app.js"]
```

### Kubernetes Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: qnom-api
  labels:
    app: qnom-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: qnom-api
  template:
    metadata:
      labels:
        app: qnom-api
    spec:
      containers:
      - name: api
        image: qnom/api:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: qnom-secrets
              key: db-password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: qnom-api-service
spec:
  selector:
    app: qnom-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

## Database Deployment

### Production Database Setup

```sql
-- Create production database
CREATE DATABASE qnom_prod;

-- Create read-only user for analytics
CREATE USER qnom_analytics WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE qnom_prod TO qnom_analytics;
GRANT USAGE ON SCHEMA public TO qnom_analytics;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO qnom_analytics;

-- Create application user
CREATE USER qnom_app WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE qnom_prod TO qnom_app;
GRANT USAGE ON SCHEMA public TO qnom_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO qnom_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO qnom_app;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
```

### Database Migration Strategy

```bash
#!/bin/bash
# migrate-prod.sh

# Backup current database
pg_dump $PROD_DB_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# Run migrations
npm run db:migrate:prod

# Verify migration
npm run db:migrate:status

# Run post-migration checks
npm run db:health-check
```

## Monitoring Setup

### Application Monitoring

```javascript
// monitoring/setup.js
const Sentry = require('@sentry/node');
const newrelic = require('newrelic');
const prometheus = require('prom-client');

// Sentry setup
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

// Prometheus metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});
```

### Infrastructure Monitoring

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secure_password

  alertmanager:
    image: prom/alertmanager:latest
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
    ports:
      - "9093:9093"

volumes:
  prometheus_data:
  grafana_data:
```

## Security Considerations

### SSL/TLS Configuration

```nginx
# nginx-ssl.conf
server {
    listen 443 ssl http2;
    server_name api.qnom.io;

    ssl_certificate /etc/letsencrypt/live/api.qnom.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.qnom.io/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Secrets Management

```bash
# Using AWS Secrets Manager
aws secretsmanager create-secret \
  --name qnom/production/db \
  --secret-string '{"username":"qnom_app","password":"secure_password"}'

# Using Kubernetes secrets
kubectl create secret generic qnom-secrets \
  --from-literal=db-password='secure_password' \
  --from-literal=jwt-secret='secure_jwt_secret'
```

## Rollback Procedures

### Automated Rollback

```bash
#!/bin/bash
# rollback.sh

CURRENT_VERSION=$(docker ps --format "table {{.Image}}" | grep qnom/api | head -1)
PREVIOUS_VERSION="qnom/api:$1"

echo "Rolling back from $CURRENT_VERSION to $PREVIOUS_VERSION"

# Blue-green rollback
docker-compose -f docker-compose.blue-green.yml up -d \
  --scale app-blue=0 \
  --scale app-green=4

# Database rollback if needed
if [ "$2" == "--with-db" ]; then
  npm run db:migrate:undo
fi

# Verify rollback
./scripts/health-check.sh

# Clear cache
redis-cli FLUSHALL
```

### Manual Rollback Steps

1. **Identify Issue**
   ```bash
   # Check logs
   kubectl logs deployment/qnom-api --tail=100
   
   # Check metrics
   curl http://localhost:3000/metrics
   ```

2. **Rollback Application**
   ```bash
   # Kubernetes
   kubectl rollout undo deployment/qnom-api
   
   # Docker
   docker-compose down
   docker-compose up -d --build
   ```

3. **Verify Rollback**
   ```bash
   # Health check
   curl https://api.qnom.io/health
   
   # Run smoke tests
   npm run test:smoke
   ```

## Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check logs
docker logs qnom-api

# Common causes:
# - Missing environment variables
# - Database connection issues
# - Port already in use
# - Insufficient memory
```

#### Database Connection Errors
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check firewall rules
# Verify SSL certificates
# Check connection pool settings
```

#### High Memory Usage
```bash
# Monitor memory
docker stats qnom-api

# Analyze heap dump
node --inspect app.js
# Use Chrome DevTools for analysis
```

#### Performance Issues
```bash
# Enable profiling
NODE_ENV=production node --prof app.js

# Analyze results
node --prof-process isolate-*.log > profile.txt
```

### Emergency Procedures

1. **Circuit Breaker**
   ```javascript
   // Implement circuit breaker
   const CircuitBreaker = require('opossum');
   
   const options = {
     timeout: 3000,
     errorThresholdPercentage: 50,
     resetTimeout: 30000
   };
   
   const breaker = new CircuitBreaker(riskyFunction, options);
   ```

2. **Rate Limiting**
   ```javascript
   // Emergency rate limit
   app.use(rateLimit({
     windowMs: 1 * 60 * 1000, // 1 minute
     max: 10 // 10 requests per minute
   }));
   ```

3. **Maintenance Mode**
   ```nginx
   # Enable maintenance mode
   location / {
     return 503;
   }
   
   error_page 503 @maintenance;
   location @maintenance {
     root /var/www/maintenance;
     rewrite ^(.*)$ /index.html break;
   }
   ```

## Post-Deployment

### Verification Steps

1. **Functional Testing**
   ```bash
   npm run test:e2e:prod
   ```

2. **Performance Testing**
   ```bash
   npm run test:load
   ```

3. **Security Scanning**
   ```bash
   npm audit
   npm run security:scan
   ```

### Documentation Updates

- Update deployment date in CHANGELOG.md
- Update version in package.json
- Tag release in Git
- Update status page
- Notify stakeholders

### Monitoring Alerts

Set up alerts for:
- Response time > 500ms
- Error rate > 1%
- CPU usage > 80%
- Memory usage > 85%
- Disk usage > 90%
- Failed health checks

## Deployment Automation

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Docker image
        run: |
          docker build -t qnom/api:${{ github.sha }} .
          docker tag qnom/api:${{ github.sha }} qnom/api:latest
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push qnom/api:${{ github.sha }}
          docker push qnom/api:latest
      
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/qnom-api api=qnom/api:${{ github.sha }}
          kubectl rollout status deployment/qnom-api
```

## Resources

- [Deployment Checklist Template](./deployment-checklist.md)
- [Incident Response Guide](./incident-response.md)
- [Scaling Strategy](./SCALING.md)
- [Security Best Practices](../security/README.md)