'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Card, CardContent } from '@/components/ui/Card';

type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  location: string;
};

// Placeholder testimonials - will be replaced with API data
const placeholderTestimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Mr. Kumar helped me resolve my ancestral property dispute from the US. His communication was clear, and the process was seamless despite the time difference.',
    clientName: 'R. Singh',
    location: 'California, USA',
  },
  {
    id: '2',
    quote:
      'Professional, efficient, and trustworthy. I felt confident having Mr. Kumar represent my interests in India while I was in the UK.',
    clientName: 'A. Patel',
    location: 'London, UK',
  },
  {
    id: '3',
    quote:
      'The booking system made it so easy to schedule a consultation. The document upload portal was secure and convenient.',
    clientName: 'S. Nair',
    location: 'Dubai, UAE',
  },
];

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>(placeholderTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // TODO: Fetch testimonials from API
    // fetch('/api/testimonials?featured=true')
    //   .then((res) => res.json())
    //   .then((data) => setTestimonials(data));
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-surface-ground dark:bg-dark-surface-ground">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4 text-center">
          {t('sectionTitle')}
        </h2>
        <p className="text-body-md text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          {t('sectionDescription')}
        </p>
        <div className="max-w-3xl mx-auto">
          <Card className="bg-surface-bg dark:bg-dark-surface-bg">
            <CardContent className="p-8 md:p-12">
              <blockquote className="text-body-lg text-text-primary dark:text-dark-text-primary mb-6 italic">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {currentTestimonial.clientName}
                  </div>
                  <div className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                    {currentTestimonial.location}
                  </div>
                </div>
                {testimonials.length > 1 && (
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          index === currentIndex
                            ? 'bg-brand-accent'
                            : 'bg-surface-border dark:bg-dark-surface-border'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/testimonials"
            className="text-brand-secondary hover:text-brand-accent transition-colors font-medium"
          >
            {t('readMore')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

