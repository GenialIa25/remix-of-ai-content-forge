import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Bookmark, Star, RefreshCw } from 'lucide-react';

type Tab = 'feed' | 'analise';

const monitoredProfiles = [
  { handle: '@joaocriativo', name: 'João Criativo', posts: 487, followers: '892K', initials: 'JC', color: '#f59e0b' },
  { handle: '@marketingdaila', name: 'Marketing da Laila', posts: 312, followers: '524K', initials: 'ML', color: '#ec4899' },
  { handle: '@growthbruno', name: 'Bruno Growth', posts: 218, followers: '348K', initials: 'BG', color: '#8b5cf6' },
];

const feedPosts = [
  { id: 1, emoji: '🔥', title: 'Como dobrei meu faturamento em 90 dias', sub: 'Reel · 47s', highlight: 18.4, highlightColor: '#5a6b2a', views: '482K', engagement: '12.4', handle: '@joaocriativo', time: '2h' },
  { id: 2, emoji: '📚', title: '5 frameworks de copy que ninguém te conta', sub: 'Carrossel · 8 slides', highlight: 11.2, highlightColor: '#a16207', views: '287K', engagement: '9.8', handle: '@marketingdaila', time: '5h' },
  { id: 3, emoji: '💡', title: 'Pare de fazer isso no seu Reels', sub: 'Reel · 32s', highlight: 22.1, highlightColor: '#5a6b2a', views: '628K', engagement: '15.2', handle: '@growthbruno', time: '8h' },
  { id: 4, emoji: '🎯', title: 'A fórmula do ângulo viral', sub: 'Carrossel · 6 slides', highlight: 7.4, highlightColor: '#3b82f6', views: '184K', engagement: '6.7', handle: '@joaocriativo', time: '1d' },
  { id: 5, emoji: '🚀', title: 'Bastidores: como gravo 30 vídeos por dia', sub: 'Reel · 58s', highlight: 14.6, highlightColor: '#a16207', views: '342K', engagement: '11.1', handle: '@marketingdaila', time: '1d' },
  { id: 6, emoji: '⚡', title: 'O segredo dos primeiros 3 segundos', sub: 'Reel · 24s', highlight: 19.8, highlightColor: '#5a6b2a', views: '512K', engagement: '13.8', handle: '@growthbruno', time: '2d' },
  { id: 7, emoji: '📊', title: 'Métricas que importam (e as que não)', sub: 'Carrossel · 10 slides', highlight: 4.2, highlightColor: '#3b82f6', views: '128K', engagement: '5.4', handle: '@joaocriativo', time: '2d' },
  { id: 8, emoji: '🎬', title: 'Storytelling em 15 segundos', sub: 'Reel · 18s', highlight: 16.3, highlightColor: '#5a6b2a', views: '398K', engagement: '12.9', handle: '@marketingdaila', time: '3d' },
];

