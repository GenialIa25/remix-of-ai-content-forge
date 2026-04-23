import { AlertTriangle } from 'lucide-react';

interface Props {
  cardTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ cardTitle, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[14px] bg-card border border-border shadow-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Excluir card?</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          O card "<strong className="text-foreground">{cardTitle}</strong>" será removido permanentemente.
        </p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary hover:bg-accent text-foreground border border-border transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-sm font-medium bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-colors">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
