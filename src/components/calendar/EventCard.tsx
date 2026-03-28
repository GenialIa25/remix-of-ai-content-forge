import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, MapPin, ExternalLink } from 'lucide-react';
import type { CalendarEvent } from '@/hooks/useCalendarEvents';

interface EventCardProps {
  event: CalendarEvent;
  showDate?: boolean;
}

export function EventCard({ event, showDate = false }: EventCardProps) {
  const startDate = parseISO(event.start);
  const endDate = event.end ? parseISO(event.end) : null;

  return (
    <div className="rounded-[10px] bg-secondary border border-border p-4 space-y-3">
      <div className="flex gap-4">
        <div className="flex-1 space-y-2 min-w-0">
          {showDate && (
            <p className="text-xs text-muted-foreground capitalize">
              {format(startDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </p>
          )}

          <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 shrink-0" />
            <span>
              {format(startDate, 'HH:mm')}
              {endDate && ` – ${format(endDate, 'HH:mm')}`}
            </span>
          </div>

          {event.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
          )}

          {event.location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

        <div
          className="shrink-0 w-12 h-14 rounded-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: '#eff5ce' }}
        >
          <span className="text-[10px] font-medium uppercase" style={{ color: '#5a6b2a' }}>
            {format(startDate, 'MMM', { locale: ptBR })}
          </span>
          <span className="text-lg font-bold" style={{ color: '#2d3a0f' }}>
            {format(startDate, 'd')}
          </span>
        </div>
      </div>

      {event.url && (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium hover:underline"
          style={{ color: '#5a6b2a' }}
        >
          Acessar evento
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
