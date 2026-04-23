import { X, Sparkles, FileText } from 'lucide-react';
import { KanbanCard, TAG_META } from './types';

interface Props {
  card: KanbanCard;
  onClose: () => void;
  onAction: () => void;
  showEditorialTag?: boolean;
}

export function PeekModal({ card, onClose, onAction, showEditorialTag = true }: Props) {
  const tagMeta = card.tag ? TAG_META[card.tag] : null;

  let actionLabel = 'Fechar';
  let actionIcon: React.ReactNode = null;
  let actionStyle: React.CSSProperties = {};
  if (card.column === 'ideias') {
    actionLabel = 'Gerar Ângulos';
    actionIcon = <Sparkles className="w-4 h-4" />;
    actionStyle = { backgroundColor: 'hsl(270 60% 92%)', color: 'hsl(270 60% 30%)' };
  } else if (card.column === 'producao') {
    actionLabel = 'Escrever Roteiro';
    actionIcon = <FileText className="w-4 h-4" />;
    actionStyle = { backgroundColor: '#eff5ce', color: '#2d3a0f' };
  } else {
    actionStyle = { backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--foreground))' };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-[14px] bg-card border border-border shadow-2xl p-6"
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-secondary">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          {card.isAI && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'hsl(270 60% 92%)', color: 'hsl(270 60% 30%)' }}>
              AI
            </span>
          )}
          {showEditorialTag && tagMeta && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: tagMeta.bg, color: tagMeta.color }}>
              {tagMeta.label}
            </span>
          )}
          {card.angle && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: '#eff5ce', color: '#2d3a0f' }}>
              ✦ {card.angle}
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">{card.title}</h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4 whitespace-pre-line">{card.description}</p>
        <p className="text-xs text-muted-foreground mb-6">{card.date}</p>

        <button
          onClick={onAction}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          style={actionStyle}
        >
          {actionIcon} {actionLabel}
        </button>
      </div>
    </div>
  );
}
