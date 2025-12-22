import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { RecentArticlesSection } from '@/components/sections/RecentArticlesSection';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/navigation';

export default async function HomePage() {
  const t = await getTranslations('common');

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CredibilityBar />
      <TestimonialsSection />
      <RecentArticlesSection />
      <section className="py-16 md:py-24 bg-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-h2 font-serif font-bold mb-4">
            {t('readyToGetStarted')}
          </h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            {t('bookConsultationToday')}
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/booking">{t('scheduleConsultation')}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
