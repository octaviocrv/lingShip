import type { LucideIcon } from "lucide-react";
import { Dumbbell, Mic, Search, TrendingUp, Users } from "lucide-react";

export const metodoSection = {
  eyebrow: "O método",
  title: "Como se aprende aqui.",
  description:
    "A plataforma é individual e em comunidade, comigo como facilitadora e guia do seu processo. Você estuda no seu ritmo, participa dos grupos de discussão quando quiser e conta com o meu apoio em cada etapa.",
  cta: { label: "Comece pelos materiais gratuitos", href: "#materiais" },
};

export const passos: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "Buscar",
    description: "Você escolhe a habilidade que quer desenvolver e estuda pelos materiais e vídeos.",
  },
  {
    icon: Dumbbell,
    title: "Praticar",
    description: "No seu ritmo, com situações diretas da língua e exercícios curtos entre um material e outro.",
  },
  {
    icon: Users,
    title: "Encontrar",
    description: "A comunidade se reúne nos chats de discussão e nos pontos de encontro para apresentações.",
  },
  {
    icon: Mic,
    title: "Aprofundar",
    description:
      "Todos os meses, uma aula ao vivo exclusiva comigo, com um tema específico. Quem quer acompanhamento individual segue a mentoria.",
  },
  {
    icon: TrendingUp,
    title: "Evoluir",
    description: "A melhora aparece na comunicação como um todo: uma fala natural, sem esforço, no seu tempo.",
  },
];
