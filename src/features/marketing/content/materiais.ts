/**
 * Materiais gratuitos: vídeos em inglês do YouTube, curados pela Lingship.
 *
 * Nada é baixado: o cartão mostra a miniatura do próprio YouTube e o vídeo abre num popup
 * com o player do YouTube (youtube-nocookie), com legenda em inglês ligada.
 * Para trocar ou incluir um vídeo, basta editar a lista abaixo: `youtubeId` é o código que
 * vem depois de "watch?v=" no link do vídeo.
 */

export type Material = {
  id: string;
  category: string;
  /** título original do vídeo, em inglês */
  title: string;
  /** resumo em português */
  summary: string;
  /** canal ou palestrante */
  source: string;
  duration: string;
  youtubeId: string;
};

export const materiaisSection = {
  eyebrow: "Materiais gratuitos",
  title: "Comece a se comunicar antes mesmo de entrar na turma.",
  description:
    "Vídeos em inglês, escolhidos a dedo, para você treinar o ouvido e sentir como a Lingship pensa a linguagem. É o nosso convite.",
  language: "Em inglês",
  watchOnYoutube: "Assistir no YouTube",
  newsletter: {
    text: "Novos materiais entram toda semana. Quer receber os próximos primeiro?",
    cta: "Quero receber os próximos",
  },
};

export const materiais: Material[] = [
  {
    id: "bate-papo",
    category: "Bate-papo",
    title: "10 Ways to Have a Better Conversation",
    summary:
      "Celeste Headlee explica como manter conversas melhores, ouvir com atenção e fazer perguntas interessantes. Ótimo para aprender comunicação além do vocabulário.",
    source: "TED",
    duration: "11:44",
    youtubeId: "R1vskiVDwl4",
  },
  {
    id: "trabalho",
    category: "Trabalho",
    title: "How to Find Work You Love",
    summary:
      "Scott Dinsmore fala sobre carreira, propósito e como descobrir o trabalho que realmente combina com você. Bom para desenvolver vocabulário profissional.",
    source: "Scott Dinsmore · TED",
    duration: "17:47",
    youtubeId: "bvAEJ8G9l9U",
  },
  {
    id: "variacao",
    category: "Variação",
    title: "How Languages Evolve",
    summary:
      "Explica como as línguas mudam ao longo do tempo, como surgem diferenças linguísticas e por que existem tantas línguas.",
    source: "TED-Ed",
    duration: "04:03",
    youtubeId: "iWDKsHm6gTA",
  },
];
