import { TrendingUp, TrendingDown } from 'lucide-react';

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

export default function VisaoGeralSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-foreground" style={{ fontFamily: "'ITC Garamond Std Lt Cond', serif", fontSize: '1.8rem' }}>
        Visão Geral
      </h2>

      <div className="flex flex-wrap gap-2">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
    </div>
  );
}
