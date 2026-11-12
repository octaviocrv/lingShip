import type { LucideIcon } from "lucide-react";
import { BookOpen, FastForward, Headphones, Languages, MessageCircle, Zap } from "lucide-react";

export const desafiosSection = {
  eyebrow: "O que exercitar",
  title: "Os pontos que você quer desenvolver.",
  description:
    "Aqui não se separa o inglês por assuntos do dia a dia. Trabalha-se a língua em uso: interpretar o que é dito, dizer a mesma ideia de formas diferentes, discutir, defender um ponto de vista e se comunicar com naturalidade. Escolha o que você quer exercitar.",
  empty: "Nenhum ponto nessa categoria ainda. Em breve a comunidade abre novas práticas.",
};

export const categorias = ["Todos", "Pensar em inglês", "Fluência", "Leitura", "Escuta", "Fala"] as const;

export type Categoria = Exclude<(typeof categorias)[number], "Todos">;

export const desafios: { icon: LucideIcon; title: string; description: string; category: Categoria }[] = [
  {
    icon: Languages,
    title: "Pensar em inglês, sem passar pelo português",
    description: "Entender a frase e responder no mesmo instante, com o inglês virando automático, direto e natural.",
    category: "Pensar em inglês",
  },
  {
    icon: FastForward,
    title: "Sair do avançado para a fluência",
    description:
      "Você conhece a gramática e estuda há anos. Aqui o trabalho é soltar a língua e falar com a naturalidade que você sempre buscou.",
    category: "Fluência",
  },
  {
    icon: BookOpen,
    title: "Ler um livro em inglês do começo ao fim",
    description:
      "Ganhar o ritmo da leitura, acompanhar o fio da história e aproveitar o texto sem interromper a cada linha.",
    category: "Leitura",
  },
  {
    icon: Headphones,
    title: "Entender quem fala rápido de verdade",
    description:
      "Acompanhar conversas naturais, filmes e chamadas ao vivo, mesmo quando as palavras se emendam.",
    category: "Escuta",
  },
  {
    icon: MessageCircle,
    title: "Responder na hora, sem ensaiar antes",
    description: "Ganhar agilidade para responder no momento, com a frase saindo pronta e sem esforço.",
    category: "Fala",
  },
  {
    icon: Zap,
    title: "Se comunicar bem onde mais importa",
    description: "Chegar em reuniões, entrevistas e apresentações com a confiança de quem se comunica bem.",
    category: "Fala",
  },
];
