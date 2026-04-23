import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface ProfileMetricCardProps {
  label: string;
  value: string;
  change?: number;
  changePositive?: boolean;
  icon: LucideIcon;
}

export function ProfileMetricCard({ label, value, change, changePositive, icon: Icon }: ProfileMetricCardProps) {
  return (
    <div className="relative rounded-[10px] p-4 bg-card border border-border min-h-[112px] flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
      </div>
      <p className="text-2xl font-bold text-foreground mt-auto">{value}</p>
      {change !== undefined && (
        <p className="text-xs mt-1 flex items-center gap-1" style={changePositive ? { color: '#5a6b2a' } : { color: 'hsl(var(--destructive))' }}>
          {changePositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {changePositive ? '+' : ''}{change}%
        </p>
      )}
    </div>
  );
}
