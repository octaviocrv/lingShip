/**
 * Apresentações e depoimentos da comunidade.
 * Textos e nomes vieram do protótipo da Vanessa: confirmar com ela se são de estudantes
 * reais (e se têm autorização) antes de publicar.
 */

export const comunidadeSection = {
  eyebrow: "Comunidade viva",
  title: "Estudantes que se encontram para praticar a língua.",
  description:
    "A comunidade tem pontos de encontro aqui na plataforma para quem quiser subir e apresentar, e chats para discutir os materiais propostos. Uma vez por mês, todo mundo se reúne na aula ao vivo comigo: um encontro exclusivo, com um tema novo a cada mês. Deslize para ver algumas apresentações.",
  voicesTitle: "Vozes da comunidade",
  cta: {
    text: "Quer subir no palco também? A gente te ajuda a preparar a sua primeira apresentação na comunidade.",
    label: "Ver planos",
    href: "#planos",
  },
};

export type Pessoa = { initials: string; name: string; role: string; quote: string };

export const apresentacoes: Pessoa[] = [
  {
    initials: "MC",
    name: "Marina C.",
    role: "Apresentou sobre carreira em tecnologia",
    quote: "Montei a apresentação inteira em inglês e ensaiei com o grupo antes. Na hora, saiu.",
  },
  {
    initials: "RT",
    name: "Rafael T.",
    role: "Pitch de projeto para a comunidade",
    quote: "O melhor é apresentar para quem também está aprendendo. Ninguém julga, todo mundo ajuda.",
  },
  {
    initials: "CN",
    name: "Camila N.",
    role: "Roda de conversa sobre viagens",
    quote: "Trouxe minhas fotos da viagem e conduzi a conversa em inglês. Sem ensaio, sem tradução.",
  },
  {
    initials: "JB",
    name: "João B.",
    role: "Apresentou sobre música brasileira",
    quote: "Ganhei confiança falando em público treinando aqui dentro primeiro.",
  },
];

export const depoimentos: Pessoa[] = [
  {
    initials: "MC",
    name: "Marina C.",
    role: "Analista de marketing",
    quote:
      "Eu travava nas reuniões com clientes de fora. Depois de alguns meses praticando situações reais, hoje eu começo a conversa sem ensaiar na cabeça.",
  },
  {
    initials: "RT",
    name: "Rafael T.",
    role: "Desenvolvedor de software",
    quote:
      "O que mudou tudo foi parar de traduzir antes de falar. Os materiais treinam a resposta automática, e isso aparece na vida real.",
  },
  {
    initials: "CN",
    name: "Camila N.",
    role: "Estudante de intercâmbio",
    quote:
      "Resolvi tudo sozinha na viagem: aeroporto, hotel, restaurante. Era exatamente o que a gente tinha treinado em aula.",
  },
];
