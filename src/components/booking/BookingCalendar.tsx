'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type AvailabilitySlot = {
  startTime: string;
  endTime: string;
};

type BookingCalendarProps = {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  availableSlots: AvailabilitySlot[];
  timezone: string;
};

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  availableSlots,
  timezone,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    const date = new Date(slot.startTime);
    const dateKey = format(date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasAvailableSlots = (date: Date): boolean => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return !!slotsByDate[dateKey] && slotsByDate[dateKey].length > 0;
  };

  const getSlotCount = (date: Date): number => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return slotsByDate[dateKey]?.length || 0;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigateMonth('prev')} size="icon">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h3 className="text-h3 font-serif font-bold text-brand-primary">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button variant="outline" onClick={() => navigateMonth('next')} size="icon">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-body-sm font-medium text-text-secondary dark:text-dark-text-secondary">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day) => {
            const hasSlots = hasAvailableSlots(day);
            const slotCount = getSlotCount(day);
            const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
            const isCurrentDay = isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => hasSlots && onDateSelect(day)}
                disabled={!hasSlots}
                className={`
                  aspect-square p-2 rounded-md text-body-sm transition-colors
                  ${!hasSlots ? 'opacity-30 cursor-not-allowed' : 'hover:bg-surface-bg dark:hover:bg-dark-surface-bg cursor-pointer'}
                  ${isSelected ? 'bg-brand-accent text-white' : ''}
                  ${isCurrentDay && !isSelected ? 'ring-2 ring-brand-primary' : ''}
                  ${hasSlots && !isSelected ? 'bg-surface-ground dark:bg-dark-surface-ground' : ''}
                `}
                aria-label={`${format(day, 'MMMM d, yyyy')}${hasSlots ? ` - ${slotCount} available slots` : ' - No slots available'}`}
              >
                <div>{format(day, 'd')}</div>
                {hasSlots && (
                  <div className="text-xs mt-1">
                    {slotCount} {slotCount === 1 ? 'slot' : 'slots'}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

