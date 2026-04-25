import { Calendar, MapPin, Users } from 'lucide-react';

const masterclasses = [
  {
    day: '08',
    month: 'Mai',
    name: 'Sistema de Conteúdo Infinito',
    time: '20:00 — 22:00',
    place: 'Online · Zoom',
    enrolled: 412,
    status: 'Em breve' as const,
  },
  {
    day: '15',
    month: 'Mai',
    name: 'Funil de Vendas para Creators',
    time: '19:30 — 21:30',
    place: 'Online · Zoom',
    enrolled: 287,
    status: 'Aberto' as const,
  },
  {
    day: '22',
    month: 'Mai',
    name: 'IA Aplicada ao Marketing',
    time: '20:00 — 22:00',
    place: 'Online · Zoom',
    enrolled: 156,
    status: 'Aberto' as const,
  },
];

export default function UpcomingMasterclasses() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Próximas Masterclasses
      </h2>
      <div className="space-y-2">
        {masterclasses.map((mc, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-[10px] bg-secondary border border-border hover:bg-accent transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center min-w-[56px] h-14 rounded-lg bg-background border border-border">
              <span className="text-xl font-bold text-foreground leading-none">{mc.day}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{mc.month}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{mc.name}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {mc.time}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {mc.place}</span>
                <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {mc.enrolled} inscritos</span>
              </div>
            </div>
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={
                mc.status === 'Em breve'
                  ? { backgroundColor: 'hsl(38 92% 90%)', color: 'hsl(28 80% 30%)' }
                  : { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }
              }
            >
              {mc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
