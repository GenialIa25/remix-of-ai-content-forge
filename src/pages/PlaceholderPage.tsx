interface Props {
  title: string;
  subtitle?: string;
}

export default function PlaceholderPage({ title, subtitle }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'ITC Garamond Std Lt Cond', Garamond, serif", fontSize: '2.6rem' }}>
          {title}
        </h1>
        {subtitle && <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>}

        <div className="rounded-[14px] bg-card border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
            <span className="text-xl">🚧</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Em construção</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Esta seção será entregue na próxima fase. A estrutura espelha as páginas equivalentes já implementadas.
          </p>
        </div>
      </div>
    </div>
  );
}
