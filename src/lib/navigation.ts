import { createNavigation } from 'next-intl/navigation';
import { useSearchParams as nextUseSearchParams } from 'next/navigation';
import { routing } from '@/i18n';

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

// useSearchParams doesn't need locale handling, but we export it for consistency
export { nextUseSearchParams as useSearchParams };
