import { ReactNode } from 'react';

interface MetricsSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  columns?: number;
}

export function MetricsSection({ title, icon, children, columns = 4 }: MetricsSectionProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }[columns] || 'grid-cols-2 lg:grid-cols-4';

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">
        {icon} {title}
      </h3>
      <div className={`grid ${gridClass} gap-3`}>{children}</div>
    </div>
  );
}
