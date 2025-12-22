'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type PaymentMethod = 'razorpay' | 'paypal' | null;

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  amount: number;
  currency: string;
};

export function PaymentMethodSelector({
  selectedMethod,
  onSelect,
  amount,
  currency,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
        Select Payment Method
      </h2>
      <div className="mb-6 p-4 bg-surface-ground dark:bg-dark-surface-ground rounded-md">
        <div className="flex justify-between items-center">
          <span className="text-body-md font-medium">Total Amount:</span>
          <span className="text-h3 font-bold text-brand-primary">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: currency,
            }).format(amount)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMethod === 'razorpay'
              ? 'ring-2 ring-brand-accent border-brand-accent'
              : ''
          }`}
          onClick={() => onSelect('razorpay')}
        >
          <CardHeader>
            <CardTitle className="text-brand-primary">Razorpay</CardTitle>
            <CardDescription>
              Pay with UPI, Credit/Debit Card, Net Banking, or Wallets (India & International)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={selectedMethod === 'razorpay' ? 'default' : 'outline'}
              onClick={(e) => {
                e.stopPropagation();
                onSelect('razorpay');
              }}
              className="w-full"
            >
              {selectedMethod === 'razorpay' ? 'Selected' : 'Select Razorpay'}
            </Button>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMethod === 'paypal'
              ? 'ring-2 ring-brand-accent border-brand-accent'
              : ''
          }`}
          onClick={() => onSelect('paypal')}
        >
          <CardHeader>
            <CardTitle className="text-brand-primary">PayPal</CardTitle>
            <CardDescription>
              Pay securely with PayPal account or Credit/Debit Card (International)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={selectedMethod === 'paypal' ? 'default' : 'outline'}
              onClick={(e) => {
                e.stopPropagation();
                onSelect('paypal');
              }}
              className="w-full"
            >
              {selectedMethod === 'paypal' ? 'Selected' : 'Select PayPal'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

