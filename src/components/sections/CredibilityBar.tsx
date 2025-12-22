'use client';

import { useTranslations } from 'next-intl';

export function CredibilityBar() {
  const t = useTranslations('credibility');

  const stats = [
    { label: t('yearsOfExperience'), value: '20+' },
    { label: t('highCourtAdvocate'), value: '✓' },
    { label: t('nriSpecialization'), value: '✓' },
  ];

  return (
    <section className="py-12 bg-brand-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-2">
                {stat.value}
              </div>
              <div className="text-body-md">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

