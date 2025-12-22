'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/lib/navigation';
import { useState } from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from '@/lib/navigation';

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/case-studies', label: t('caseStudies') },
    { href: '/testimonials', label: t('testimonials') },
    { href: '/blog', label: t('blog') },
    { href: '/gallery', label: t('gallery') },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname?.endsWith('/');
    }
    return pathname?.includes(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-bold hover:text-brand-accent transition-colors">
            Kalanidhi Sanjeeva Kumar
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-brand-accent transition-colors ${
                  isActive(link.href) ? 'text-brand-accent font-medium' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-brand-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
            >
              {t('bookConsultation')}
            </Link>
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher />
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-brand-secondary transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-brand-secondary pt-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 px-4 rounded-md hover:bg-brand-secondary transition-colors ${
                    isActive(link.href) ? 'bg-brand-secondary text-brand-accent font-medium' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-center font-medium mt-2"
              >
                {t('bookConsultation')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

