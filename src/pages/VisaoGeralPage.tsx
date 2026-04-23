import { TrendingUp, TrendingDown, Calendar, MapPin, Users } from 'lucide-react';

const metrics = [
  { label: 'Receita', value: 'R$ 482.300', change: 12.4, positive: true },
  { label: 'Recebimentos', value: 'R$ 318.900', change: 8.2, positive: true },
  { label: 'MRR', value: 'R$ 96.500', change: 4.6, positive: true },
  { label: 'Novos Clientes', value: '37', change: 22.1, positive: true },
  { label: 'Seguidores Instagram', value: '128.4K', change: 3.1, positive: true },
  { label: 'Inscritos YouTube', value: '52.7K', change: 5.8, positive: true },
  { label: 'Lista de Email', value: '24.130', change: 1.2, positive: true },
  { label: 'Despesas', value: 'R$ 142.700', change: -2.4, positive: false },
];

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

export default function VisaoGeralPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: "'ITC Garamond Std Lt Cond', Garamond, serif", fontSize: '2.6rem' }}>
            Visão Geral
          </h1>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary hover:bg-accent text-foreground border border-border transition-colors">
            Enviar Total Mensal
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary hover:bg-accent text-foreground border border-border transition-colors">
            Enviar Vitória da Semana
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{ backgroundColor: '#eff5ce', borderColor: '#c9d4a0', color: '#2d3a0f' }}
          >
            + Novo Negócio
          </button>
        </div>

        {/* Metrics grid 4x2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-[10px] p-4 bg-secondary border border-border flex flex-col gap-2 min-h-[112px]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-auto">{m.value}</p>
              <p className={`text-xs flex items-center gap-1 ${m.positive ? '' : 'text-destructive'}`} style={m.positive ? { color: '#5a6b2a' } : undefined}>
                {m.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {m.positive ? '+' : ''}{m.change}%
              </p>
            </div>
          ))}
        </div>

        {/* Próximas Masterclasses */}
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
      </div>
    </div>
  );
}
