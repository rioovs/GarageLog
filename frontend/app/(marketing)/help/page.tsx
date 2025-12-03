import { Search, Book, User, Settings, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Help Center - VehicleHub",
  description: "Find answers to common questions and learn how to use VehicleHub.",
}

export default function HelpPage() {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Everything you need to know to get up and running.",
      articles: ["Quick Start Guide", "Adding Your First Vehicle", "Importing Data"],
    },
    {
      icon: User,
      title: "Account & Billing",
      description: "Manage your subscription and account settings.",
      articles: ["Updating Payment Method", "Changing Password", "Two-Factor Authentication"],
    },
    {
      icon: Settings,
      title: "Features & Tutorials",
      description: "Deep dives into VehicleHub's powerful features.",
      articles: ["Setting Up Maintenance Schedules", "Generating Tax Reports", "Using the Mobile App"],
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Solutions to common issues and error messages.",
      articles: ["Login Issues", "Sync Problems", "Browser Compatibility"],
    },
  ]

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How can we help?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search for articles..." 
              className="pl-12 h-12 text-lg bg-card border-border"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <div key={idx} className="p-8 rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.articles.map((article, aIdx) => (
                    <li key={aIdx}>
                      <a href="#" className="text-primary hover:underline flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center bg-muted/30 rounded-2xl p-12 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-8">Our support team is available 24/7 to assist you.</p>
          <Button size="lg">Contact Support</Button>
        </div>
      </div>
    </div>
  )
}
