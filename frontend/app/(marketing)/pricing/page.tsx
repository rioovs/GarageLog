import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Pricing - VehicleHub",
  description: "Simple, transparent pricing for fleets of all sizes.",
}

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals with 1-2 vehicles.",
      features: ["Up to 2 vehicles", "Basic maintenance tracking", "Document storage (50MB)", "Email support"],
      cta: "Get Started",
      href: "/register",
      variant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "For families and small businesses.",
      features: ["Up to 10 vehicles", "Advanced analytics", "Priority support", "Unlimited document storage", "Tax reporting"],
      cta: "Start Free Trial",
      href: "/register?plan=pro",
      variant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large fleets and organizations.",
      features: ["Unlimited vehicles", "API access", "Dedicated account manager", "SSO integration", "Custom reporting"],
      cta: "Contact Sales",
      href: "/contact",
      variant: "outline" as const,
    },
  ]

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border bg-card'} flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={plan.variant} className="w-full">
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
