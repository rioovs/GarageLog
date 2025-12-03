'use client';

import { Card, CardContent } from '@/components/ui';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            {t('testimonials.title')}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Alex Johnson",
              role: "Car Enthusiast",
              content: "Finally, an app that doesn't look like it was built in 2010. GarageLog is clean, fast, and does exactly what I need.",
            },
            {
              name: "Sarah Williams",
              role: "Fleet Manager",
              content: "I manage 5 family cars and this app is a lifesaver. The tax reminders alone have saved me hundreds in fines.",
            },
            {
              name: "Michael Chen",
              role: "Daily Commuter",
              content: "Simple and effective. I love seeing how much I've spent on maintenance over the years. Highly recommended.",
            }
          ].map((testimonial, i) => (
            <Card key={i} className="bg-card border-border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
