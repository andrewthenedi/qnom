# QNom Technical Stack

## Overview
QNom is built on modern, cost-effective technologies that prioritize performance, scalability, and maintainability while operating within free tier limits.

## Frontend

### Core Framework: Next.js 14
- **Why**: Server-side rendering, excellent performance, great developer experience
- **Features Used**:
  - App Router for modern routing
  - Server Components for improved performance
  - Image optimization
  - Built-in API routes
  - Incremental Static Regeneration (ISR)
- **Deployment**: Vercel (free tier)

### Styling: Tailwind CSS
- **Why**: Utility-first approach, small bundle size, rapid development
- **Configuration**:
  - Custom color palette for QNom branding
  - Mobile-first responsive design
  - Dark mode support
  - Custom animations for interactions

### Component Library: shadcn/ui
- **Why**: Accessible, customizable, no runtime overhead
- **Components Used**:
  - Form components with react-hook-form
  - Modal and dialog systems
  - Navigation components
  - Data display tables
  - Loading states and skeletons

### Additional Frontend Libraries
- **React Query**: Server state management
- **Zustand**: Client state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Framer Motion**: Animations
- **React Map GL**: Map integration

## Backend

### Edge Computing: Cloudflare Workers
- **Why**: Global performance, generous free tier, automatic scaling
- **Use Cases**:
  - API endpoints
  - Authentication middleware
  - Image optimization
  - Caching layer
  - Rate limiting
- **Free Tier Limits**:
  - 100,000 requests/day
  - 10ms CPU time per request
  - 128MB memory

### Database: Supabase
- **Why**: PostgreSQL with real-time features, generous free tier, built-in auth
- **Features Used**:
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Built-in authentication
  - Storage for images
- **Free Tier Limits**:
  - 500MB database
  - 1GB file storage
  - 50,000 monthly active users
  - 2GB bandwidth

### Additional Backend Services
- **Cloudflare R2**: Object storage for images (10GB free)
- **Cloudflare KV**: Key-value storage for caching
- **Cloudflare D1**: SQLite at the edge for fast queries
- **Resend**: Transactional emails (100 emails/day free)

## Infrastructure

### Content Delivery
- **Cloudflare CDN**: Global content delivery
- **Vercel Edge Network**: Frontend hosting
- **Image Optimization**: Next.js Image with Cloudflare Polish

### Monitoring & Analytics
- **Vercel Analytics**: Web vitals and performance (free tier)
- **Cloudflare Analytics**: Traffic and security insights
- **Sentry**: Error tracking (5,000 events/month free)
- **PostHog**: Product analytics (1M events/month free)

### Development Tools
- **Version Control**: GitHub (unlimited public repos)
- **CI/CD**: GitHub Actions (2,000 minutes/month free)
- **Code Quality**: ESLint, Prettier, Husky
- **Testing**: Jest, React Testing Library, Playwright
- **API Testing**: Thunder Client / Postman

## Development Environment

### Required Tools
```bash
# Node.js 20+ LTS
node --version

# pnpm (preferred package manager)
npm install -g pnpm

# Cloudflare Wrangler CLI
npm install -g wrangler

# Supabase CLI
npm install -g supabase

# Vercel CLI
npm install -g vercel
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# External Services
RESEND_API_KEY=your_resend_key
POSTHOG_API_KEY=your_posthog_key
```

## Architecture Decisions

### API Design
- RESTful endpoints for CRUD operations
- GraphQL for complex queries (future)
- tRPC for type-safe APIs
- Webhook endpoints for integrations

### Data Architecture
- PostgreSQL for relational data
- R2 for media storage
- KV for caching frequently accessed data
- D1 for edge-side data replication

### Security Measures
- Row Level Security in Supabase
- API rate limiting with Cloudflare
- CORS configuration
- Input validation with Zod
- SQL injection prevention
- XSS protection

## Performance Optimization

### Frontend
- Code splitting and lazy loading
- Image optimization and WebP conversion
- Resource hints (preconnect, prefetch)
- Service Worker for offline support
- Bundle size monitoring

### Backend
- Edge caching strategies
- Database query optimization
- Connection pooling
- Batch operations
- Background job processing

## Scaling Considerations

### Phase 1 (0-10K users)
- All services on free tiers
- Manual monitoring
- Basic caching

### Phase 2 (10K-50K users)
- Upgrade Supabase to Pro ($25/month)
- Add Cloudflare Workers Paid ($5/month)
- Enhanced monitoring

### Phase 3 (50K+ users)
- Custom infrastructure
- Multi-region deployment
- Advanced caching strategies
- Dedicated support

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run Cloudflare Workers locally
pnpm wrangler dev

# Run tests
pnpm test
```

### Deployment Process
1. Push to feature branch
2. Automated tests run
3. Preview deployment created
4. Code review required
5. Merge to main
6. Automatic production deployment

## Monitoring Checklist

### Daily
- [ ] Check error rates in Sentry
- [ ] Monitor API response times
- [ ] Review Cloudflare analytics
- [ ] Check free tier usage

### Weekly
- [ ] Database performance review
- [ ] Bundle size analysis
- [ ] Security updates check
- [ ] Backup verification

### Monthly
- [ ] Infrastructure cost review
- [ ] Performance benchmarking
- [ ] Dependency updates
- [ ] Architecture review

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Supabase Docs](https://supabase.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- QNom Developer Discord
- Weekly tech sync meetings
- Code review guidelines
- Contributing guide