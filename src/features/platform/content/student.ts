import type { SituationId } from "./catalog";

/**
 * Dados FICTÍCIOS da aluna da demonstração. Nome, e-mail e números são inventados;
 * nenhum vem da base real de alunos.
 */
export const student = {
  name: "Luiza Prado",
  firstName: "Luiza",
  initials: "LP",
  email: "luiza.prado@exemplo.com",
  phone: "(31) 90000-0000",
  plan: "Materiais Exclusivos",
  since: "agosto de 2026",
  /** cursos que ela comprou */
  courses: ["enriquecer-minhas-conversas"],
  /** conversas avulsas compradas */
  purchased: [] as string[],
  /** progresso no curso: aulas concluídas (índices) */
  courseProgress: {
    "enriquecer-minhas-conversas": { done: 3, reflections: 4, productions: 2 },
  } as Record<string, { done: number; reflections: number; productions: number }>,
  saved: ["ser-mais-descritivo", "falar-da-minha-area", "ler-um-livro", "deu-branco"],
  watched: ["sair-do-good-e-very-well", "parar-de-me-cobrar", "ser-mais-descritivo"],
};

export const studentStats = [
  { label: "Conversas vistas", value: "14", note: "6 neste mês" },
  { label: "Produções registradas", value: "5", note: "2 áudios novos" },
  { label: "Conversas salvas", value: "8", note: "para retomar" },
  { label: "Encontros ao vivo", value: "3", note: "desde agosto" },
];

/** Entrada da home: "o que acontece com você quando tenta usar inglês?" (seção IV). */
export const situationPrompts: { text: string; situation: SituationId; conversation: string }[] = [
  { text: "Minhas respostas ficam curtas", situation: "conversas", conversation: "sair-do-good-e-very-well" },
  { text: "Travo para falar do meu trabalho", situation: "trabalho", conversation: "falar-da-minha-area" },
  { text: "Quero ler sem parar toda hora", situation: "leitura", conversation: "ler-um-livro" },
  { text: "Me cobro demais", situation: "confianca", conversation: "parar-de-me-cobrar" },
  { text: "Dá branco no meio da frase", situation: "confianca", conversation: "deu-branco" },
  { text: "Não acompanho filmes e séries", situation: "filmes", conversation: "filme-sem-legenda" },
];

export const liveMeeting = {
  date: "Qui, 27 de novembro",
  time: "19h às 20h",
  theme: "[Exemplo] Contar histórias de fim de ano",
  registered: 64,
  photo: "/images/platform/vanessa-aula.webp",
};

/** Produções registradas (percurso: experiências e produções, não só porcentagem). */
export const productions = [
  {
    id: "p5",
    kind: "Áudio" as const,
    title: "Relato da viagem para a praia",
    detail: "1min42",
    conversation: "ser-mais-descritivo",
    date: "08/11/2026",
    note: "Consegui descrever o lugar sem repetir “beautiful”.",
  },
  {
    id: "p4",
    kind: "Texto" as const,
    title: "Descrição do meu bairro",
    detail: "180 palavras",
    conversation: "ser-mais-descritivo",
    date: "03/11/2026",
    note: "Usei as perguntas sensoriais: o que se ouve, o que se vê.",
  },
  {
    id: "p3",
    kind: "Áudio" as const,
    title: "Como foi meu fim de semana",
    detail: "1min05",
    conversation: "sair-do-good-e-very-well",
    date: "27/10/2026",
    note: "Ainda saiu um “very good”, mas depois eu expliquei por quê.",
  },
  {
    id: "p2",
    kind: "Texto" as const,
    title: "Reflexão: onde eu me cobro",
    detail: "Reflexão",
    conversation: "parar-de-me-cobrar",
    date: "15/10/2026",
    note: "Percebi que travo mais quando tem alguém do trabalho ouvindo.",
  },
  {
    id: "p1",
    kind: "Áudio" as const,
    title: "Linha de base do curso",
    detail: "2min10",
    conversation: undefined,
    date: "02/10/2026",
    note: "Primeira gravação, para comparar no fim do curso.",
  },
];

export const journeyTimeline = [
  { date: "08/11", text: "Registrou um áudio em", target: "Como ser mais descritivo?" },
  { date: "06/11", text: "Salvou a conversa", target: "Não consigo falar da minha área. Por onde começo?" },
  { date: "30/10", text: "Participou do encontro ao vivo", target: "[Exemplo] Pedir e dar indicações" },
  { date: "27/10", text: "Concluiu a aula 3 do curso", target: "Como enriquecer minhas conversas?" },
  { date: "15/10", text: "Escreveu uma reflexão em", target: "Como parar de me cobrar o inglês perfeito?" },
  { date: "02/10", text: "Começou o curso", target: "Como enriquecer minhas conversas?" },
];

export const purchases = [
  { id: "#LS-10482", date: "05/11/2026", item: "Assinatura Materiais Exclusivos", kind: "Assinatura", value: 34.99, method: "Cartão final 4821" },
  { id: "#LS-10217", date: "05/10/2026", item: "Assinatura Materiais Exclusivos", kind: "Assinatura", value: 34.99, method: "Cartão final 4821" },
  { id: "#LS-10133", date: "02/10/2026", item: "Curso: Como enriquecer minhas conversas?", kind: "Curso", value: 150, method: "Pix" },
  { id: "#LS-09871", date: "05/09/2026", item: "Assinatura Materiais Exclusivos", kind: "Assinatura", value: 34.99, method: "Cartão final 4821" },
  { id: "#LS-09502", date: "05/08/2026", item: "Assinatura Materiais Exclusivos", kind: "Assinatura", value: 34.99, method: "Cartão final 4821" },
];

export const subscription = {
  name: "Materiais Exclusivos",
  price: 34.99,
  renews: "05/12/2026",
  includes: ["Conversas da assinatura", "Encontro ao vivo mensal com a Vanessa", "Novas conversas toda semana"],
};

/** Mentoria (seção VIII): como funciona, do ponto de vista de quem se candidata. */
export const mentoringSteps = [
  { title: "Candidatura", text: "Você conta seu objetivo, sua situação e envia uma produção inicial." },
  { title: "Conversa inicial", text: "A Vanessa lê sua candidatura e vocês definem o foco do ciclo." },
  { title: "Ciclo de encontros", text: "Encontros, experimentos e produções, com registro do que muda." },
  { title: "Encerramento", text: "Comparação entre início e fim e um plano para continuar sozinho." },
];

export const mentoringCompare = {
  course: ["Conversas para todos que vivem a mesma situação", "No seu ritmo, quando quiser", "Práticas abertas e portfólio"],
  mentoring: ["Leitura individual da sua produção", "Ciclo com começo, meio e fim", "Encontros com a Vanessa e plano pessoal"],
};
