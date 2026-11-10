/**
 * Materiais gratuitos (vídeos curtos em formato de bate-papo).
 *
 * Os vídeos ainda não foram inseridos: cada card mostra só o espaço reservado.
 * Para inserir depois, preencher `video` (arquivo em public/videos ou URL externa)
 * e, se houver, `poster` (miniatura em public/fotos/materiais).
 */

export type Material = {
  id: string;
  category: string;
  title: string;
  duration: string;
  video: string | null;
  poster: string | null;
};

export const materiaisSection = {
  eyebrow: "Materiais gratuitos",
  title: "Comece a se comunicar antes mesmo de entrar na turma.",
  description:
    "Vídeos curtos em formato de bate-papo, para você sentir como a Lingship pensa a linguagem. É o nosso convite.",
  newsletter: {
    text: "Novos materiais entram toda semana. Quer receber os próximos primeiro?",
    cta: "Quero receber os próximos",
  },
};

export const materiais: Material[] = [
  {
    id: "contexto",
    category: "Contexto",
    title: "A mesma frase, sentidos diferentes",
    duration: "07:12",
    video: null,
    poster: null,
  },
  {
    id: "bate-papo",
    category: "Bate-papo",
    title: "Como soar natural em uma conversa curta",
    duration: "05:48",
    video: null,
    poster: null,
  },
  {
    id: "trabalho",
    category: "Trabalho",
    title: "Responder na hora, sem traduzir na cabeça",
    duration: "09:05",
    video: null,
    poster: null,
  },
  {
    id: "variacao",
    category: "Variação",
    title: "Formal e informal: a mesma ideia, dois tons",
    duration: "06:30",
    video: null,
    poster: null,
  },
];
