import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QNom - Skip the Queue, Find Food Fast',
  description: 'Real-time queue tracking for Singapore hawker centers and restaurants. Save 30+ minutes daily with live wait times.',
  keywords: 'singapore food, hawker center, queue time, real-time, food discovery',
  authors: [{ name: 'QNom Team' }],
  openGraph: {
    title: 'QNom - Skip the Queue, Find Food Fast',
    description: 'Real-time queue tracking for Singapore hawker centers',
    url: 'https://qnom.app',
    siteName: 'QNom',
    images: [
      {
        url: 'https://qnom.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_SG',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center px-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gradient">QNom</span>
              </a>
            </div>
            <nav className="ml-auto flex items-center space-x-6">
              <a href="/discover" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Discover
              </a>
              <a href="/partners" className="text-sm font-medium hover:text-orange-600 transition-colors">
                For Partners
              </a>
              <a href="/about" className="text-sm font-medium hover:text-orange-600 transition-colors">
                About
              </a>
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-lg font-semibold text-gradient">QNom</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Your lunch hour, returned.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Product</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li><a href="/discover" className="hover:text-orange-600">Discover Food</a></li>
                  <li><a href="/mobile" className="hover:text-orange-600">Mobile App</a></li>
                  <li><a href="/api" className="hover:text-orange-600">API Access</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Partners</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li><a href="/partners" className="hover:text-orange-600">Join as Partner</a></li>
                  <li><a href="/success" className="hover:text-orange-600">Success Stories</a></li>
                  <li><a href="/support" className="hover:text-orange-600">Partner Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Company</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-orange-600">About Us</a></li>
                  <li><a href="/blog" className="hover:text-orange-600">Blog</a></li>
                  <li><a href="/careers" className="hover:text-orange-600">Careers</a></li>
                  <li><a href="/contact" className="hover:text-orange-600">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2024 QNom. Made with ❤️ for Singapore.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}