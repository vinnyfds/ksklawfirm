import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';

type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  location: string;
  rating?: number;
  imageUrl?: string;
};

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Generate placeholder image URL if not provided
  const imageUrl =
    testimonial.imageUrl ||
    `https://i.pravatar.cc/150?img=${testimonial.id.charCodeAt(0) % 70}`;

  return (
    <Card className="bg-surface-bg dark:bg-dark-surface-bg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt={testimonial.clientName}
              width={60}
              height={60}
              className="rounded-full object-cover"
              onError={(e) => {
                // Fallback to a default placeholder if image fails to load
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  testimonial.clientName
                )}&size=150&background=1B4F72&color=fff`;
              }}
            />
          </div>
          <div className="flex-1">
            {testimonial.rating && (
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating!
                        ? 'text-brand-accent fill-current'
                        : 'text-surface-border dark:text-dark-surface-border'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            <div className="font-semibold text-text-primary dark:text-dark-text-primary">
              {testimonial.clientName}
            </div>
            <div className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
              {testimonial.location}
            </div>
          </div>
        </div>
        <blockquote className="text-body-md text-text-primary dark:text-dark-text-primary italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  );
}

