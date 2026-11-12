/**
 * Planos e pacotes, com os preços do protótipo.
 * Preços e descrições ainda não confirmados como definitivos (ver _memoria/empresa.md).
 * As fotos são de banco de imagem, provisórias até a Vanessa enviar fotos próprias.
 */

export type Plano = {
  id: string;
  label: string;
  name: string;
  description: string;
  price: string;
  cta: string;
  photo: { src: string; alt: string };
};

export const planosSection = {
  eyebrow: "Planos e pacotes",
  title: "Aprender no seu ritmo, com a comunidade e comigo por perto.",
  description:
    "A plataforma é individual e em comunidade: você estuda pelos materiais, se encontra com os outros estudantes nos chats e nas apresentações e conta com o meu apoio em cada etapa do processo.",
  liveClass: {
    lead: "Aula ao vivo exclusiva comigo:",
    text: "todo assinante tem direito a um encontro ao vivo por mês, diretamente comigo, com um tema novo a cada mês. Quem compra qualquer material também garante a sua vaga. É o seu acesso direto a mim.",
    cta: { label: "Falar com a Vanessa", href: "#contato" },
  },
};

export const planos: Plano[] = [
  {
    id: "materiais-exclusivos",
    label: "Acesso",
    name: "Materiais Exclusivos",
    description:
      "Acesso aos materiais extras, vídeos curtos de situações diretas da língua, chats de discussão, pontos de encontro da comunidade e a aula ao vivo mensal com a Vanessa.",
    price: "R$34,99",
    cta: "Comprar acesso",
    photo: {
      src: "/images/site/planos/materiais-exclusivos.jpg",
      alt: "Pessoa estudando no notebook com ícones de materiais digitais",
    },
  },
  {
    id: "cursos",
    label: "Acesso",
    name: "Cursos",
    description:
      "Material completo de um tema específico da língua, para estudar no seu ritmo. Quem compra também tem direito à aula ao vivo do mês.",
    price: "R$150,00",
    cta: "Comprar acesso",
    photo: {
      src: "/images/site/planos/cursos.jpg",
      alt: "Mesa de estudo com caderno, caneca e marcadores em uma sala de aula",
    },
  },
  {
    id: "pacote-conversacao",
    label: "Acesso",
    name: "Pacote de conversação",
    description:
      "Encontros de conversação de uma hora, diretamente comigo, focados só na prática da fala. Um caminho mais enxuto que a mentoria, para quem quer ganhar fluência conversando com acompanhamento de perto.",
    price: "R$200,00",
    cta: "Comprar acesso",
    photo: {
      src: "/images/site/planos/pacote-conversacao.jpg",
      alt: "Estudante com fone de ouvido sorrindo durante uma conversa online",
    },
  },
  {
    id: "mentoria-individual",
    label: "Acesso",
    name: "Mentoria individual",
    description:
      "Caminho individual com pontuações de cada passo do processo: juntas traçamos a direção para você saber exatamente quais são os seus gaps de linguagem e ter estratégias de evolução.",
    price: "R$400,00",
    cta: "Comprar acesso",
    photo: {
      src: "/images/site/planos/mentoria-individual.jpg",
      alt: "Professora conversando com um estudante em uma mesa de atendimento",
    },
  },
];
