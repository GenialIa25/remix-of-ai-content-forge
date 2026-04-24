import { Users, Eye, Video, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { ProfileMetricCard } from '@/components/instagram/ProfileMetricCard';

const recentVideos = [
  { emoji: '🎬', title: 'Como construí um canal de 100K em 12 meses', duration: '12:34', time: '3 dias', views: '128.4K', engagement: '8.2', highlight: 12.4, color: '#5a6b2a' },
  { emoji: '💡', title: '5 lições caras que aprendi vendendo cursos', duration: '8:21', time: '1 semana', views: '78.2K', engagement: '6.4', highlight: 7.1, color: '#a16207' },
  { emoji: '🚀', title: 'Meu setup completo de gravação em 2026', duration: '15:08', time: '2 semanas', views: '52.6K', engagement: '5.8', highlight: 4.3, color: '#a16207' },
  { emoji: '📚', title: 'Storytelling para criadores: o framework completo', duration: '22:47', time: '3 semanas', views: '194.3K', engagement: '11.2', highlight: 18.6, color: '#5a6b2a' },
  { emoji: '🎯', title: 'Por que parei de pivotar (e você deveria também)', duration: '9:54', time: '1 mês', views: '34.1K', engagement: '4.1', highlight: 2.8, color: '#a16207' },
  { emoji: '☕', title: 'Reagindo a comentários do canal', duration: '6:12', time: '1 mês', views: '8.4K', engagement: '2.3', highlight: 0.7, color: '#71717a' },
];

export default function YoutubeCanalPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 px-4 py-2.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground">
          Dados via <strong className="text-foreground">Social Blade API</strong> e <strong className="text-foreground">YouTube Data API v3</strong>
        </div>

        <h1 className="text-3xl font-semibold text-foreground mb-6" style={{ fontFamily: "'ITC Garamond Std Lt Cond', Garamond, serif", fontSize: '2.6rem' }}>
          Meu Canal
        </h1>

        <div className="relative rounded-[14px] p-6 mb-8 border border-border overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(0 0% 13%) 100%)' }}>
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #ef4444, #f97316, #ec4899)' }}
            >
              SF
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white">Samuel Fonseca</h2>
              <p className="text-sm text-white/60">@samuelfonseca</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-sm font-bold" style={{ backgroundColor: '#eff5ce', color: '#2d3a0f' }}>
              A
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          <ProfileMetricCard label="Inscritos" value="184.2K" change={4.8} changePositive icon={Users} />
          <ProfileMetricCard label="Total de Views" value="12.8M" change={6.3} changePositive icon={Eye} />
          <ProfileMetricCard label="Vídeos Publicados" value="312" change={2.1} changePositive icon={Video} />
          <ProfileMetricCard label="Inscritos/Mês" value="+8.4K" change={12.2} changePositive icon={TrendingUp} />
          <ProfileMetricCard label="Rank Social Blade" value="#28.421" change={5.4} changePositive icon={Award} />
          <ProfileMetricCard label="Rank por Inscritos" value="#19.382" change={3.1} changePositive icon={BarChart3} />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Vídeos Recentes</h2>
          <div className="space-y-2">
            {recentVideos.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-[10px] bg-card border border-border hover:border-foreground/30 transition-colors cursor-pointer">
                <div className="w-28 h-16 rounded-lg flex items-center justify-center text-3xl shrink-0" style={{ background: 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(0 0% 18%) 100%)' }}>
                  {v.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{v.title}</p>
                  <p className="text-xs text-muted-foreground">{v.duration} · {v.time}</p>
                </div>
                <div className="flex items-center gap-4 text-xs shrink-0">
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Eye className="w-3.5 h-3.5" /> {v.views}</span>
                  <span className="text-muted-foreground">{v.engagement}%</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: v.color === '#5a6b2a' ? '#eff5ce' : v.color === '#a16207' ? '#fef3c7' : 'hsl(var(--secondary))', color: v.color === '#5a6b2a' ? '#2d3a0f' : v.color === '#a16207' ? '#78350f' : 'hsl(var(--muted-foreground))' }}
                  >
                    {v.highlight}x
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
