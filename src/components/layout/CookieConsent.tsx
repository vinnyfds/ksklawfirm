'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to avoid flash of unstyled content
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    // Dispatch custom event for analytics scripts to listen to
    window.dispatchEvent(new Event('cookie-consent-accepted'));
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-primary text-white shadow-lg border-t-2 border-brand-accent"
      role="dialog"
      aria-label="Cookie consent banner"
      aria-modal="true"
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex-1">
            <h3 className="font-serif font-bold text-lg mb-2">Cookie Consent</h3>
            <p className="text-body-sm md:text-body-md opacity-90">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By
              clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
              <a
                href="/privacy-policy"
                className="underline hover:text-brand-accent transition-colors"
                aria-label="Read our Privacy Policy"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="border-white text-white hover:bg-white/10"
            >
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept} className="bg-brand-accent hover:bg-brand-accent/90">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

