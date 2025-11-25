import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Code, ChefHat, Sparkles, Zap, Shield, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-gradient">Build & Cook</span>
              <br />
              with AI Intelligence
            </h1>

            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 animate-slide-up">
              Combining bolt.diy's powerful development tools with Chef's smart recipe management.
              One platform, infinite possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link href="/projects">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  <Code className="w-5 h-5 mr-2" />
                  Start Building
                </Button>
              </Link>
              <Link href="/recipes">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Powerful Features</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Everything you need in one integrated platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="card hover group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of developers and food enthusiasts using Bolt Chef
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
              <Sparkles className="w-5 h-5 mr-2" />
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Code,
    title: 'AI Code Generation',
    description:
      'Generate production-ready code with multiple AI providers including OpenAI, Anthropic, and Google Gemini.',
  },
  {
    icon: ChefHat,
    title: 'Smart Recipe Management',
    description:
      'Create, share, and discover recipes with AI-powered suggestions based on your available ingredients.',
  },
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    description:
      'Work together on projects and share recipes with your team in real-time.',
  },
  {
    icon: Globe,
    title: 'Multi-Provider AI',
    description:
      'Choose from 19+ AI providers for development and recipe generation.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your data is encrypted and secure with enterprise-grade authentication.',
  },
  {
    icon: Sparkles,
    title: 'Seamless Integration',
    description:
      'All features work together seamlessly in one unified platform.',
  },
]
