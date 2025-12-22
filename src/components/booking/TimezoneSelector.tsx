'use client';

import { Select } from '@/components/ui/Select';
import { getCommonNRITimezones, getUserTimezone } from '@/lib/utils';
import { useEffect, useState } from 'react';

type TimezoneSelectorProps = {
  value: string;
  onChange: (timezone: string) => void;
  className?: string;
};

export function TimezoneSelector({ value, onChange, className }: TimezoneSelectorProps) {
  const [mounted, setMounted] = useState(false);
  const timezones = getCommonNRITimezones();

  useEffect(() => {
    setMounted(true);
    // Auto-detect and set user's timezone on mount if no value is set
    if (!value && mounted) {
      const detected = getUserTimezone();
      onChange(detected);
    }
  }, [mounted, value, onChange]);

  if (!mounted) {
    return (
      <Select className={className} disabled>
        <option>Loading...</option>
      </Select>
    );
  }

  return (
    <Select
      value={value || getUserTimezone()}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      aria-label="Select your timezone"
    >
      {timezones.map((tz) => (
        <option key={tz.value} value={tz.value}>
          {tz.label}
        </option>
      ))}
    </Select>
  );
}

