import { GripVertical, Trash2, Sparkles, FileText } from 'lucide-react';
import { KanbanCard, TAG_META } from './types';

interface Props {
  card: KanbanCard;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onAction: (e: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent) => void;
  showEditorialTag?: boolean;
}

export function KanbanCardItem({ card, onClick, onDelete, onAction, onDragStart, showEditorialTag = true }: Props) {
  const tagMeta = card.tag ? TAG_META[card.tag] : null;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="group relative rounded-[10px] bg-white dark:bg-card border border-border p-3 cursor-pointer hover:border-foreground/30 transition-colors"
    >
      {/* drag handle */}
      <button className="absolute top-2 left-2 p-0.5 opacity-0 group-hover:opacity-60 transition-opacity cursor-grab active:cursor-grabbing">
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      {/* delete */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-opacity"
      >
        <Trash2 className="w-3.5 h-3.5 text-destructive" />
      </button>

      <div className="pl-4 pr-5">
        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          {card.isAI && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'hsl(270 60% 92%)', color: 'hsl(270 60% 30%)' }}>
              AI
            </span>
          )}
          {showEditorialTag && tagMeta && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" style={{ backgroundColor: tagMeta.bg, color: tagMeta.color }}>
              {tagMeta.label}
            </span>
          )}
          {card.angle && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" style={{ backgroundColor: '#eff5ce', color: '#2d3a0f' }}>
              ✦ {card.angle}
            </span>
          )}
        </div>

        <p className="text-sm font-bold text-foreground leading-tight mb-1.5">{card.title}</p>
        <p className="text-xs text-muted-foreground leading-snug line-clamp-3 mb-2">{card.description}</p>
        <p className="text-[10px] text-muted-foreground mb-2">{card.date}</p>

        {card.column === 'ideias' && (
          <button
            onClick={onAction}
            className="w-full inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-semibold transition-colors"
            style={{ backgroundColor: 'hsl(270 60% 92%)', color: 'hsl(270 60% 30%)' }}
          >
            <Sparkles className="w-3 h-3" /> Gerar Ângulos
          </button>
        )}
        {card.column === 'producao' && (
          <button
            onClick={onAction}
            className="w-full inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-semibold transition-colors"
            style={{ backgroundColor: '#eff5ce', color: '#2d3a0f' }}
          >
            <FileText className="w-3 h-3" /> Escrever Roteiro
          </button>
        )}
      </div>
    </div>
  );
}
