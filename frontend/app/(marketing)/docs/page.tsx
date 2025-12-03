import Link from "next/link"
import { ArrowRight, Code, BookOpen, Terminal } from "lucide-react"

export const metadata = {
  title: "Documentation - VehicleHub",
  description: "Technical documentation for developers and power users.",
}

export default function DocsPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Build, integrate, and extend with VehicleHub.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Link href="#" className="group p-8 rounded-2xl border border-border bg-card hover:border-primary transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">User Guides</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive guides for all VehicleHub features.
            </p>
            <div className="flex items-center text-sm font-medium text-primary">
              Read Guides <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="#" className="group p-8 rounded-2xl border border-border bg-card hover:border-primary transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">API Reference</h3>
            <p className="text-muted-foreground mb-4">
              Detailed API documentation for building integrations.
            </p>
            <div className="flex items-center text-sm font-medium text-primary">
              View API Docs <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="#" className="group p-8 rounded-2xl border border-border bg-card hover:border-primary transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">SDKs & Tools</h3>
            <p className="text-muted-foreground mb-4">
              Libraries and tools to help you build faster.
            </p>
            <div className="flex items-center text-sm font-medium text-primary">
              Browse Tools <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="border-t border-border pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Popular Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Authentication", "Webhooks", "Rate Limits", "Error Handling", "Pagination", "Filtering", "Versioning", "SDKs"].map((topic, idx) => (
              <Link key={idx} href="#" className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-sm font-medium text-foreground">
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
