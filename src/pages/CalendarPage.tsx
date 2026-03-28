import { useState } from 'react';
import { format, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { EventCard } from '@/components/calendar/EventCard';

export default function CalendarPage() {
  const { events, loading, error } = useCalendarEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const monthEvents = events.filter(e => isSameMonth(parseISO(e.start), currentMonth));

  const selectedDateEvents = selectedDate
    ? events.filter(e => isSameDay(parseISO(e.start), selectedDate))
    : [];

  const upcomingEvents = events
    .filter(e => parseISO(e.start) >= new Date())
    .sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())
    .slice(0, 20);

  const prevMonth = () =>
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const nextMonth = () =>
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar do calendário */}
      <div className="w-full md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r border-border p-4 space-y-4 overflow-y-auto">
        {/* Header mês */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <CalendarGrid
          currentMonth={currentMonth}
          events={monthEvents}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Toggle view */}
        <div className="flex bg-secondary rounded-lg p-1">
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
              view === 'calendar' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
          >
            Calendário
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
              view === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
          >
            Lista
          </button>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {view === 'calendar' ? (
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-semibold text-foreground capitalize">
                {selectedDate
                  ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })
                  : 'Selecione uma data'}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selectedDateEvents.length} evento(s)
              </p>
            </div>

            {selectedDate ? (
              <div className="space-y-3">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="rounded-[10px] bg-secondary border border-border p-8 text-center">
                    <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Nenhum evento nesta data</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[10px] bg-secondary border border-border p-8 text-center">
                <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Selecione uma data no calendário</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Próximos eventos</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {upcomingEvents.length} evento(s) agendados
              </p>
            </div>
            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} showDate />
                ))
              ) : (
                <div className="rounded-[10px] bg-secondary border border-border p-8 text-center">
                  <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Nenhum evento futuro encontrado</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
