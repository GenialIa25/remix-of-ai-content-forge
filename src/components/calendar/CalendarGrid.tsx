import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';
import type { CalendarEvent } from '@/hooks/useCalendarEvents';

interface CalendarGridProps {
  currentMonth: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({ currentMonth, events, selectedDate, onSelectDate }: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();
  const paddingDays = Array(startDay).fill(null);

  const countEvents = (date: Date) =>
    events.filter(e => isSameDay(parseISO(e.start), date)).length;

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <div key={i} className="text-center text-[10px] font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {paddingDays.map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map(day => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const evtCount = countEvents(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`aspect-square rounded-lg text-xs flex flex-col items-center justify-center transition-colors relative ${
                isToday(day) ? 'font-bold' : ''
              } ${isSelected ? '' : 'hover:bg-secondary'}`}
              style={
                isSelected
                  ? { backgroundColor: '#eff5ce', color: '#2d3a0f' }
                  : isToday(day)
                  ? { color: '#5a6b2a' }
                  : undefined
              }
            >
              <span>{format(day, 'd')}</span>
              {evtCount > 0 && !isSelected && (
                <div className="flex gap-0.5 mt-0.5">
                  {Array(Math.min(evtCount, 3))
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: '#5a6b2a' }}
                      />
                    ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
