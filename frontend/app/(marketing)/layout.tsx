import { MainNav } from "@/components/marketing/main-nav"
import { Footer } from "@/components/marketing/footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
