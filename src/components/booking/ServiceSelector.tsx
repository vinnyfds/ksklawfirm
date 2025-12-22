'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Consultation = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: {
    amount: number;
    currency: string;
  };
};

type ServiceSelectorProps = {
  consultations: Consultation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading?: boolean;
};

export function ServiceSelector({ consultations, selectedId, onSelect, isLoading = false }: ServiceSelectorProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
          Select Consultation Type
        </h2>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Loading consultation types...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (consultations.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
          Select Consultation Type
        </h2>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
              No consultation types available at this time.
            </p>
            <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
              Please contact us directly at +91 9440217782 or use the contact form.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
        Select Consultation Type
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consultations.map((consultation) => (
          <Card
            key={consultation.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedId === consultation.id
                ? 'ring-2 ring-brand-accent border-brand-accent'
                : ''
            }`}
            onClick={() => onSelect(consultation.id)}
          >
            <CardHeader>
              <CardTitle className="text-brand-primary">{consultation.name}</CardTitle>
              <CardDescription>{consultation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-h4 font-bold text-brand-primary">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: consultation.price.currency,
                    }).format(consultation.price.amount)}
                  </div>
                  <div className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                    {consultation.durationMinutes > 0
                      ? `${consultation.durationMinutes} minutes`
                      : 'Service-based'}
                  </div>
                </div>
                <Button
                  variant={selectedId === consultation.id ? 'default' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(consultation.id);
                  }}
                >
                  {selectedId === consultation.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

