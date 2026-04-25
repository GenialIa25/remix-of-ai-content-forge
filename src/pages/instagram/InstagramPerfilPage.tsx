import { TrendingUp, User, BarChart3, Star } from 'lucide-react';
import amandaProfile from '@/assets/amanda-profile.png';

export default function InstagramPerfilPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero card */}
        <div className="rounded-[14px] p-5 mb-5 border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 bg-muted">
              <img src={amandaProfile} alt="Amanda Lourenço" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[22px] font-bold text-foreground leading-tight">Amanda Lourenço</h2>
              <p className="text-[15px] text-muted-foreground mt-0.5">@amandallourenco</p>
            </div>
            <div
              className="px-4 py-2 rounded-full text-[15px] font-bold"
              style={{ backgroundColor: 'rgba(251, 191, 36, 0.12)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.35)' }}
            >
              B+
            </div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Seguidores - highlighted */}
          <div className="rounded-[14px] p-5 bg-card border-2 border-border min-h-[110px] flex flex-col justify-between" style={{ borderColor: 'hsl(var(--muted-foreground) / 0.4)' }}>
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Seguidores</p>
              <TrendingUp className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-[40px] font-bold text-foreground leading-none">181.8k</p>
          </div>

          {/* Seguindo */}
          <div className="rounded-[14px] p-5 bg-card border border-border min-h-[110px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Seguindo</p>
              <User className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-[40px] font-bold text-foreground leading-none">958</p>
          </div>

          {/* Publicações */}
          <div className="rounded-[14px] p-5 bg-card border border-border min-h-[110px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Publicações</p>
              <BarChart3 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-[40px] font-bold text-foreground leading-none">229</p>
          </div>

          {/* Rank Social Blade */}
          <div className="rounded-[14px] p-5 bg-card border border-border min-h-[110px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Rank Social Blade</p>
              <Star className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-[40px] font-bold text-foreground leading-none">#38.110</p>
          </div>

          {/* Rank Seguidores */}
          <div className="rounded-[14px] p-5 bg-card border border-border min-h-[110px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Rank Seguidores</p>
              <Star className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-[40px] font-bold text-foreground leading-none">#310.044</p>
          </div>
        </div>

        {/* Crescimento card */}
        <div className="rounded-[14px] p-5 bg-card border border-border">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
            Crescimento — Últimos 30 dias
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[34px] font-bold text-foreground leading-none">6.0k</p>
              <p className="text-sm text-muted-foreground mt-2">Seguidores/mês</p>
            </div>
            <div>
              <p className="text-[34px] font-bold text-foreground leading-none">1</p>
              <p className="text-sm text-muted-foreground mt-2">Posts/mês</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
