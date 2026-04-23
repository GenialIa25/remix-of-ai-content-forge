import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { KanbanCard } from './types';

interface Message {
  id: string;
  role: 'agent' | 'user';
  content: string;
  isScript?: boolean;
}

const SAMPLE_SCRIPT = `**🎯 Gancho (0–3s)**
"A maioria está fazendo isso completamente errado — e isso está custando alcance todo dia."

**📖 Desenvolvimento (3–35s)**
1. Mostre o erro comum (b-roll do feed genérico).
2. Explique por que o algoritmo penaliza.
3. Apresente sua versão correta com 1 exemplo concreto.
4. Quebre em 3 passos visuais simples.

**🚀 CTA (35–45s)**
"Salva esse Reel e me marca quando aplicar — quero ver o resultado. E se quiser o framework completo, comenta GANCHO que te mando."`;

interface Props {
  card: KanbanCard;
  onBack: () => void;
  onSaveScript: () => void;
}

export function CopywriterView({ card, onBack, onSaveScript }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: `Pronto! Escrevi o roteiro inicial para "${card.angle || card.title}". Deu pra ler em ~45s, formato Reel. Se quiser ajustar tom, comprimento ou estrutura, é só pedir.`,
    },
    { id: '2', role: 'agent', content: SAMPLE_SCRIPT, isScript: true },
  ]);
  const [input, setInput] = useState('');
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
      { id: crypto.randomUUID(), role: 'agent', content: 'Reescrevi o roteiro com base no seu pedido. Veja se está mais alinhado:', },
      { id: crypto.randomUUID(), role: 'agent', content: SAMPLE_SCRIPT, isScript: true },
    ]);
    setRefinements((r) => r + 1);
    setInput('');
  };

  const quickActions = [
    { emoji: '⚡', label: 'Gancho mais forte', msg: 'Reescreva o gancho com mais impacto e tensão.' },
    { emoji: '✂️', label: 'Mais curto', msg: 'Encolha o roteiro para 30 segundos.' },
    { emoji: '💬', label: 'Mais direto', msg: 'Tire qualquer rodeio e deixe mais direto e seco.' },
    { emoji: '🔄', label: 'Reescrever tudo', msg: 'Reescreva o roteiro inteiro do zero com outra abordagem.' },
  ];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <div className="h-14 border-b border-border flex items-center gap-3 px-4 shrink-0">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-secondary text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Estúdio
        </button>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'hsl(214 80% 50%)' }}>C</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground leading-tight">GABBY Copywriter</p>
          <p className="text-[11px] text-muted-foreground leading-tight">Claude Sonnet 4.6</p>
        </div>
        {card.angle && <span className="px-2.5 py-1 rounded-full text-[11px] bg-secondary border border-border text-muted-foreground max-w-[200px] truncate">✦ {card.angle}</span>}
        <span className="text-[11px] text-muted-foreground">Refinamentos: {refinements}/10</span>
        <button
          onClick={onSaveScript}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
          style={{ backgroundColor: '#eff5ce', color: '#2d3a0f', borderColor: '#c9d4a0' }}
        >
          Salvar Roteiro
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: m.role === 'agent' ? 'hsl(214 80% 50%)' : 'hsl(214 80% 35%)' }}>
                {m.role === 'agent' ? 'C' : 'S'}
              </div>
              <div className={`max-w-[80%] ${m.role === 'user' ? 'items-end' : ''}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    m.isScript
                      ? 'bg-secondary border border-border text-foreground font-mono text-[13px]'
                      : m.role === 'user'
                      ? 'bg-secondary text-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {m.content.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-foreground">{part}</strong> : <span key={i}>{part}</span>))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-background shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickActions.map((a) => (
              <button key={a.label} onClick={() => send(a.msg)} className="px-2.5 py-1.5 rounded-lg text-xs bg-secondary hover:bg-accent text-foreground border border-border transition-colors">
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
            <button onClick={() => send(input)} disabled={!input.trim()} className="p-2 rounded-lg disabled:opacity-50 transition-colors" style={{ backgroundColor: 'hsl(214 80% 50%)', color: 'white' }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
