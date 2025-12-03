import { Shield, Lock, Server, Eye } from "lucide-react"

export const metadata = {
  title: "Security - VehicleHub",
  description: "How we protect your data and ensure privacy.",
}

export default function SecurityPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Security at our core
          </h1>
          <p className="text-xl text-muted-foreground">
            We take the security of your data seriously. Here's how we protect your information.
          </p>
        </div>

        <div className="grid gap-12">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Bank-Grade Encryption</h3>
              <p className="text-muted-foreground leading-relaxed">
                All data transmitted between your device and our servers is encrypted using TLS 1.2+ (Transport Layer Security). At rest, your sensitive data is encrypted using AES-256, the industry standard for data protection.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Secure Infrastructure</h3>
              <p className="text-muted-foreground leading-relaxed">
                VehicleHub is hosted on world-class cloud infrastructure with 24/7 monitoring, automated backups, and redundant systems to ensure high availability and data integrity.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Compliance & Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are fully compliant with GDPR and CCPA regulations. We never sell your data to third parties. You have full control over your data, including the ability to export or delete it at any time.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Continuous Monitoring</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our security team employs automated vulnerability scanning and regular penetration testing to identify and address potential threats before they affect our users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
