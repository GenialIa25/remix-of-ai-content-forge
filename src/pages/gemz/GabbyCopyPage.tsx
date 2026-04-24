import { GemzChatView } from '@/components/gemz/GemzChatView';

export default function GabbyCopyPage() {
  return (
    <GemzChatView
      agentName="GABBY Copywriter"
      agentInitial="C"
      agentColor="#2563eb"
      model="Claude Sonnet 4.6"
      greeting={`Olá! Sou a GABBY Copywriter.

Eu transformo ângulos em roteiros completos: gancho forte, desenvolvimento claro e CTA que converte. Funciono para Reels, Shorts, vídeos longos, carrosséis e legendas.

Cole aqui um ângulo, uma ideia ou um tema e vamos escrever juntos.`}
    />
  );
}
