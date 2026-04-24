import { GemzChatView } from '@/components/gemz/GemzChatView';

export default function GabbyDiretoraPage() {
  return (
    <GemzChatView
      agentName="GABBY Diretora Criativa"
      agentInitial="G"
      agentColor="#7c3aed"
      model="Claude Sonnet 4.6"
      greeting={`Oi! Eu sou a GABBY, sua Diretora Criativa.

Meu trabalho aqui é te ajudar a transformar ideias soltas em ângulos de conteúdo poderosos. Trabalho melhor quando você me traz: um tema, um contexto e o que você quer que a audiência sinta.

Me conta: o que está na sua cabeça hoje?`}
    />
  );
}
