import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

export const metadata = {
  title: "System Status - VehicleHub",
  description: "Current status of VehicleHub services.",
}

export default function StatusPage() {
  const systems = [
    { name: "API", status: "operational" },
    { name: "Database", status: "operational" },
    { name: "Frontend Application", status: "operational" },
    { name: "Authentication", status: "operational" },
    { name: "Email Notifications", status: "operational" },
    { name: "Third-party Integrations", status: "operational" },
  ]

  return (
    <div className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            System Status
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full font-medium border border-green-500/20">
            <CheckCircle2 className="w-5 h-5" />
            All Systems Operational
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden mb-12">
          {systems.map((system, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 border-b border-border last:border-0">
              <span className="font-medium text-foreground">{system.name}</span>
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Operational
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground">Past Incidents</h2>
          
          <div className="border-l-2 border-border pl-8 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-2 border-background"></div>
            <div className="mb-2 text-sm text-muted-foreground">Nov 15, 2024</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scheduled Maintenance</h3>
            <p className="text-muted-foreground">
              Completed scheduled database maintenance. No downtime was observed.
            </p>
          </div>

          <div className="border-l-2 border-border pl-8 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-2 border-background"></div>
            <div className="mb-2 text-sm text-muted-foreground">Oct 02, 2024</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">API Latency</h3>
            <p className="text-muted-foreground">
              Investigated and resolved increased latency in the reporting API.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
