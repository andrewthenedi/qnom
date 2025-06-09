import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Queue none, <span className="text-gradient">nom more</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Skip the lunch hour queues. QNom shows you real-time wait times at hawker centers and restaurants across Singapore. 
              Save 30+ minutes daily.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="shadow-qnom">
                Find Food Now
              </Button>
              <Button variant="ghost" size="lg">
                Learn More →
              </Button>
            </div>
          </div>

          {/* Value Proposition Cards */}
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <Card className="shadow-qnom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  Real-Time Queues
                </CardTitle>
                <CardDescription>
                  Live wait times updated by the community. Know before you go.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Crowd-sourced data from thousands of users ensures accuracy within 2 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-qnom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🍜</span>
                  Smart Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered suggestions based on your taste, location, and time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Discover hidden gems and avoid the crowds with personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-qnom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Forever Free
                </CardTitle>
                <CardDescription>
                  Zero commission for hawkers. Free for diners. Always.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Supporting Singapore&apos;s hawker heritage with technology that helps, not hurts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Making lunch hour efficient</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-4xl font-bold text-orange-600">30+</p>
                <p className="mt-2 text-sm text-gray-600">Minutes saved daily</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">118</p>
                <p className="mt-2 text-sm text-gray-600">Hawker centers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">14,000</p>
                <p className="mt-2 text-sm text-gray-600">Food stalls</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">$0</p>
                <p className="mt-2 text-sm text-gray-600">Commission fees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Get your lunch hour back</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of Singaporeans who save time every day with QNom.
          </p>
          <div className="mt-8">
            <Button size="lg" className="shadow-qnom">
              Start Using QNom Free
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No app download required. Works on any device.
          </p>
        </div>
      </section>
    </main>
  )
}