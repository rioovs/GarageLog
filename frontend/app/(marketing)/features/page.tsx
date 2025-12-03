import { CheckCircle2, BarChart3, FileText, Wrench } from "lucide-react"

export const metadata = {
  title: "Features - VehicleHub",
  description: "Explore the powerful features that make VehicleHub the best choice for vehicle management.",
}

export default function FeaturesPage() {
  const features = [
    {
      icon: Wrench,
      title: "Smart Maintenance Tracking",
      description: "Never miss a service interval again. Set automated reminders for oil changes, tire rotations, and inspections based on mileage or date.",
    },
    {
      icon: BarChart3,
      title: "Cost Analytics & Insights",
      description: "Visualize your spending patterns. Track fuel efficiency, service costs, and total cost of ownership per vehicle with intuitive charts.",
    },
    {
      icon: FileText,
      title: "Digital Document Vault",
      description: "Securely store registration, insurance, and warranty documents. Access them instantly from anywhere when you need them most.",
    },
    {
      icon: CheckCircle2,
      title: "Tax & Compliance",
      description: "Stay compliant with automated tax reminders. Generate reports for tax deductions and ensure your fleet is always road-legal.",
    },
  ]

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything you need to manage your fleet
          </h1>
          <p className="text-xl text-muted-foreground">
            From maintenance schedules to expense tracking, VehicleHub provides a comprehensive suite of tools to keep your vehicles running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
