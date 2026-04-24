import { useState } from 'react';
import { Plus } from 'lucide-react';
import { KanbanCard, KanbanColumn, COLUMN_META } from '@/components/instagram/kanban/types';
import { KanbanCardItem } from '@/components/instagram/kanban/KanbanCardItem';
import { PeekModal } from '@/components/instagram/kanban/PeekModal';
import { DeleteConfirmModal } from '@/components/instagram/kanban/DeleteConfirmModal';
import { GabbyDirectorView } from '@/components/instagram/kanban/GabbyDirectorView';
import { CopywriterView } from '@/components/instagram/kanban/CopywriterView';

const SEED_CARDS: KanbanCard[] = [
  { id: '1', title: 'Como construí um canal de 100K em 12 meses', description: 'Vídeo de retrospectiva com números abertos, decisões certas e erros caros.', column: 'ideias', isAI: true, date: '12 abr' },
  { id: '2', title: 'Stack completa de ferramentas em 2026', description: 'Tudo o que uso para gravar, editar, automatizar e analisar dados do canal.', column: 'ideias', date: '13 abr' },
  { id: '3', title: 'Análise: por que esse Short bombou', description: 'Quebrar segundo a segundo o que fez o Short de 0:42 ter 628K views.', column: 'ideias', isAI: true, date: '14 abr' },
  { id: '4', title: 'Storytelling para criadores: framework', description: 'Roteiro pronto.', column: 'roteiro', date: '10 abr', script: 'roteiro pronto' },
  { id: '5', title: 'Setup de gravação minimalista', description: 'Em gravação no estúdio principal.', column: 'gravacao', date: '08 abr' },
  { id: '6', title: 'Lições caras vendendo cursos', description: 'Em edição com cortes finais.', column: 'edicao', date: '05 abr' },
  { id: '7', title: 'Como construí 100K em 12 meses', description: 'Publicado e bombou.', column: 'publicado', date: '02 abr' },
];

export default function YoutubeEstudioPage() {
  const [cards, setCards] = useState<KanbanCard[]>(SEED_CARDS);
  const [peekCard, setPeekCard] = useState<KanbanCard | null>(null);
  const [deleteCard, setDeleteCard] = useState<KanbanCard | null>(null);
  const [activeAgent, setActiveAgent] = useState<{ card: KanbanCard; type: 'gabby' | 'copy' } | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const columns: KanbanColumn[] = ['ideias', 'producao', 'roteiro', 'gravacao', 'edicao', 'publicado'];

  const handleDragStart = (id: string) => (e: React.DragEvent) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (col: KanbanColumn) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedId) return;
    setCards((prev) => prev.map((c) => (c.id === draggedId ? { ...c, column: col } : c)));
    setDraggedId(null);
  };

  const moveAndOpenAgent = (card: KanbanCard, type: 'gabby' | 'copy') => {
    if (type === 'gabby') {
      const updated = { ...card, column: 'producao' as KanbanColumn };
      setCards((prev) => prev.map((c) => (c.id === card.id ? updated : c)));
      setActiveAgent({ card: updated, type });
    } else {
      setActiveAgent({ card, type });
    }
  };

  const handleCardAction = (card: KanbanCard) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.column === 'ideias') moveAndOpenAgent(card, 'gabby');
    else if (card.column === 'producao') moveAndOpenAgent(card, 'copy');
  };

  const handlePeekAction = () => {
    if (!peekCard) return;
    if (peekCard.column === 'ideias') { moveAndOpenAgent(peekCard, 'gabby'); setPeekCard(null); }
    else if (peekCard.column === 'producao') { moveAndOpenAgent(peekCard, 'copy'); setPeekCard(null); }
    else { setPeekCard(null); }
  };

  const handleSaveAngle = (angleTitle: string) => {
    if (!activeAgent) return;
    setCards((prev) => prev.map((c) => (c.id === activeAgent.card.id ? { ...c, angle: angleTitle } : c)));
    setActiveAgent(null);
  };

  const handleSaveScript = () => {
    if (!activeAgent) return;
    setCards((prev) => prev.map((c) => (c.id === activeAgent.card.id ? { ...c, column: 'roteiro' as KanbanColumn, script: 'pronto' } : c)));
    setActiveAgent(null);
  };

  const handleDelete = () => {
    if (!deleteCard) return;
    setCards((prev) => prev.filter((c) => c.id !== deleteCard.id));
    setDeleteCard(null);
  };

  const addNewIdea = () => {
    const newCard: KanbanCard = {
      id: crypto.randomUUID(),
      title: 'Nova ideia',
      description: 'Clique para editar e desenvolver esta ideia.',
      column: 'ideias',
      isAI: false,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    };
    setCards((prev) => [newCard, ...prev]);
  };

  return (
    <div className="flex-1 overflow-hidden bg-background flex flex-col">
      <div className="px-6 py-6 shrink-0">
        <h1 className="text-3xl font-semibold text-foreground mb-4" style={{ fontFamily: "'ITC Garamond Std Lt Cond', Garamond, serif", fontSize: '2.6rem' }}>
          Estúdio
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{cards.length} ideias no total</p>
          <button
            onClick={addNewIdea}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
            style={{ backgroundColor: '#eff5ce', color: '#2d3a0f', borderColor: '#c9d4a0' }}
          >
            <Plus className="w-3.5 h-3.5" /> Nova Ideia
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6">
        <div className="flex gap-3 h-full" style={{ minWidth: 'max-content' }}>
          {columns.map((col) => {
            const colCards = cards.filter((c) => c.column === col);
            return (
              <div
                key={col}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop(col)}
                className="w-[280px] shrink-0 rounded-[12px] bg-secondary/50 border border-border flex flex-col"
              >
                <div className="px-3 py-2.5 border-b border-border flex items-center justify-between shrink-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{COLUMN_META[col].title}</h3>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-background text-muted-foreground">{colCards.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {colCards.length === 0 ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-xs text-muted-foreground min-h-[80px] flex items-center justify-center">
                      {COLUMN_META[col].placeholder}
                    </div>
                  ) : (
                    colCards.map((card) => (
                      <KanbanCardItem
                        key={card.id}
                        card={card}
                        showEditorialTag={false}
                        onClick={() => setPeekCard(card)}
                        onDelete={(e) => { e.stopPropagation(); setDeleteCard(card); }}
                        onAction={handleCardAction(card)}
                        onDragStart={handleDragStart(card.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {peekCard && <PeekModal card={peekCard} onClose={() => setPeekCard(null)} onAction={handlePeekAction} />}
      {deleteCard && <DeleteConfirmModal cardTitle={deleteCard.title} onCancel={() => setDeleteCard(null)} onConfirm={handleDelete} />}
      {activeAgent?.type === 'gabby' && (
        <GabbyDirectorView card={activeAgent.card} onBack={() => setActiveAgent(null)} onSaveAngle={handleSaveAngle} />
      )}
      {activeAgent?.type === 'copy' && (
        <CopywriterView card={activeAgent.card} onBack={() => setActiveAgent(null)} onSaveScript={handleSaveScript} />
      )}
    </div>
  );
}
