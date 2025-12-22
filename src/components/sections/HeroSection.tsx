'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/navigation';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="bg-gradient-to-b from-brand-primary to-brand-secondary text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-display font-serif font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/booking">{t('bookButton')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/services">{t('viewServices')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

