import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kalanidhi Sanjeeva Kumar - High Court Advocate | Legal Services for NRIs',
  description: 'Expert legal services for Non-Resident Indians (NRIs) in Hyderabad, India. Specializing in ancestral properties, divorce, property litigations, and civil/criminal matters. 20 years of High Court experience.',
  keywords: ['NRI lawyer', 'Hyderabad advocate', 'property litigation', 'divorce lawyer', 'ancestral property'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

