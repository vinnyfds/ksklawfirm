import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Timezone Utilities
 */

/**
 * Get the user's timezone from browser
 * @returns IANA timezone string (e.g., 'America/New_York')
 */
export function getUserTimezone(): string {
  if (typeof window !== 'undefined') {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return 'Asia/Kolkata'; // Default to IST
}

/**
 * Convert a UTC date to a specific timezone
 * @param date - Date in UTC
 * @param timeZone - Target timezone (IANA string)
 * @returns Date object in the target timezone
 */
export function convertToTimezone(date: Date, timeZone: string): Date {
  return utcToZonedTime(date, timeZone);
}

/**
 * Format a date in a specific timezone
 * @param date - Date to format
 * @param timeZone - Target timezone (IANA string)
 * @param formatString - Date format string (default: 'PPpp zzz')
 * @returns Formatted date string
 */
export function formatInTimezone(
  date: Date | string,
  timeZone: string,
  formatString: string = 'PPpp zzz'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatInTimeZone(dateObj, timeZone, formatString);
}

/**
 * Convert a date from one timezone to UTC
 * @param date - Date in source timezone
 * @param timeZone - Source timezone (IANA string)
 * @returns Date object in UTC
 */
export function convertFromTimezone(date: Date, timeZone: string): Date {
  return zonedTimeToUtc(date, timeZone);
}

/**
 * Get common NRI timezones
 * @returns Array of timezone objects with label and value
 */
export function getCommonNRITimezones(): Array<{ label: string; value: string }> {
  return [
    { label: 'Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
    { label: 'Mountain Time (US & Canada)', value: 'America/Denver' },
    { label: 'Central Time (US & Canada)', value: 'America/Chicago' },
    { label: 'Eastern Time (US & Canada)', value: 'America/New_York' },
    { label: 'London, UK', value: 'Europe/London' },
    { label: 'Dubai, UAE', value: 'Asia/Dubai' },
    { label: 'Sydney, Australia', value: 'Australia/Sydney' },
    { label: 'Toronto, Canada', value: 'America/Toronto' },
    { label: 'Singapore', value: 'Asia/Singapore' },
    { label: 'India Standard Time', value: 'Asia/Kolkata' },
  ];
}

/**
 * Format date and time for display in both user timezone and IST
 * @param date - Date in UTC
 * @param userTimezone - User's timezone
 * @returns Object with formatted strings
 */
export function formatDualTimezone(
  date: Date | string,
  userTimezone: string
): { userTime: string; istTime: string } {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return {
    userTime: formatInTimezone(dateObj, userTimezone, 'MMMM d, yyyy h:mm a zzz'),
    istTime: formatInTimezone(dateObj, 'Asia/Kolkata', 'MMMM d, yyyy h:mm a zzz'),
  };
}

