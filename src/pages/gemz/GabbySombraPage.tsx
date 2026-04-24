import { GemzChatView } from '@/components/gemz/GemzChatView';

export default function GabbySombraPage() {
  return (
    <GemzChatView
      agentName="GABBY Sombra"
      agentInitial="S"
      agentColor="#1f2937"
      model="Claude Sonnet 4.6"
      greeting={`Eu sou a GABBY Sombra — sua revisora silenciosa.

Cole qualquer roteiro, copy, e-mail ou descrição e eu aponto o que está fraco, o que pode ser cortado, onde o ritmo trava e como deixar tudo mais nítido. Sem suavizar, sem rodeios.

O que você quer que eu olhe primeiro?`}
    />
  );
}
