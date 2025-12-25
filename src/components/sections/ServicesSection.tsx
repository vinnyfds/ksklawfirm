'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export function ServicesSection() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  const services = [
    {
      title: t('ancestralProperties.title'),
      description: t('ancestralProperties.shortDescription'),
      href: '/services/ancestral-properties',
      icon: '🏛️',
    },
    {
      title: t('divorce.title'),
      description: t('divorce.shortDescription'),
      href: '/services/divorce',
      icon: '⚖️',
    },
    {
      title: t('propertyLitigation.title'),
      description: t('propertyLitigation.shortDescription'),
      href: '/services/property-litigation',
      icon: '🏠',
    },
    {
      title: t('civilMatters.title'),
      description: t('civilMatters.shortDescription'),
      href: '/services/civil-matters',
      icon: '📜',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-bg dark:bg-dark-surface-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4 text-center">
          {t('sectionTitle')}
        </h2>
        <p className="text-body-md text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          {t('sectionDescription')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle className="text-brand-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <Link
                  href={service.href}
                  className="text-brand-secondary hover:text-brand-accent transition-colors font-medium text-body-sm"
                >
                  Explore {service.title} Services →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="text-brand-secondary hover:text-brand-accent transition-colors font-medium"
          >
            {t('viewAllServices')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

