import type { LucideIcon } from "lucide-react";
import { Award, Baby, Brain, GraduationCap } from "lucide-react";

/**
 * Parágrafos da seção "Minha filosofia sobre educação".
 * Cada parágrafo é uma lista de trechos; os trechos com `strong: true` saem em negrito.
 */
type Trecho = { text: string; strong?: boolean };

export const filosofiaSection = {
  eyebrow: "Minha filosofia sobre educação",
  title: "Tudo se cria por meio da palavra.",
  paragraphs: [
    [
      {
        text: "Eu acredito numa educação atrelada à realidade e ao dia a dia de cada estudante, porque aprender uma língua é ganhar repertório para existir no mundo com mais alcance, presença e liberdade. Não se trata de acumular conteúdo, e sim de se comunicar com verdade e propriedade.",
      },
    ],
    [
      {
        text: "Por isso o ensino que eu pratico exercita a língua em uso, em diferentes contextos e diferentes linguagens: interpretar o que está sendo dito, dizer a mesma ideia de formas diferentes, discutir, defender um ponto de vista e convencer alguém. O foco é a palavra viva, não a memorização de regras.",
      },
    ],
    [
      {
        text: "Foi assim que o meu método nasceu: da escuta atenta do que cada estudante já sabe e do que ainda quer desenvolver. Eu não entrego respostas prontas. Eu construo ",
      },
      { text: "confiança e autoestima no processo", strong: true },
      {
        text: ", acompanhando de perto para que o inglês passe a ser vivido, e não apenas estudado. A Lingship é o meu jeito de documentar esse olhar e colocá-lo nas mãos de mais pessoas.",
      },
    ],
    [
      {
        text: "A boa comunicação abre portas. É ela que conduz a lugares de mérito: a conversa que conquista, a ideia que convence, a presença que atravessa fronteiras. Ensinar isso, com cuidado e com método, é o que dá sentido ao meu trabalho.",
      },
    ],
  ] satisfies Trecho[][],
  curriculumCta: "Ver currículo completo",
  plansCta: { label: "Ver planos", href: "#planos" },
  photo: {
    src: "/fotos/lendo-o-livro.jpg",
    alt: "Vanessa Mendes lendo um livro num sofá, ao lado de uma estante cheia de livros e plantas",
  },
};

export type Formacao = {
  icon: LucideIcon;
  title: string;
  items: { name: string; detail?: string }[];
  featured?: boolean;
};

export const baseTitle = "A base que sustenta esse olhar";

export const formacao: Formacao[] = [
  {
    icon: GraduationCap,
    title: "Educação e linguagem",
    items: [
      { name: "Pedagogia", detail: "Anhembi Morumbi" },
      { name: "Complementação em Letras", detail: "IBRA" },
    ],
  },
  {
    icon: Brain,
    title: "Pós-graduações",
    items: [
      { name: "Psicopedagogia Institucional" },
      { name: "Orientação Educacional" },
      { name: "Psicomotricidade" },
      { name: "Educação Inclusiva" },
    ],
  },
  {
    icon: Baby,
    title: "Formação bilíngue",
    items: [
      { name: "Educação Infantil e Alfabetização" },
      { name: "Formação Bilíngue" },
      { name: "Filosofia Reggio Emilia" },
    ],
  },
  {
    icon: Award,
    title: "Especializações em Harvard",
    featured: true,
    items: [
      { name: "Function and Structure of Argumentation" },
      { name: "Leader of Learning Essentials" },
      { name: "Child Protection: Children's Rights in Theory and Practice" },
    ],
  },
];
