import { useState, useRef, useEffect } from 'react';
import { Plus, Send } from 'lucide-react';
import gemzIcon from '@/assets/gemz-ai-icon.png';
import { useTheme } from '@/hooks/useTheme';

interface Message {
  id: string;
  role: 'agent' | 'user';
  content: string;
}

interface Props {
  agentName: string;
  agentInitial: string;
  agentColor: string;
  model: string;
  greeting: string;
}

export function GemzChatView({ agentName, agentInitial, agentColor, model, greeting }: Props) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'agent', content: greeting },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    const reply: Message = {
      id: crypto.randomUUID(),
      role: 'agent',
      content: 'Ótimo! Em breve vou processar isso usando o modelo conectado. Por enquanto este é um placeholder do fluxo de conversa.',
    };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const newConversation = () => {
    setMessages([{ id: '1', role: 'agent', content: greeting }]);
    setInput('');
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <img src={gemzIcon} alt="GEMZ AI" className="w-7 h-7 object-contain shrink-0" style={{ filter: theme === 'dark' ? 'invert(1) brightness(1.1)' : 'none' }} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{agentName}</p>
            <p className="text-xs text-muted-foreground truncate">{model} · Pronto para conversar</p>
          </div>
        </div>
        <button
          onClick={newConversation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-accent text-foreground border border-border transition-colors shrink-0"
        >
          <Plus className="w-3 h-3" /> Nova conversa
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: m.role === 'user' ? '#7c3aed' : agentColor }}
              >
                {m.role === 'user' ? 'S' : agentInitial}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-secondary text-foreground rounded-tr-sm'
                  : 'bg-card border border-border text-foreground rounded-tl-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 sm:px-6 py-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 rounded-2xl bg-secondary border border-border focus-within:border-foreground/30 transition-colors p-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={onInput}
              onKeyDown={onKey}
              rows={1}
              placeholder={`Pergunte para ${agentName.split(' ')[0]}...`}
              className="flex-1 bg-transparent resize-none px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none max-h-[180px]"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="p-2 rounded-xl text-white transition-opacity disabled:opacity-30 shrink-0"
              style={{ backgroundColor: '#7c3aed' }}
              aria-label="Enviar"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Enter envia · Shift+Enter quebra linha</p>
        </div>
      </div>
    </div>
  );
}
