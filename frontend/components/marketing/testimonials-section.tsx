"use client"

import { useLanguage } from "@/lib/i18n-context"

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: t('testimonials.roles.fleetManager'),
      content: t('testimonials.content.1'),
      avatar: "ER",
    },
    {
      name: "James Chen",
      role: t('testimonials.roles.businessOwner'),
      content: t('testimonials.content.2'),
      avatar: "JC",
    },
    {
      name: "Sarah Thompson",
      role: t('testimonials.roles.personalDriver'),
      content: t('testimonials.content.3'),
      avatar: "ST",
    },
  ]

  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-3">{t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-muted/50 border border-border rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
