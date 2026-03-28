interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  highlight?: boolean;
  format?: 'currency' | 'number' | 'percent';
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  highlight = false,
  format = 'number',
}: MetricCardProps) {
  const formattedValue = formatValue(value, format);
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className="flex flex-col justify-between rounded-[10px] p-4 min-h-[120px]"
      style={
        highlight
          ? { backgroundColor: '#eff5ce', border: '1px solid #c9d4a0' }
          : undefined
      }
      // non-highlight uses themed bg
      {...(!highlight && {
        className:
          'flex flex-col justify-between rounded-[10px] p-4 min-h-[120px] bg-secondary border border-border',
      })}
    >
      <p
        className="text-xs font-medium leading-tight"
        style={highlight ? { color: '#5a6b2a' } : undefined}
        {...(!highlight && { className: 'text-xs font-medium leading-tight text-muted-foreground' })}
      >
        {title}
      </p>

      <p
        className="text-2xl font-bold mt-auto"
        style={highlight ? { color: '#2d3a0f' } : undefined}
        {...(!highlight && { className: 'text-2xl font-bold mt-auto text-foreground' })}
      >
        {formattedValue}
      </p>

      {(change !== undefined || changeLabel) && (
        <p className="text-xs mt-1" style={{ color: changeLabel ? '#5a6b2a' : isPositive ? '#5a6b2a' : undefined }}
          {...(!changeLabel && !isPositive && change !== undefined && { className: 'text-xs mt-1 text-destructive' })}
        >
          {changeLabel || (
            <>
              {isPositive ? '▲' : '▼'} {Math.abs(change!)}%
            </>
          )}
        </p>
      )}
    </div>
  );
}

function formatValue(value: string | number, format: string): string {
  if (typeof value === 'string') return value;
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'percent':
      return `${value}%`;
    default:
      return new Intl.NumberFormat('en-US').format(value);
  }
}
