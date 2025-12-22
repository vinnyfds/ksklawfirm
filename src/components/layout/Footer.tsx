import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-brand-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/ancestral-properties" className="hover:text-brand-accent transition-colors">
                  {t('ancestralProperties')}
                </Link>
              </li>
              <li>
                <Link href="/services/divorce" className="hover:text-brand-accent transition-colors">
                  {t('divorce')}
                </Link>
              </li>
              <li>
                <Link href="/services/property-litigation" className="hover:text-brand-accent transition-colors">
                  {t('propertyLitigation')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-brand-accent transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-brand-accent transition-colors">
                  {t('caseStudies')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-accent transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-accent transition-colors">
                  {t('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-accent transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-accent transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-brand-accent transition-colors">
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">{t('contact')}</h3>
            <p className="mb-2">Kalanidhi Sanjeeva Kumar</p>
            <p className="mb-2">{t('highCourtAdvocate')}</p>
            <p className="mb-2">
              <a href="tel:+919440217782" className="hover:text-brand-accent transition-colors">
                +91 9440217782
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-secondary text-center">
          <p>&copy; {new Date().getFullYear()} {t('rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}

