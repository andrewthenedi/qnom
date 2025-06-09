# QNom - Your AI-Powered Hawker Food Companion

> Discover Singapore's best hawker food through intelligent recommendations, real-time updates, and community insights.

## About QNom

QNom transforms how locals and tourists discover authentic hawker food in Singapore. Using AI-powered recommendations and real-time data, we help food lovers find their perfect meal while supporting our beloved hawker community.

### Key Features

- **AI-Powered Discovery**: Get personalized hawker stall recommendations based on your preferences
- **Real-Time Updates**: Live queue times, stall availability, and special menu items
- **Community Reviews**: Authentic ratings and reviews from real food lovers
- **Dietary Filters**: Easy search for halal, vegetarian, and allergy-friendly options
- **Multi-Language Support**: Available in English, Chinese, Malay, and Tamil
- **Social Features**: Share discoveries, create food lists, and connect with other foodies

## Quick Start

### Prerequisites

- Node.js 20+ LTS
- pnpm (recommended) or npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/qnom/qnom.git
cd qnom

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Executive Summary](docs/EXECUTIVE_SUMMARY.md) - Project overview and vision
- [Technical Stack](docs/development/TECH_STACK.md) - Architecture and technology choices
- [API Documentation](docs/development/API.md) - Backend service details
- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute
- [Community Guidelines](docs/operations/COMMUNITY.md) - Community programs and engagement

## Project Structure

```
qnom/
├── app/                    # Next.js 14 app directory
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
├── workers/              # Cloudflare Workers code
├── supabase/            # Database migrations and functions
├── docs/                # Project documentation
└── tests/               # Test files
```

## Contributing

We welcome contributions from the community! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Submitting pull requests
- Coding standards
- Testing requirements

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Community

Join our growing community of food lovers and contributors:

- **Discord**: [Join our server](https://discord.gg/qnom) for discussions
- **GitHub Discussions**: Share ideas and feedback
- **Telegram**: [@qnom_sg](https://t.me/qnom_sg) for announcements

### Community Programs

- **Hawker Ambassador Program**: Help hawkers go digital
- **University Partnerships**: Collaborate with students
- **Contributor Recognition**: Rewards for active contributors

Learn more in our [Community Guide](docs/operations/COMMUNITY.md).

## Technology Stack

QNom is built with modern, scalable technologies:

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Backend**: Cloudflare Workers, Supabase
- **Infrastructure**: Vercel, Cloudflare CDN
- **Monitoring**: Sentry, PostHog

All running on free tiers to maintain sustainability. See [Tech Stack](docs/development/TECH_STACK.md) for details.

## Roadmap

### Phase 1: Foundation (Current)
- ✅ Core platform development
- ✅ Basic AI recommendations
- 🔄 Community building
- 🔄 Initial hawker onboarding

### Phase 2: Growth
- Advanced AI features
- Mobile applications
- Hawker analytics dashboard
- Regional expansion

### Phase 3: Scale
- Multi-country support
- Enterprise features
- API marketplace
- Advanced social features

## Support

- **Documentation**: Check `/docs` directory
- **Issues**: [GitHub Issues](https://github.com/qnom/qnom/issues)
- **Email**: support@qnom.sg
- **Discord**: Real-time help in #support channel

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Singapore's amazing hawker community
- Our contributors and volunteers
- Partner organizations and sponsors
- University partners and students

---

**Made with ❤️ for Singapore's Hawker Culture**

*QNom - Makan with Intelligence*