import { X, ExternalLink, CheckCircle } from 'lucide-react';

interface Integration {
  name: string;
  icon: React.ReactNode;
  description: string;
  connected: boolean;
}

function AppIcon({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <div className="w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: bg }}>
      {children}
    </div>
  );
}

const INTEGRATIONS: Integration[] = [
  {
    name: 'Google Drive',
    icon: <AppIcon bg="#4285F4"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8.5 2L1.5 14h7l7-12h-7z" fill="#0F9D58"/><path d="M15.5 2l-7 12h7l3.5-6L15.5 2z" fill="#FBBC05"/><path d="M1.5 14l3.5 6h14l3.5-6H1.5z" fill="#4285F4"/></svg></AppIcon>,
    description: 'Salve documentos no Google Drive',
    connected: false,
  },
  {
    name: 'Notion',
    icon: <AppIcon bg="hsl(var(--secondary))"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-foreground"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.29 2.35c-.42-.326-.98-.7-2.055-.607L3.34 2.96c-.467.047-.56.28-.374.466l1.493 1.782zm.793 3.36v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.635c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.886l-.7.14v10.264c-.607.327-1.166.514-1.633.514-.746 0-.933-.234-1.493-.933l-4.571-7.178v6.952l1.446.327s0 .84-1.166.84l-3.22.187c-.093-.187 0-.653.327-.747l.84-.233V9.854L7.87 9.76c-.094-.42.14-1.026.793-1.073l3.453-.234 4.759 7.272V9.527l-1.213-.14c-.094-.514.28-.886.746-.933l3.18-.14z"/></svg></AppIcon>,
    description: 'Exporte para páginas do Notion',
    connected: false,
  },
  {
    name: 'Zapier',
    icon: <AppIcon bg="#FF4A00"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-2.17 2.17 2.17 2.17-1.46 1.46-2.17-2.17-2.17 2.17-1.46-1.46 2.17-2.17-2.17-2.17 1.46-1.46 2.17 2.17 2.17-2.17 1.46 1.46z"/></svg></AppIcon>,
    description: 'Automatize workflows com Zapier',
    connected: false,
  },
  {
    name: 'n8n',
    icon: <AppIcon bg="#EA4B71"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><circle cx="8" cy="12" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><line x1="10.5" y1="11" x2="13.5" y2="9" stroke="white" strokeWidth="1.5"/><line x1="10.5" y1="13" x2="13.5" y2="15" stroke="white" strokeWidth="1.5"/></svg></AppIcon>,
    description: 'Conecte via webhooks n8n',
    connected: true,
  },
  {
    name: 'Calendário',
    icon: <AppIcon bg="hsl(var(--secondary))"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></AppIcon>,
    description: 'Sincronize calendários de conteúdo',
    connected: false,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AppsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed inset-4 md:inset-12 z-50 bg-background rounded-xl border border-border/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border/40 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Aplicativos</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Conecte ferramentas externas ao seu workspace</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors" aria-label="Fechar">
              <X className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[640px] mx-auto px-6 py-8">
            <div className="space-y-0">
              {INTEGRATIONS.map((app, i) => (
                <div key={app.name}>
                  <div className="flex items-center gap-4 py-5">
                    <div className="shrink-0">{app.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{app.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{app.description}</p>
                    </div>
                    <div className="shrink-0">
                      {app.connected ? (
                        <div className="flex items-center gap-1.5 text-primary text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Conectado</span>
                        </div>
                      ) : (
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/60 text-sm text-foreground hover:bg-secondary/30 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Conectar
                        </button>
                      )}
                    </div>
                  </div>
                  {i < INTEGRATIONS.length - 1 && <div className="border-t border-border/30" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
