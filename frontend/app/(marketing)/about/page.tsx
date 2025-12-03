import Image from "next/image"

export const metadata = {
  title: "About Us - VehicleHub",
  description: "Learn about our mission to simplify vehicle management.",
}

export default function AboutPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground">
            To empower vehicle owners and fleet managers with simple, powerful tools that save time, money, and stress.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto mb-20">
          <p>
            VehicleHub was born out of a simple frustration: keeping track of vehicle maintenance, expenses, and paperwork is a hassle. Spreadsheets are clunky, paper logs get lost, and existing software is often too complex or expensive for the average user.
          </p>
          <p>
            We set out to build a solution that is intuitive, accessible, and powerful enough to handle everything from a single family car to a small business fleet.
          </p>
          <p>
            Today, VehicleHub helps thousands of users track millions of miles, ensuring their vehicles are safe, compliant, and running efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="text-4xl font-bold text-primary mb-2">2024</div>
            <div className="text-muted-foreground">Founded</div>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="text-4xl font-bold text-primary mb-2">10k+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-muted-foreground">Miles Tracked</div>
          </div>
        </div>
      </div>
    </div>
  )
}
