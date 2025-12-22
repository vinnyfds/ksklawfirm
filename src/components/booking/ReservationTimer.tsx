'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

type ReservationTimerProps = {
  expiresAt: string; // ISO string
  onExpire: () => void;
};

export function ReservationTimer({ expiresAt, onExpire }: ReservationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setTimeLeft(0);
        onExpire();
        return;
      }

      setTimeLeft(Math.floor(difference / 1000)); // Convert to seconds
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (timeLeft <= 0) {
    return null;
  }

  return (
    <Card className="bg-feedback-warning/10 border-feedback-warning">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-feedback-warning" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-body-sm font-medium text-text-primary dark:text-dark-text-primary">
            Your slot is reserved for:{' '}
            <span className="font-bold">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

