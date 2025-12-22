'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  legalMatter: string;
};

type BookingFormProps = {
  onSubmit: (data: BookingFormData) => void;
  isSubmitting?: boolean;
};

export function BookingForm({ onSubmit, isSubmitting = false }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    legalMatter: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.legalMatter.trim()) {
      newErrors.legalMatter = 'Please describe your legal matter';
    } else if (formData.legalMatter.trim().length < 10) {
      newErrors.legalMatter = 'Please provide more details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'UAE',
    'Singapore',
    'Other',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
        <CardDescription>
          Please provide your information so we can prepare for your consultation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-body-sm font-medium mb-2">
                Full Name <span className="text-feedback-error">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.name ? 'border-feedback-error' : ''}
              />
              {errors.name && (
                <p className="text-body-sm text-feedback-error mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-body-sm font-medium mb-2">
                Email Address <span className="text-feedback-error">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className={errors.email ? 'border-feedback-error' : ''}
              />
              {errors.email && (
                <p className="text-body-sm text-feedback-error mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-body-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-body-sm font-medium mb-2">
                Country of Residence
              </label>
              <Select id="country" name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="legalMatter" className="block text-body-sm font-medium mb-2">
              Brief Description of Your Legal Matter <span className="text-feedback-error">*</span>
            </label>
            <Textarea
              id="legalMatter"
              name="legalMatter"
              required
              value={formData.legalMatter}
              onChange={handleChange}
              placeholder="Please provide a brief description of your legal issue..."
              rows={5}
              className={errors.legalMatter ? 'border-feedback-error' : ''}
            />
            {errors.legalMatter && (
              <p className="text-body-sm text-feedback-error mt-1">{errors.legalMatter}</p>
            )}
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

