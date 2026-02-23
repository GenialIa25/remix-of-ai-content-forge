import { Check, AlertCircle } from 'lucide-react';
import { AGENTS } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DocumentStatusBadgeProps {
  agentId: string;
  completedDocs: Record<string, boolean>;
}

const AGENT_DOC_LABELS: Record<string, string> = {
  'brand-book': 'Brand Book',
  'market-research': 'Pesquisa de Mercado',
  'icp-architect': 'Mapa do ICP',
  'pillar-strategist': 'Pilares de Conteúdo',
  'matrix-generator': 'Matriz de Conteúdo',
  'marketing-manager': 'Calendário Mensal',
  'scriptwriter': 'Roteiro de Vídeo',
};

export default function DocumentStatusBadge({ agentId, completedDocs }: DocumentStatusBadgeProps) {
  const agent = AGENTS.find((a) => a.id === agentId);
  if (!agent || agent.requires.length === 0) return null;

  const total = agent.requires.length;
  const done = agent.requires.filter((r) => completedDocs[r]).length;
  const allReady = done === total;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full cursor-default transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid transparent',
              boxShadow: allReady
                ? '0 0 0 2px rgba(16, 163, 127, 0.5), 0 16px 32px rgba(0, 0, 0, 0.12)'
                : '0 0 0 2px rgba(255, 255, 255, 0.6), 0 16px 32px rgba(0, 0, 0, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {allReady ? (
              <Check className="w-3.5 h-3.5 text-primary" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
            )}
            <span className={`text-xs font-medium ${allReady ? 'text-primary' : 'text-foreground'}`}>
              {allReady ? 'Pronto' : `${done}/${total} pendentes`}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="p-0 border-0 bg-transparent shadow-none rounded-2xl"
          sideOffset={8}
        >
          <div
            className="p-4 rounded-2xl max-w-[220px]"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid transparent',
              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5), 0 16px 32px rgba(0, 0, 0, 0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <p className="text-xs font-semibold text-foreground mb-2.5">
              Documentos necessários
            </p>
            <div className="space-y-1.5">
              {agent.requires.map((reqId) => {
                const isReady = completedDocs[reqId];
                return (
                  <div key={reqId} className="flex items-center gap-2">
                    {isReady ? (
                      <Check className="w-3 h-3 text-primary shrink-0" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-yellow-500 shrink-0" />
                    )}
                    <span className={`text-xs ${isReady ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
                      {AGENT_DOC_LABELS[reqId] || reqId}
                    </span>
                    {!isReady && (
                      <span className="text-[10px] text-yellow-500 ml-auto">Pendente</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