export default function InstagramRadarPage() {
  const [tab, setTab] = useState<Tab>('feed');
  const [profileFilter, setProfileFilter] = useState('all');
  const [sort, setSort] = useState('recent');
  const [format, setFormat] = useState('all');
  const [period, setPeriod] = useState('30');
  const [account, setAccount] = useState('all');
  const [canReanalyze, setCanReanalyze] = useState(true);
  const [daysToNext, setDaysToNext] = useState(0);

  useEffect(() => {
    const last = localStorage.getItem('ig-radar-last-analysis');
    if (last) {
      const diff = Date.now() - parseInt(last);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days < 30) {
        setCanReanalyze(false);
        setDaysToNext(30 - days);
      }
    }
  }, []);

  const handleReanalyze = () => {
    localStorage.setItem('ig-radar-last-analysis', Date.now().toString());
    setCanReanalyze(false);
    setDaysToNext(30);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-foreground mb-6" style={{ fontFamily: "'ITC Garamond Std Lt Cond', Garamond, serif", fontSize: '2.6rem' }}>
          Radar
        </h1>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex">
              {(['feed', 'analise'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                    tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t === 'feed' ? 'Feed' : 'Análise'}
                  {tab === t && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ backgroundColor: '#5a6b2a' }} />
                  )}
                </button>
              ))}
            </div>
            {tab === 'feed' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sincronizado há 2h</span>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-accent text-foreground border border-border transition-colors">
                  <RefreshCw className="w-3 h-3" /> Sincronizar feed
                </button>
              </div>
            )}
            {tab === 'analise' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {canReanalyze ? 'Próxima análise disponível' : `Próxima análise em ${daysToNext} dias`}
                </span>
                <button
                  onClick={handleReanalyze}
                  disabled={!canReanalyze}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={canReanalyze ? { backgroundColor: '#eff5ce', color: '#2d3a0f', borderColor: '#c9d4a0' } : { backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--muted-foreground))' }}
                >
                  <RefreshCw className="w-3 h-3" /> Reanalisar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'feed' && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Perfis no Radar</h2>
              <p className="text-sm text-muted-foreground">Concorrentes e referências que você acompanha</p>
            </div>

            <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))' }}>
              {monitoredProfiles.map((p) => (
                <div key={p.handle} className="group relative rounded-[10px] p-3 bg-secondary border border-border hover:bg-accent transition-colors">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: p.color }}>
                      {p.initials}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-xs font-semibold text-foreground truncate">{p.handle}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{p.name}</p>
                    </div>
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span><strong className="text-foreground">{p.posts}</strong> posts</span>
                      <span><strong className="text-foreground">{p.followers}</strong></span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                    <button className="p-1 rounded bg-background/80 hover:bg-background"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                    <button className="p-1 rounded bg-background/80 hover:bg-background"><Trash2 className="w-3 h-3 text-destructive" /></button>
                  </div>
                </div>
              ))}
              <button className="rounded-[10px] p-3 border-2 border-dashed border-border hover:border-foreground/30 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground min-h-[140px]">
                <Plus className="w-5 h-5" />
                <span className="text-xs">Adicionar perfil</span>
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-6">3 de 7 perfis no radar</p>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 p-3 rounded-[10px] bg-secondary border border-border">
              <select value={profileFilter} onChange={(e) => setProfileFilter(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border-2 text-foreground" style={{ borderColor: profileFilter !== 'all' ? '#5a6b2a' : 'hsl(var(--border))' }}>
                <option value="all">Todos os perfis</option>
                {monitoredProfiles.map((p) => <option key={p.handle} value={p.handle}>{p.handle}</option>)}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground">
                <option value="recent">Mais recentes</option>
                <option value="views">Mais views</option>
                <option value="engagement">Maior engajamento</option>
              </select>
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground">
                <option value="all">Todos</option>
                <option value="reels">Reels</option>
                <option value="carrosseis">Carrosséis</option>
                <option value="fotos">Fotos</option>
              </select>
              <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground">
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="120">Últimos 120 dias</option>
                <option value="365">Último ano</option>
              </select>
              <select value={account} onChange={(e) => setAccount(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground ml-auto">
                <option value="all">Todas as contas</option>
                <option value="main">Conta principal</option>
              </select>
            </div>

            {/* Feed grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {feedPosts.map((p) => (
                <div key={p.id} className="rounded-[10px] bg-card border border-border overflow-hidden hover:border-foreground/30 transition-colors cursor-pointer">
                  <div className="relative aspect-[4/5]" style={{ background: 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(0 0% 18%) 100%)' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">{p.emoji}</div>
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60"><Bookmark className="w-3.5 h-3.5 text-white" /></button>
                    <button className="absolute top-2 right-10 p-1.5 rounded-full bg-black/40 hover:bg-black/60"><Star className="w-3.5 h-3.5 text-white" /></button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: p.highlightColor === '#5a6b2a' ? '#bef264' : p.highlightColor === '#a16207' ? '#fbbf24' : '#93c5fd' }}>
                      {p.highlight}x
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-sm font-semibold text-foreground line-clamp-2">{p.title}</p>
                    <p className="text-[11px] text-muted-foreground">{p.sub}</p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1.5 border-t border-border mt-2">
                      <span>{p.views} views · {p.engagement}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="font-medium">{p.handle}</span>
                      <span>{p.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'analise' && (
          <div className="space-y-8">
            {/* Destaques dos Concorrentes */}
            <div className="rounded-[10px] bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Destaques dos Concorrentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                      <th className="text-left font-medium py-2">Post</th>
                      <th className="text-left font-medium py-2">Perfil</th>
                      <th className="text-left font-medium py-2">Destaque</th>
                      <th className="text-right font-medium py-2">Curtidas</th>
                      <th className="text-right font-medium py-2">Alcance</th>
                      <th className="text-left font-medium py-2 pl-4">Por que Funcionou</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { post: 'Pare de fazer isso no Reels', profile: '@growthbruno', highlight: 22.1, color: '#5a6b2a', likes: '94.2K', reach: '628K', why: 'Hook negativo + curiosity gap' },
                      { post: 'Como dobrei meu faturamento', profile: '@joaocriativo', highlight: 18.4, color: '#5a6b2a', likes: '72.8K', reach: '482K', why: 'Resultado específico + storytelling' },
                      { post: 'O segredo dos 3 primeiros segundos', profile: '@growthbruno', highlight: 19.8, color: '#5a6b2a', likes: '81.5K', reach: '512K', why: 'Promessa direta + utilidade' },
                      { post: '5 frameworks de copy', profile: '@marketingdaila', highlight: 11.2, color: '#a16207', likes: '38.4K', reach: '287K', why: 'Listicle salvável' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="py-3 text-foreground">{row.post}</td>
                        <td className="py-3 text-muted-foreground">{row.profile}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: row.color === '#5a6b2a' ? '#eff5ce' : '#fef3c7', color: row.color === '#5a6b2a' ? '#2d3a0f' : '#78350f' }}>
                            {row.highlight}x
                          </span>
                        </td>
                        <td className="py-3 text-right text-foreground">{row.likes}</td>
                        <td className="py-3 text-right text-foreground">{row.reach}</td>
                        <td className="py-3 pl-4 text-muted-foreground">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights de Mercado */}
            <div className="rounded-[10px] bg-card border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Insights de Mercado</h2>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Formatos em alta</p>
                <div className="flex flex-wrap gap-2">
                  {['Reel curto (<30s)', 'Carrossel didático', 'Reel narrado em 1ª pessoa', 'Comparações antes/depois'].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-xs bg-secondary border border-border text-foreground">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Hashtags em alta</p>
                <div className="flex flex-wrap gap-2">
                  {['#creatoreconomy', '#marketingdigital', '#copywriting', '#growthhacking', '#solopreneur'].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-xs bg-secondary border border-border text-foreground">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Lacunas identificadas</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Pouca exploração de bastidores autênticos do dia-a-dia. Conteúdo de comunidade (UGC) também é raro entre os perfis monitorados — uma oportunidade clara de diferenciação.
                </p>
              </div>
              <div className="rounded-lg p-4 border" style={{ backgroundColor: '#eff5ce', borderColor: '#c9d4a0' }}>
                <p className="text-xs font-bold uppercase mb-1" style={{ color: '#5a6b2a' }}>💡 Insight em destaque</p>
                <p className="text-sm" style={{ color: '#2d3a0f' }}>
                  Reels com hook negativo ("Pare de…", "Não faça…") estão performando 2.3x melhor que hooks positivos no nicho.
                </p>
              </div>
            </div>

            {/* Insights do Perfil */}
            <div className="rounded-[10px] bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Insights do Perfil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Melhor Desempenho', text: 'Reels educativos com narração direta superam carrosséis em 4.2x de alcance.' },
                  { label: 'Frequência Ideal', text: 'Postar 5x por semana, com 3 Reels e 2 Carrosséis, mantém o ritmo de crescimento.' },
                  { label: 'Melhor Horário', text: 'Terça e quinta, entre 19h e 21h, geram o maior pico de engajamento orgânico.' },
                  { label: 'Oportunidades', text: 'Explorar storytelling pessoal e bastidores — 0% do seu conteúdo atual usa essa abordagem.' },
                ].map((card) => (
                  <div key={card.label} className="rounded-lg p-4 bg-secondary border border-border">
                    <p className="text-sm font-bold text-foreground mb-1">{card.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm">
                  <span className="text-muted-foreground">Avaliação Geral: </span>
                  <span className="font-bold text-foreground">Crescimento sólido, mas previsível. Diversificar o portfólio editorial pode acelerar a retenção em 30-40%.</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
