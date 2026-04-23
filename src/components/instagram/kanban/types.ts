export type KanbanColumn = 'ideias' | 'producao' | 'roteiro' | 'gravacao' | 'edicao' | 'publicado';

export type EditorialTag = 'infotenimento' | 'utilidade' | 'bastidores' | 'visao';

export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  column: KanbanColumn;
  tag?: EditorialTag;
  isAI?: boolean;
  date: string;
  angle?: string; // ângulo escolhido após GABBY
  script?: string; // roteiro após Copywriter
}

export const COLUMN_META: Record<KanbanColumn, { title: string; placeholder: string }> = {
  ideias: { title: 'Ideias', placeholder: 'Solte ideias aqui' },
  producao: { title: 'Em Produção', placeholder: 'Ângulo aprovado → aparece aqui' },
  roteiro: { title: 'Roteiro Pronto', placeholder: 'Roteiros aprovados aparecem aqui' },
  gravacao: { title: 'Gravação', placeholder: 'Em gravação' },
  edicao: { title: 'Edição', placeholder: 'Em edição' },
  publicado: { title: 'Publicado', placeholder: 'Publicados' },
};

export const TAG_META: Record<EditorialTag, { label: string; bg: string; color: string }> = {
  infotenimento: { label: 'infotenimento', bg: 'hsl(270 60% 92%)', color: 'hsl(270 60% 30%)' },
  utilidade: { label: 'utilidade', bg: 'hsl(214 80% 92%)', color: 'hsl(214 80% 30%)' },
  bastidores: { label: 'bastidores', bg: 'hsl(38 80% 90%)', color: 'hsl(28 70% 30%)' },
  visao: { label: 'visão', bg: '#eff5ce', color: '#2d3a0f' },
};
