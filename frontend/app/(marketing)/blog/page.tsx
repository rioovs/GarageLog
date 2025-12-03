import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog - VehicleHub",
  description: "Tips, tricks, and insights for better vehicle management.",
}

export default function BlogPage() {
  const posts = [
    {
      title: "5 Tips for Better Fuel Efficiency",
      excerpt: "Simple driving habits and maintenance tips that can save you hundreds of dollars at the pump this year.",
      date: "Dec 1, 2024",
      category: "Maintenance",
      slug: "fuel-efficiency-tips",
    },
    {
      title: "Why Regular Oil Changes Matter",
      excerpt: "Understanding the science behind engine oil and why skipping changes can lead to catastrophic failure.",
      date: "Nov 28, 2024",
      category: "Education",
      slug: "oil-changes-explained",
    },
    {
      title: "Understanding Your Vehicle's Warning Lights",
      excerpt: "Don't panic when that light comes on. Here's a guide to the most common dashboard symbols.",
      date: "Nov 15, 2024",
      category: "Guides",
      slug: "warning-lights-guide",
    },
    {
      title: "Fleet Management Best Practices for 2025",
      excerpt: "How modern technology is changing the way businesses manage their vehicle assets.",
      date: "Nov 10, 2024",
      category: "Business",
      slug: "fleet-management-2025",
    },
  ]

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Garage Log
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights, updates, and guides from the VehicleHub team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <Link key={idx} href={`/blog/${post.slug}`} className="block group">
              <Card className="h-full hover:shadow-lg transition-all duration-200 border-border bg-card">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
