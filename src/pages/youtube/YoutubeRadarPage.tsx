import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Bookmark, Star, RefreshCw } from 'lucide-react';

type Tab = 'feed' | 'analise';

const monitoredChannels = [
  { handle: '@joaocriativo', name: 'João Criativo', videos: 248, subs: '892K', initials: 'JC', color: '#ef4444' },
  { handle: '@marketingdaila', name: 'Marketing da Laila', videos: 187, subs: '524K', initials: 'ML', color: '#ec4899' },
  { handle: '@growthbruno', name: 'Bruno Growth', videos: 132, subs: '348K', initials: 'BG', color: '#8b5cf6' },
];

const feedVideos = [
  { id: 1, emoji: '🔥', title: 'Como dobrei meu faturamento com YouTube', sub: 'Vídeo · 14:32', highlight: 18.4, highlightColor: '#5a6b2a', views: '482K', engagement: '12.4', handle: '@joaocriativo', time: '2d' },
  { id: 2, emoji: '⚡', title: 'O segredo dos primeiros 3 segundos no Shorts', sub: 'Short · 0:42', highlight: 22.1, highlightColor: '#5a6b2a', views: '628K', engagement: '15.2', handle: '@growthbruno', time: '3d' },
  { id: 3, emoji: '📚', title: 'Storytelling para criadores explicado', sub: 'Vídeo · 22:18', highlight: 11.2, highlightColor: '#a16207', views: '287K', engagement: '9.8', handle: '@marketingdaila', time: '5d' },
  { id: 4, emoji: '🎯', title: 'Como criar uma thumbnail que converte', sub: 'Vídeo · 11:08', highlight: 7.4, highlightColor: '#3b82f6', views: '184K', engagement: '6.7', handle: '@joaocriativo', time: '1sem' },
  { id: 5, emoji: '🚀', title: 'Bastidores: gravo 5 vídeos por dia', sub: 'Vlog · 18:42', highlight: 14.6, highlightColor: '#a16207', views: '342K', engagement: '11.1', handle: '@marketingdaila', time: '1sem' },
  { id: 6, emoji: '💡', title: 'Pare de cometer esses 7 erros no canal', sub: 'Vídeo · 16:55', highlight: 19.8, highlightColor: '#5a6b2a', views: '512K', engagement: '13.8', handle: '@growthbruno', time: '2sem' },
  { id: 7, emoji: '📊', title: 'Análise: por que esse vídeo bombou', sub: 'Vídeo · 9:24', highlight: 4.2, highlightColor: '#3b82f6', views: '128K', engagement: '5.4', handle: '@joaocriativo', time: '2sem' },
  { id: 8, emoji: '🎬', title: 'Live: Q&A com a comunidade', sub: 'Live · 1:12:08', highlight: 6.3, highlightColor: '#3b82f6', views: '94K', engagement: '4.8', handle: '@marketingdaila', time: '3sem' },
];

