'use client';

import { Card, CardContent } from '@/components/ui/Card';

type Step = {
  id: string;
  label: string;
  description: string;
};

type BookingStepperProps = {
  steps: Step[];
  currentStep: number;
};

export function BookingStepper({ steps, currentStep }: BookingStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const stepNumber = index + 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors
                    ${isCompleted ? 'bg-feedback-success text-white' : ''}
                    ${isActive ? 'bg-brand-accent text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-surface-border dark:bg-dark-surface-border text-text-secondary dark:text-dark-text-secondary' : ''}
                  `}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={`text-body-sm font-medium ${
                      isActive
                        ? 'text-brand-primary dark:text-brand-secondary'
                        : 'text-text-secondary dark:text-dark-text-secondary'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-body-sm text-text-secondary dark:text-dark-text-secondary hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    isCompleted
                      ? 'bg-feedback-success'
                      : 'bg-surface-border dark:bg-dark-surface-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

