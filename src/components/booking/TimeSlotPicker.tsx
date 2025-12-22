'use client';

import { formatInTimezone } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type AvailabilitySlot = {
  startTime: string;
  endTime: string;
};

type TimeSlotPickerProps = {
  slots: AvailabilitySlot[];
  selectedSlot: AvailabilitySlot | null;
  onSelect: (slot: AvailabilitySlot) => void;
  timezone: string;
};

export function TimeSlotPicker({ slots, selectedSlot, onSelect, timezone }: TimeSlotPickerProps) {
  if (slots.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-text-secondary dark:text-dark-text-secondary">
            No available time slots for this date.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h3 className="text-h3 font-serif font-bold text-brand-primary mb-4">Select a Time</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.startTime === slot.startTime;
          const timeDisplay = formatInTimezone(slot.startTime, timezone, 'h:mm a');

          return (
            <Button
              key={slot.startTime}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => onSelect(slot)}
              className="h-auto py-3"
            >
              {timeDisplay}
            </Button>
          );
        })}
      </div>
      {selectedSlot && (
        <div className="mt-4 p-4 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-md">
          <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
            Selected: {formatInTimezone(selectedSlot.startTime, timezone, 'PPpp zzz')}
          </p>
          <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
            IST: {formatInTimezone(selectedSlot.startTime, 'Asia/Kolkata', 'PPpp zzz')}
          </p>
        </div>
      )}
    </div>
  );
}

