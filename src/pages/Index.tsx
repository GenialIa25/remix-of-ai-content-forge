import Sidebar from '@/components/layout/Sidebar';
import ChatArea from '@/components/chat/ChatArea';
import MarketResearchPage from '@/pages/MarketResearchPage';
import HomePage from '@/pages/HomePage';
import CreatorKitPage from '@/pages/CreatorKitPage';
import ImplementationPage from '@/pages/ImplementationPage';
import AulasPage from '@/pages/AulasPage';
import MetricsDashboard from '@/pages/MetricsDashboard';
import CalendarPage from '@/pages/CalendarPage';
import NewsFeedPage from '@/pages/NewsFeedPage';
import VisaoGeralPage from '@/pages/VisaoGeralPage';
import InstagramPerfilPage from '@/pages/instagram/InstagramPerfilPage';
import InstagramRadarPage from '@/pages/instagram/InstagramRadarPage';
import InstagramEstudioPage from '@/pages/instagram/InstagramEstudioPage';
import YoutubeCanalPage from '@/pages/youtube/YoutubeCanalPage';
import YoutubeRadarPage from '@/pages/youtube/YoutubeRadarPage';
import YoutubeEstudioPage from '@/pages/youtube/YoutubeEstudioPage';
import GabbyDiretoraPage from '@/pages/gemz/GabbyDiretoraPage';
import GabbyCopyPage from '@/pages/gemz/GabbyCopyPage';
import GabbySombraPage from '@/pages/gemz/GabbySombraPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import { useChatStore } from '@/stores/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

export default function Index() {
  const { sidebarOpen, setSidebarOpen, activePage, setActivePage } = useChatStore();
  const isMobile = useIsMobile();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'market-research':
        return <MarketResearchPage onBack={() => setActivePage('home')} />;
      case 'creator-kit':
        return <CreatorKitPage />;
      case 'implementation':
        return <ImplementationPage />;
      case 'aulas':
        return <AulasPage />;
      case 'metrics':
        return <MetricsDashboard />;
      case 'calendario':
        return <CalendarPage />;
      case 'news-feed':
        return <NewsFeedPage />;
      case 'visao-geral':
        return <VisaoGeralPage />;
      case 'instagram-perfil':
        return <InstagramPerfilPage />;
      case 'instagram-radar':
        return <InstagramRadarPage />;
      case 'instagram-estudio':
        return <InstagramEstudioPage />;
      case 'youtube-canal':
        return <YoutubeCanalPage />;
      case 'youtube-radar':
        return <YoutubeRadarPage />;
      case 'youtube-estudio':
        return <YoutubeEstudioPage />;
      case 'gemz-diretora':
        return <GabbyDiretoraPage />;
      case 'gemz-copy':
        return <GabbyCopyPage />;
      case 'gemz-sombra':
        return <GabbySombraPage />;
      default:
        return <ChatArea />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-3 left-3 z-30 p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      )}
      <Sidebar />
      {renderPage()}
    </div>
  );
}
