import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { KanbanCard } from './types';

interface Message {
  id: string;
  role: 'agent' | 'user';
  content: string;
  angles?: { id: number; title: string; description: string }[];
}

const SAMPLE_ANGLES = [
  { id: 1, title: 'O contraintuitivo', description: 'Comece negando o senso comum: "A maioria faz X, mas isso te impede de…". Cria curiosity gap imediato.' },
  { id: 2, title: 'História de fracasso', description: 'Abra com um erro real seu, mostre o aprendizado e termine com a virada. Funciona muito em Reels narrados.' },
  { id: 3, title: 'Desconstrução em 3 passos', description: 'Pegue um conceito complexo do nicho e quebre em 3 movimentos visuais simples. Ideal para carrossel.' },
  { id: 4, title: 'Bastidor revelador', description: 'Mostre o "como" por trás de um resultado público. Posiciona autoridade sem precisar afirmar autoridade.' },
  { id: 5, title: 'Comparação direta', description: 'A vs B lado a lado. Crie uma tensão visual entre duas formas de fazer a mesma coisa.' },
];

interface Props {
  card: KanbanCard;
  onBack: () => void;
  onSaveAngle: (angleTitle: string) => void;
}

export function GabbyDirectorView({ card, onBack, onSaveAngle }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: `Olá! Vou te ajudar a transformar "${card.title}" em algo que realmente engaje. Selecionei 5 ângulos baseados no seu posicionamento e nas tendências do seu nicho. Clique no que mais te chamar atenção — ou peça refinamentos.`,
      angles: SAMPLE_ANGLES,
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null);
  const [refinements, setRefinements] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || refinements >= 10) return;
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: 'user', content: text },
      { id: crypto.randomUUID(), role: 'agent', content: 'Refinei os ângulos com base no seu pedido. Dá uma olhada e me diga o que prefere.' },
    ]);
    setRefinements((r) => r + 1);
    setInput('');
  };

  const quickActions = [
    { emoji: '🔥', label: 'Mais provocativo', msg: 'Quero versões mais provocativas e polêmicas desses ângulos.' },
    { emoji: '🌱', label: 'Para iniciantes', msg: 'Adapte os ângulos para um público iniciante no tema.' },
    { emoji: '📖', label: 'História pessoal', msg: 'Reescreva todos como histórias pessoais minhas.' },
    { emoji: '🔄', label: 'Regenerar tudo', msg: 'Regenere todos os ângulos com uma abordagem totalmente nova.' },
  ];

  const selectedAngleObj = SAMPLE_ANGLES.find((a) => a.id === selectedAngle);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center gap-3 px-4 shrink-0">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-secondary text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Estúdio
        </button>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'hsl(270 60% 50%)' }}>G</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground leading-tight">GABBY Diretora Criativa</p>
          <p className="text-[11px] text-muted-foreground leading-tight">Claude Sonnet 4.6</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] bg-secondary border border-border text-muted-foreground max-w-[200px] truncate">{card.title}</span>
        <span className="text-[11px] text-muted-foreground">Refinamentos: {refinements}/10</span>
        <button
          onClick={() => selectedAngleObj && onSaveAngle(selectedAngleObj.title)}
          disabled={!selectedAngle}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={selectedAngle ? { backgroundColor: '#eff5ce', color: '#2d3a0f', borderColor: '#c9d4a0' } : { backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--muted-foreground))' }}
        >
          Salvar Ângulo Escolhido
        </button>
      </div>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: m.role === 'agent' ? 'hsl(270 60% 50%)' : 'hsl(270 60% 35%)' }}
              >
                {m.role === 'agent' ? 'G' : 'S'}
              </div>
              <div className={`max-w-[80%] space-y-3 ${m.role === 'user' ? 'items-end' : ''}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-secondary text-foreground' : 'bg-card border border-border text-foreground'}`}>
                  {m.content}
                </div>
                {m.angles && (
                  <div className="space-y-2">
                    {m.angles.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAngle(a.id)}
                        className="w-full text-left p-3 rounded-lg bg-card border-2 transition-colors"
                        style={{ borderColor: selectedAngle === a.id ? '#5a6b2a' : 'hsl(var(--border))' }}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                            style={selectedAngle === a.id ? { backgroundColor: '#5a6b2a', color: 'white' } : { backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--foreground))' }}
                          >
                            {a.id}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground">{a.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions + input */}
      <div className="border-t border-border bg-background shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => send(a.msg)}
                className="px-2.5 py-1.5 rounded-lg text-xs bg-secondary hover:bg-accent text-foreground border border-border transition-colors"
              >
                {a.emoji} {a.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Peça um refinamento…"
              rows={1}
              className="flex-1 resize-none px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="p-2 rounded-lg disabled:opacity-50 transition-colors"
              style={{ backgroundColor: 'hsl(270 60% 50%)', color: 'white' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
