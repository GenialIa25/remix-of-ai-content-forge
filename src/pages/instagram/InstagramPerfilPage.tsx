import { Users, UserPlus, Image as ImgIcon, Heart, Award, BarChart3, MessageCircle } from 'lucide-react';
import { ProfileMetricCard } from '@/components/instagram/ProfileMetricCard';

const recentPosts = [
  { type: 'REEL', emoji: '🎬', likes: '12.4K', comments: '342', highlight: 8.2, color: '#5a6b2a' },
  { type: 'CARROSSEL', emoji: '📚', likes: '8.7K', comments: '198', highlight: 5.1, color: '#5a6b2a' },
  { type: 'FOTO', emoji: '📸', likes: '4.2K', comments: '87', highlight: 2.4, color: '#a16207' },
  { type: 'REEL', emoji: '🎥', likes: '21.8K', comments: '512', highlight: 14.7, color: '#5a6b2a' },
  { type: 'REEL', emoji: '💡', likes: '6.1K', comments: '124', highlight: 3.4, color: '#a16207' },
  { type: 'CARROSSEL', emoji: '🎯', likes: '9.3K', comments: '256', highlight: 5.8, color: '#5a6b2a' },
  { type: 'FOTO', emoji: '☕', likes: '1.9K', comments: '34', highlight: 0.9, color: '#71717a' },
  { type: 'REEL', emoji: '🚀', likes: '18.2K', comments: '478', highlight: 11.3, color: '#5a6b2a' },
  { type: 'CARROSSEL', emoji: '📊', likes: '7.5K', comments: '167', highlight: 4.6, color: '#a16207' },
];

export default function InstagramPerfilPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* API Banner */}
        <div className="mb-6 px-4 py-2.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground">
          Dados via <strong className="text-foreground">Social Blade API</strong> · Posts recentes via <strong className="text-foreground">Apify Instagram Scraper</strong>
        </div>

        {/* Topbar */}
        <h1 className="text-3xl font-semibold text-foreground mb-6" style={{ fontFamily: "'ITC Garamond Std Lt Cond', Garamond, serif", fontSize: '2.6rem' }}>
          Meu Perfil
        </h1>

        {/* Hero card */}
        <div className="relative rounded-[14px] p-6 mb-8 border border-border overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(0 0% 13%) 100%)' }}>
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)' }}
            >
              SF
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white">Samuel Fonseca</h2>
              <p className="text-sm text-white/60">@samuelfonseca</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-sm font-bold" style={{ backgroundColor: '#eff5ce', color: '#2d3a0f' }}>
              B+
            </div>
          </div>
        </div>

        {/* Metrics grid 2 cols (3 cols on lg) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          <ProfileMetricCard label="Seguidores" value="128.4K" change={3.1} changePositive icon={Users} />
          <ProfileMetricCard label="Seguindo" value="487" change={0.4} changePositive icon={UserPlus} />
          <ProfileMetricCard label="Publicações" value="1.247" change={2.1} changePositive icon={ImgIcon} />
          <ProfileMetricCard label="Likes Totais" value="3.8M" change={5.2} changePositive icon={Heart} />
          <ProfileMetricCard label="Rank Social Blade" value="#42.318" change={8.7} changePositive icon={Award} />
          <ProfileMetricCard label="Rank Seguidores" value="#28.541" change={4.3} changePositive icon={BarChart3} />
        </div>

        {/* Recent posts */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Posts Recentes via Apify
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {recentPosts.map((post, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-[10px] overflow-hidden cursor-pointer border border-border"
                style={{ background: 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(0 0% 18%) 100%)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-60">
                  {post.emoji}
                </div>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white">
                  {post.type}
                </span>
                <span
                  className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: post.color === '#71717a' ? '#d4d4d8' : post.color === '#a16207' ? '#fbbf24' : '#bef264' }}
                >
                  {post.highlight}x
                </span>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-sm">
                  <span className="inline-flex items-center gap-1"><Heart className="w-4 h-4 fill-white" /> {post.likes}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