export default function YoutubeRadarPage() {
  const [tab, setTab] = useState<Tab>('feed');
  const [profileFilter, setProfileFilter] = useState('all');
  const [sort, setSort] = useState('recent');
  const [format, setFormat] = useState('all');
  const [period, setPeriod] = useState('30');
  const [account, setAccount] = useState('all');
  const [canReanalyze, setCanReanalyze] = useState(true);
  const [daysToNext, setDaysToNext] = useState(0);

  useEffect(() => {
    const last = localStorage.getItem('yt-radar-last-analysis');
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
    localStorage.setItem('yt-radar-last-analysis', Date.now().toString());
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

      <div className="sticky top-0 z-[15] bg-background/95 backdrop-blur border-b border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex">
              {(['feed', 'analise'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative transition-colors ${
                    tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ padding: '18px 28px', fontSize: '15px', fontWeight: 700 }}
                >
                  {t === 'feed' ? 'Feed' : 'Análise'}
                  {tab === t && <span className="absolute bottom-0 left-0 right-0" style={{ height: '3px', backgroundColor: '#5a6b2a' }} />}
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
              <h2 className="text-lg font-semibold text-foreground">Canais no Radar</h2>
              <p className="text-sm text-muted-foreground">Canais de referência que você acompanha</p>
            </div>

            <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))' }}>
              {monitoredChannels.map((p) => (
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
                      <span><strong className="text-foreground">{p.videos}</strong> vídeos</span>
                      <span><strong className="text-foreground">{p.subs}</strong></span>
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
                <span className="text-xs">Adicionar canal</span>
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-6">3 de 7 canais no radar</p>

            <div className="flex flex-wrap gap-2 mb-6 p-3 rounded-[10px] bg-secondary border border-border">
              <select value={profileFilter} onChange={(e) => setProfileFilter(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border-2 text-foreground" style={{ borderColor: profileFilter !== 'all' ? '#5a6b2a' : 'hsl(var(--border))' }}>
                <option value="all">Todos os canais</option>
                {monitoredChannels.map((p) => <option key={p.handle} value={p.handle}>{p.handle}</option>)}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground">
                <option value="recent">Mais recentes</option>
                <option value="views">Mais views</option>
                <option value="engagement">Maior engajamento</option>
              </select>
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground">
                <option value="all">Todos</option>
                <option value="videos">Vídeos</option>
                <option value="shorts">Shorts</option>
                <option value="lives">Lives</option>
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
                <option value="main">Canal principal</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {feedVideos.map((p) => (
                <div key={p.id} className="rounded-[10px] bg-card border border-border overflow-hidden hover:border-foreground/30 transition-colors cursor-pointer">
                  <div className="relative aspect-video" style={{ background: 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(0 0% 18%) 100%)' }}>
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
            {/* Desempenho do Meu Canal */}
            <div className="rounded-[10px] bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Desempenho do Meu Canal</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                      <th className="text-left font-medium py-2">Título</th>
                      <th className="text-right font-medium py-2">Views</th>
                      <th className="text-right font-medium py-2">Curtidas</th>
                      <th className="text-right font-medium py-2">Engajamento</th>
                      <th className="text-left font-medium py-2 pl-4">Destaque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'Storytelling para criadores', views: '194.3K', likes: '12.8K', eng: '11.2%', highlight: 18.6, color: '#5a6b2a' },
                      { title: 'Como construí 100K em 12 meses', views: '128.4K', likes: '8.4K', eng: '8.2%', highlight: 12.4, color: '#5a6b2a' },
                      { title: '5 lições caras vendendo cursos', views: '78.2K', likes: '4.1K', eng: '6.4%', highlight: 7.1, color: '#a16207' },
                      { title: 'Setup completo de gravação', views: '52.6K', likes: '2.8K', eng: '5.8%', highlight: 4.3, color: '#a16207' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="py-3 text-foreground">{row.title}</td>
                        <td className="py-3 text-right text-foreground">{row.views}</td>
                        <td className="py-3 text-right text-foreground">{row.likes}</td>
                        <td className="py-3 text-right text-foreground">{row.eng}</td>
                        <td className="py-3 pl-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: row.color === '#5a6b2a' ? '#eff5ce' : '#fef3c7', color: row.color === '#5a6b2a' ? '#2d3a0f' : '#78350f' }}>
                            {row.highlight}x
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Análise de Comentários */}
            <div className="rounded-[10px] bg-card border border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Análise de Comentários</h2>
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5a6b2a' }} /> Positivo 68%</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> Neutro 24%</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" /> Negativo 8%</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Perguntas Frequentes', items: ['Qual câmera você usa?', 'Como cobra por consultoria?', 'Tem curso completo?', 'Faz mentoria 1:1?'] },
                  { title: 'Feedbacks Comuns', items: ['Áudio impecável', 'Cortes muito rápidos no início', 'Edição cinematográfica', 'Mais exemplos práticos'] },
                  { title: 'Pedidos de Conteúdo', items: ['Vídeo sobre precificação', 'Bastidores de lançamentos', 'Stack de ferramentas 2026', 'Análise de canais menores'] },
                ].map((b) => (
                  <div key={b.title} className="rounded-lg p-4 bg-secondary border border-border">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{b.title}</p>
                    <ul className="space-y-1.5 text-sm text-foreground">
                      {b.items.map((it) => (<li key={it} className="leading-snug">• {it}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Destaques dos Concorrentes */}
            <div className="rounded-[10px] bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Destaques dos Concorrentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                      <th className="text-left font-medium py-2">Vídeo</th>
                      <th className="text-left font-medium py-2">Canal</th>
                      <th className="text-left font-medium py-2">Destaque</th>
                      <th className="text-right font-medium py-2">Curtidas</th>
                      <th className="text-right font-medium py-2">Alcance</th>
                      <th className="text-left font-medium py-2 pl-4">Por que Funcionou</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { post: 'Pare de cometer esses 7 erros', profile: '@growthbruno', highlight: 19.8, color: '#5a6b2a', likes: '81.5K', reach: '512K', why: 'Hook negativo + listicle' },
                      { post: 'Como dobrei meu faturamento', profile: '@joaocriativo', highlight: 18.4, color: '#5a6b2a', likes: '72.8K', reach: '482K', why: 'Resultado específico + storytelling' },
                      { post: 'O segredo dos 3 segundos no Shorts', profile: '@growthbruno', highlight: 22.1, color: '#5a6b2a', likes: '94.2K', reach: '628K', why: 'Promessa imediata + retenção' },
                      { post: 'Storytelling para criadores', profile: '@marketingdaila', highlight: 11.2, color: '#a16207', likes: '38.4K', reach: '287K', why: 'Framework completo salvável' },
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
                  {['Vídeo de 8-12min', 'Shorts narrados', 'Documentário curto', 'Análise de caso real'].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-xs bg-secondary border border-border text-foreground">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tags em alta</p>
                <div className="flex flex-wrap gap-2">
                  {['creatoreconomy', 'youtubebrasil', 'storytelling', 'marketingdigital', 'businessstrategy'].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-xs bg-secondary border border-border text-foreground">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Lacunas identificadas</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Pouca exploração de bastidores reais de operação e poucos canais publicando análises de números abertos. Oportunidade clara de diferenciação com transparência radical.
                </p>
              </div>
              <div className="rounded-lg p-4 border" style={{ backgroundColor: '#eff5ce', borderColor: '#c9d4a0' }}>
                <p className="text-xs font-bold uppercase mb-1" style={{ color: '#5a6b2a' }}>💡 Insight em destaque</p>
                <p className="text-sm" style={{ color: '#2d3a0f' }}>
                  Vídeos de 8-12 minutos têm 2.4x mais retenção que vídeos &gt;20min no nicho. Considere dividir conteúdos longos em séries.
                </p>
              </div>
            </div>

            {/* Insights do Canal */}
            <div className="rounded-[10px] bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Insights do Canal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Melhor Desempenho', text: 'Vídeos com case real e número específico no título têm 3.8x mais views que títulos genéricos.' },
                  { label: 'Frequência Ideal', text: '2 vídeos longos por semana + 3 Shorts diários mostram crescimento mais consistente de inscritos.' },
                  { label: 'Melhor Horário', text: 'Terças e quintas, entre 19h e 21h, geram 1.6x mais views nas primeiras 48h.' },
                  { label: 'Oportunidades', text: 'Conteúdo de bastidores e tutoriais técnicos estão sub-explorados — alta demanda nos comentários.' },
                ].map((b) => (
                  <div key={b.label} className="rounded-lg p-4 bg-secondary border border-border">
                    <p className="text-sm font-bold text-foreground mb-1">{b.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Avaliação Geral</p>
                <p className="text-sm font-bold text-foreground">Canal saudável com tendência positiva. Foque em mais conteúdo de caso real e expanda Shorts para acelerar inscritos.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
