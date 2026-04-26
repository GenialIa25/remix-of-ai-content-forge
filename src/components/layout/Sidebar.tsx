import { useState } from 'react';
import gemzLogo from '@/assets/gemz-logo.png';
import gemzIcon from '@/assets/gemz-ai-icon.png';
import gemzWordmarkDark from '@/assets/gemz-wordmark-dark.png';
import gemzWordmarkLight from '@/assets/gemz-wordmark-light.png';
import { AGENTS, AGENT_AVATARS } from '@/types';
import { useChatStore, ActivePage } from '@/stores/chatStore';
import { PanelLeft, Pencil, Search, AppWindow, BookOpen, MessageSquare, X, FlaskConical, Sun, Moon, Home, Boxes, ClipboardCheck, GraduationCap, BarChart3, CalendarDays, Newspaper, LayoutGrid, Instagram, Youtube, ChevronRight, Bot } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import SearchModal from '@/components/modals/SearchModal';
import ImagesModal from '@/components/modals/ImagesModal';
import AppsModal from '@/components/modals/AppsModal';
import DocumentsModal from '@/components/modals/DocumentsModal';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeAgentId, setActiveAgent, conversations, activeConversationId, setActiveConversation, setActivePage, activePage } = useChatStore();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const recentConversations = conversations.slice(0, 5);

  // Cmd+K handler
  useState(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  if (!sidebarOpen) return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );

  const sidebarContent = (
    <aside className={`${isMobile ? 'w-full' : 'w-[260px]'} h-screen bg-card flex flex-col shrink-0`}>
      {/* Header - just toggle + new chat */}
      <div className="h-12 px-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={gemzLogo} alt="Gemz AI" className="w-[18px] h-[18px] rounded-sm" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            title="Fechar barra lateral"
            aria-label="Fechar sidebar"
          >
            {isMobile ? <X className="w-[18px] h-[18px] text-muted-foreground" /> : <PanelLeft className="w-[18px] h-[18px] text-muted-foreground" />}
          </button>
        </div>
        <button
          onClick={() => { setActiveConversation(null); setActivePage('home'); }}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          title="Novo chat"
          aria-label="Novo chat"
        >
          <Pencil className="w-[18px] h-[18px] text-muted-foreground" />
        </button>
      </div>

      {/* Nav items */}
      <div className="px-2 space-y-0.5">
        <NavItem icon={<Home className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="Início" active={activePage === 'home'} onClick={() => { setActivePage('home'); if (isMobile) setSidebarOpen(false); }} />
        <NavItem icon={<Boxes className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="CreatorFounder™️ Kit" active={activePage === 'creator-kit'} onClick={() => { setActivePage('creator-kit'); if (isMobile) setSidebarOpen(false); }} />
        <NavItem icon={<GraduationCap className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="Aulas" active={activePage === 'aulas'} onClick={() => { setActivePage('aulas'); if (isMobile) setSidebarOpen(false); }} />
        <NavItem icon={<CalendarDays className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="Calendário" active={activePage === 'calendario'} onClick={() => { setActivePage('calendario'); if (isMobile) setSidebarOpen(false); }} />
        <NavItem icon={<BookOpen className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="Documentos" onClick={() => setDocsOpen(true)} />
        <NavItem icon={<ClipboardCheck className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="Implementação" active={activePage === 'implementation'} onClick={() => { setActivePage('implementation'); if (isMobile) setSidebarOpen(false); }} />
        <NavItem icon={<BarChart3 className="w-[18px] h-[18px]" strokeWidth={1.5} />} label="Métricas" active={activePage === 'metrics'} onClick={() => { setActivePage('metrics'); if (isMobile) setSidebarOpen(false); }} />

        {/* Section separator + GEMZ brand label */}
        <div className="mx-4 my-2 h-px bg-border" />
        <div className="px-3 py-1.5 flex items-center">
          <GemzBrandLogo />
        </div>

        <ExpandableNavItem
          icon={<Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />}
          label="Instagram"
          activePage={activePage}
          subItems={[
            { label: 'Meu Perfil', page: 'instagram-perfil' },
            { label: 'Radar', page: 'instagram-radar' },
            { label: 'Estúdio', page: 'instagram-estudio' },
          ]}
          onSelect={(p) => { setActivePage(p); if (isMobile) setSidebarOpen(false); }}
        />
        <ExpandableNavItem
          icon={<Youtube className="w-[18px] h-[18px]" strokeWidth={1.5} />}
          label="YouTube"
          activePage={activePage}
          subItems={[
            { label: 'Meu Canal', page: 'youtube-canal' },
            { label: 'Radar', page: 'youtube-radar' },
            { label: 'Estúdio', page: 'youtube-estudio' },
          ]}
          onSelect={(p) => { setActivePage(p); if (isMobile) setSidebarOpen(false); }}
        />
        <ExpandableNavItem
          icon={<Bot className="w-[18px] h-[18px]" strokeWidth={1.5} />}
          label="Agentes"
          activePage={activePage}
          subItems={[
            { label: 'GABBY Diretora Criativa', page: 'gemz-diretora' },
            { label: 'GABBY Copywriter', page: 'gemz-copy' },
            { label: 'GABBY Sombra', page: 'gemz-sombra' },
          ]}
          onSelect={(p) => { setActivePage(p); if (isMobile) setSidebarOpen(false); }}
        />
        <NavItem
          icon={<FlaskConical className="w-[18px] h-[18px]" strokeWidth={1.5} />}
          label="Pesquisa de Mercado"
          active={activePage === 'market-research'}
          onClick={() => { setActivePage('market-research'); if (isMobile) setSidebarOpen(false); }}
        />
        <NavItem
          icon={<Newspaper className="w-[18px] h-[18px]" strokeWidth={1.5} />}
          label="News Feed"
          active={activePage === 'news-feed'}
          onClick={() => { setActivePage('news-feed'); if (isMobile) setSidebarOpen(false); }}
        />
      </div>

      {/* Conversas - histórico */}
      <div className="mt-4 px-2">
        <span className="px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Conversas
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 mt-2 space-y-0.5">
        {recentConversations.length === 0 ? (
          <p className="px-3 py-2 text-xs text-muted-foreground/70">Nenhuma conversa ainda</p>
        ) : (
          recentConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => { setActiveConversation(conv.id); if (isMobile) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                activeConversationId === conv.id ? 'bg-secondary' : 'hover:bg-secondary'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground truncate">{conv.title}</span>
            </button>
          ))
        )}
      </div>

      {/* Footer - avatar + name + theme toggle */}
      <div className="p-2 border-t border-border">
        <div className="w-full flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground text-sm font-semibold">U</span>
          </div>
          <div className="min-w-0 text-left flex-1">
            <p className="text-sm font-medium text-foreground truncate">Usuário</p>
            <p className="text-xs text-muted-foreground">Pro</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 max-w-[300px]">
            {sidebarContent}
          </div>
        </>
      ) : (
        sidebarContent
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AppsModal open={appsOpen} onClose={() => setAppsOpen(false)} />
      <DocumentsModal open={docsOpen} onClose={() => setDocsOpen(false)} />
    </>
  );
}

function NavItem({ icon, label, onClick, active }: { icon: React.ReactNode; label: string; onClick?: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active ? 'bg-secondary' : 'hover:bg-secondary'
      }`}
      aria-label={label}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-sm text-foreground">{label}</span>
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-secondary transition-colors shrink-0"
      aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-muted-foreground" />
      ) : (
        <Moon className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}

function GemzIcon() {
  const { theme } = useTheme();
  return (
    <img
      src={gemzIcon}
      alt="GEMZ AI"
      className="w-[18px] h-[18px] object-contain"
      style={{ filter: theme === 'dark' ? 'invert(1) brightness(1.1)' : 'none' }}
    />
  );
}

function GemzBrandLogo() {
  const { theme } = useTheme();
  return (
    <img
      src={theme === 'dark' ? gemzWordmarkDark : gemzWordmarkLight}
      alt="GEMZ"
      className="w-auto object-contain"
      style={{ height: '26px' }}
    />
  );
}

function ExpandableNavItem({
  icon,
  label,
  subItems,
  activePage,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  subItems: { label: string; page: ActivePage }[];
  activePage: ActivePage;
  onSelect: (page: ActivePage) => void;
}) {
  const containsActive = subItems.some((s) => s.page === activePage);
  const [open, setOpen] = useState(containsActive);
  const expanded = open || containsActive;

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          containsActive ? 'bg-secondary' : 'hover:bg-secondary'
        }`}
        aria-label={label}
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-sm text-foreground flex-1 text-left">{label}</span>
        <ChevronRight
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
      </button>
      {expanded && (
        <div className="ml-7 mt-0.5 space-y-0.5 border-l border-border pl-2">
          {subItems.map((s) => (
            <button
              key={s.page}
              onClick={() => onSelect(s.page)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                activePage === s.page
                  ? 'bg-secondary text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
