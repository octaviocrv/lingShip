import type { LucideIcon } from "lucide-react";
import { Dumbbell, Mic, Search, TrendingUp, Users } from "lucide-react";

export const metodoSection = {
  eyebrow: "O método",
  title: "Como se aprende aqui.",
  description:
    "A plataforma é individual e em comunidade, comigo como facilitadora e guia do seu processo. Você estuda no seu ritmo, participa dos grupos de discussão quando quiser e conta com o meu apoio em cada etapa.",
  cta: { label: "Comece pelos materiais gratuitos", href: "#materiais" },
};

export const passos: {
  icon: LucideIcon;
  title: string;
  description: string;
  image: { src: string; alt: string; position: string };
}[] = [
  {
    icon: Search,
    title: "Buscar",
    description: "Você escolhe a habilidade que quer desenvolver e estuda pelos materiais e vídeos.",
    image: {
      src: "/images/site/metodo/passo-1.webp",
      alt: "Notebook aberto na plataforma da Lingship, ao lado de um caderno com metas de inglês",
      position: "50% 55%",
    },
  },
  {
    icon: Dumbbell,
    title: "Praticar",
    description: "No seu ritmo, com situações diretas da língua e exercícios curtos entre um material e outro.",
    image: {
      src: "/images/site/metodo/passo-2.webp",
      alt: "Estudante de fones anotando exercícios no caderno, com o notebook mostrando uma prática de conversa",
      position: "45% 50%",
    },
  },
  {
    icon: Users,
    title: "Encontrar",
    description: "A comunidade se reúne nos chats de discussão e nos pontos de encontro para apresentações.",
    image: {
      src: "/images/site/metodo/passo-3.webp",
      alt: "Grupo de pessoas conversando e discutindo numa roda, num ambiente acolhedor",
      position: "50% 35%",
    },
  },
  {
    icon: Mic,
    title: "Aprofundar",
    description:
      "Todos os meses, uma aula ao vivo exclusiva comigo, com um tema específico. Quem quer acompanhamento individual segue a mentoria.",
    image: {
      src: "/images/site/metodo/passo-4.webp",
      alt: "Professora em videochamada individual, gesticulando enquanto explica, com xícara e livros na mesa",
      position: "40% 40%",
    },
  },
  {
    icon: TrendingUp,
    title: "Evoluir",
    description: "A melhora aparece na comunicação como um todo: uma fala natural, sem esforço, no seu tempo.",
    image: {
      src: "/images/site/metodo/passo-5.webp",
      alt: "Duas pessoas conversando e rindo numa mesa de café, com naturalidade",
      position: "50% 30%",
    },
  },
];
