'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from '@/lib/navigation';
import { locales, type Locale } from '@/i18n';
import { useState, useRef, useEffect } from 'react';

const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // usePathname() from next-intl already returns pathname without locale prefix
    const currentPath = pathname || '/';
    
    // Preserve query parameters (next-intl router handles this, but we preserve explicitly)
    const search = searchParams?.toString();
    const targetPath = search ? `${currentPath}?${search}` : currentPath;
    
    // Use push to navigate to the new locale
    router.push(targetPath, { locale: newLocale });
    setIsOpen(false);
    
    // Preserve hash fragment after navigation (client-side only)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      // Wait for navigation to complete before setting hash
      setTimeout(() => {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
      }, 0);
    }
    
    // Focus the button after navigation to maintain focus context
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index?: number) => {
    if (!isOpen && e.key === 'Enter' && e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = index !== undefined ? (index + 1) % locales.length : 0;
      menuItemsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex =
        index !== undefined ? (index - 1 + locales.length) % locales.length : locales.length - 1;
      menuItemsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      menuItemsRef.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      menuItemsRef.current[locales.length - 1]?.focus();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus first menu item when opening
      setTimeout(() => {
        menuItemsRef.current[0]?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key (global handler)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="px-3 py-2 rounded-md bg-brand-secondary/20 hover:bg-brand-secondary/30 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
        aria-label={`Current language: ${localeNames[locale]}. Change language`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="language-menu"
      >
        {localeNames[locale]}
        <span className="ml-2" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      {isOpen && (
        <div
          id="language-menu"
          role="menu"
          aria-label="Language selection menu"
          className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-surface-border dark:border-dark-surface-border"
        >
          <div className="py-1">
            {locales.map((loc, index) => (
              <button
                key={loc}
                ref={(el) => {
                  menuItemsRef.current[index] = el;
                }}
                onClick={() => switchLocale(loc)}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    switchLocale(loc);
                  }
                }}
                role="menuitem"
                aria-label={`Switch to ${localeNames[loc]}`}
                aria-current={loc === locale ? 'true' : 'false'}
                className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none focus:bg-brand-secondary/20 ${
                  loc === locale
                    ? 'bg-brand-primary text-white font-medium'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {localeNames[loc]}
                {loc === locale && (
                  <span className="ml-2" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
