'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  location: string;
  rating?: number;
};

type TestimonialsPageClientProps = {
  locale: string;
};

export function TestimonialsPageClient({ locale }: TestimonialsPageClientProps) {
  const t = useTranslations('testimonials');
  const tNav = useTranslations('nav');
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTestimonials(data.data.testimonials);
        } else {
          setError(t('error'));
        }
      })
      .catch((err) => {
        console.error('Error fetching testimonials:', err);
        setError(t('error'));
      })
      .finally(() => setIsLoading(false));
  }, [t]);

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('pageTitle'), href: '/testimonials' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4 text-center mt-8">
          {t('pageTitle')}
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-dark-text-secondary">{t('loading')}</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-feedback-error">{error}</p>
          </div>
        )}

        {!isLoading && !error && testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-dark-text-secondary">
              {t('noTestimonials')}
            </p>
          </div>
        )}

        {!isLoading && !error && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

