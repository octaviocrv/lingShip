import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CalendarDays, Clock, MessagesSquare, Presentation } from "lucide-react";

export const hero = {
  eyebrow: "Plataforma de aprendizagem de inglês em comunidade",
  title: ["Se comunique bem,", "em comunidade."],
  // O trecho em `strong` aparece em negrito, como no protótipo.
  lead: {
    before: "A Lingship é um espaço para ",
    strong: "discutir linguagem por meio do inglês",
    after: ": entender contexto, reconhecer variações e se comunicar com segurança. Muito além de uma aula.",
  },
  primaryCta: { label: "Acessar materiais gratuitos", href: "#materiais" },
  secondaryCta: { label: "Ver o método", href: "#metodo" },
  highlights: [
    { icon: Clock, label: "Estudo no seu ritmo" },
    { icon: MessagesSquare, label: "Vídeos em bate-papo" },
    { icon: Presentation, label: "Palco dos estudantes" },
  ] satisfies { icon: LucideIcon; label: string }[],
  photo: {
    src: "/fotos/vanessa-hero-cafe.jpg",
    alt: "Vanessa Mendes, criadora da Lingship, sorrindo com uma xícara de café e o caderno de plano de aula aberto na mesa",
  },
};

/**
 * Cards flutuantes em volta da foto (layout inspirado no modelo de referência).
 * Substituem o antigo card "Acontecendo agora" e puxam o método, sem números inventados.
 */
export const heroFloating = {
  method: { icon: CalendarDays, title: "5 passos", label: "Do estudo à conversa" },
  stage: {
    icon: Presentation,
    title: "Marina subiu no palco",
    label: "Apresentou sobre carreira em tecnologia",
    check: BadgeCheck,
  },
  live: {
    eyebrow: "Acontecendo agora",
    title: "Aula ao vivo comigo",
    label: "Tema do mês: reuniões de trabalho",
    cta: { label: "Quero participar", href: "#planos" },
  },
  bubble: { icon: MessagesSquare, label: "Chat de discussão" },
};
