# QNom - Singapore's Zero-Cost F&B Discovery Platform

<p align="center">
  <em>Queue none, nom more. Your lunch hour, returned.</em>
</p>

## 🚀 Overview

QNom is Singapore's first real-time queue tracking platform that helps diners save 30+ minutes daily by providing live wait times for hawker centers, food courts, and restaurants. Built with a revolutionary zero-cost infrastructure model, QNom operates without commission fees while delivering sub-50ms response times.

## 🎯 Key Features

- **Real-Time Queue Tracking**: Live wait times updated by the community
- **Smart Recommendations**: AI-powered suggestions based on your preferences
- **Zero Commission**: Free for all hawkers and restaurants forever
- **Offline-First PWA**: Works even in basements and MRT stations
- **Multi-Language**: English, Mandarin, Malay, and Tamil support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers (Edge Computing)
- **Database**: Supabase (PostgreSQL)
- **Real-time**: WebSockets via Cloudflare
- **Analytics**: Cloudflare Analytics
- **Maps**: Mapbox GL JS

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qnom.git
cd qnom
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
qnom/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                   # Utility functions
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── architecture/     # Technical design
│   ├── business/         # Business model
│   ├── development/      # Dev guidelines
│   └── operations/       # Ops procedures
├── tests/                # Test files
└── workers/              # Cloudflare Workers
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🚀 Deployment

QNom uses Cloudflare Pages for hosting:

```bash
npm run build
npx wrangler pages publish out
```

## 📊 Project Status

- **Current Phase**: MVP Development
- **Target Launch**: March 2024
- **Progress**: See [PROGRESS.md](./PROGRESS.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/development/CONTRIBUTING.md).

## 📖 Documentation

- [Project Overview](./docs/PROJECT_OVERVIEW.md)
- [Technical Architecture](./docs/architecture/TECHNICAL_ARCHITECTURE.md)
- [Business Model](./docs/business/BUSINESS_MODEL.md)
- [Development Setup](./docs/development/SETUP.md)

## 🎯 Roadmap

### Phase 1: MVP (Q1 2024)
- [x] Technical architecture design
- [x] Business model validation
- [ ] Core queue tracking system
- [ ] Basic mobile interface
- [ ] 10 pilot partners

### Phase 2: Growth (Q2 2024)
- [ ] 100 partner restaurants
- [ ] 10,000 active users
- [ ] Premium features
- [ ] B2B analytics

### Phase 3: Scale (Q3-Q4 2024)
- [ ] 1,000 partners
- [ ] 50,000 users
- [ ] Regional expansion
- [ ] Series A funding

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Singapore's hawker community
- Early beta testers
- Open source contributors

---

Built with ❤️ for Singapore's food lovers