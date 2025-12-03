export function LogoStrip() {
  const logos = [
    { name: "Acme", initials: "AC" },
    { name: "Globex", initials: "GX" },
    { name: "Soylent", initials: "SY" },
    { name: "TechCorp", initials: "TC" },
    { name: "Initech", initials: "IN" },
  ]

  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-medium">Trusted by forward-thinking teams</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2 text-muted-foreground/60">
              <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs font-semibold text-muted-foreground">
                {logo.initials}
              </div>
              <span className="text-sm font-medium text-muted-foreground">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
