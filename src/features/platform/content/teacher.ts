/**
 * Dados FICTÍCIOS do painel da professora. Números, nomes e e-mails são inventados para a
 * demonstração; nada vem de vendas ou alunos reais.
 */

export const teacher = {
  name: "Vanessa Mendes",
  firstName: "Vanessa",
  role: "Professora · administradora",
  photo: "/images/platform/vanessa-avatar.webp",
};

export type Period = "7d" | "30d" | "90d";

export const periods: { id: Period; label: string; long: string }[] = [
  { id: "7d", label: "7D", long: "últimos 7 dias" },
  { id: "30d", label: "30D", long: "últimos 30 dias" },
  { id: "90d", label: "90D", long: "últimos 90 dias" },
];

/** Série pseudoaleatória estável (mesmo resultado no servidor e no navegador). */
function series(n: number, base: number, growth: number, wobble: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: n }, (_, i) => {
    const trend = base * (1 + (growth * i) / Math.max(1, n - 1));
    const wave = Math.sin(i / 2.2) * wobble * 0.6 + (rand() - 0.5) * wobble;
    return Math.max(0, Math.round(trend + wave));
  });
}

function dayLabels(n: number, endDay = 12, endMonth = 11) {
  // datas fictícias terminando em 12/11
  const end = new Date(2026, endMonth - 1, endDay);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(end);
    d.setDate(end.getDate() - (n - 1 - i));
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
}

function weekLabels(n: number) {
  const end = new Date(2026, 10, 12);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(end);
    d.setDate(end.getDate() - (n - 1 - i) * 7);
    return `sem. ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
}

export type Kpi = { id: string; label: string; value: number; format: "brl" | "int"; delta: number; spark: number[] };

export type PeriodData = {
  revenue: { labels: string[]; values: number[]; total: number; delta: number };
  kpis: Kpi[];
};

function build(period: Period): PeriodData {
  const cfg = {
    "7d": { n: 7, labels: dayLabels(7), base: 260, wobble: 120, seed: 7, mult: 1 },
    "30d": { n: 30, labels: dayLabels(30), base: 210, wobble: 110, seed: 30, mult: 4.1 },
    "90d": { n: 13, labels: weekLabels(13), base: 1500, wobble: 380, seed: 90, mult: 11.8 },
  }[period];
  const values = series(cfg.n, cfg.base, 0.55, cfg.wobble, cfg.seed);
  const total = values.reduce((a, b) => a + b, 0);
  const m = cfg.mult;
  return {
    revenue: { labels: cfg.labels, values, total, delta: { "7d": 9.8, "30d": 12.4, "90d": 21.6 }[period] },
    kpis: [
      { id: "receita", label: "Receita", value: total, format: "brl", delta: { "7d": 9.8, "30d": 12.4, "90d": 21.6 }[period], spark: series(12, 40, 0.5, 14, cfg.seed + 1) },
      { id: "matriculas", label: "Novas matrículas", value: Math.round(11 * m), format: "int", delta: { "7d": 4.2, "30d": 8.1, "90d": 15.3 }[period], spark: series(12, 20, 0.4, 8, cfg.seed + 2) },
      { id: "ativos", label: "Alunos ativos", value: 312, format: "int", delta: { "7d": 1.3, "30d": 5.1, "90d": 11.7 }[period], spark: series(12, 60, 0.25, 6, cfg.seed + 3) },
      { id: "assistidas", label: "Conversas assistidas", value: Math.round(310 * m), format: "int", delta: { "7d": 6.7, "30d": 9.6, "90d": 18.2 }[period], spark: series(12, 30, 0.45, 10, cfg.seed + 4) },
    ],
  };
}

export const periodData: Record<Period, PeriodData> = {
  "7d": build("7d"),
  "30d": build("30d"),
  "90d": build("90d"),
};

export const recentSales = [
  { name: "Helena Duarte", initials: "HD", item: "Curso: Como enriquecer minhas conversas?", value: 150, when: "Hoje, 14:32" },
  { name: "Caio Rezende", initials: "CR", item: "Assinatura Materiais Exclusivos", value: 34.99, when: "Hoje, 11:05" },
  { name: "Bianca Lopes", initials: "BL", item: "Conversa: Não consigo falar da minha área", value: 29.9, when: "Ontem, 21:48" },
  { name: "Otávio Mendes", initials: "OM", item: "Pacote de conversação", value: 200, when: "Ontem, 16:10" },
  { name: "Lara Fonseca", initials: "LF", item: "Assinatura Materiais Exclusivos", value: 34.99, when: "10/11, 09:22" },
];

/** Vendas por oferta (parte do todo, lida como lista de barras). */
export const salesByOffer = [
  { label: "Assinaturas", value: 4040 },
  { label: "Cursos", value: 2610 },
  { label: "Mentoria", value: 1200 },
  { label: "Conversas avulsas", value: 570 },
];

/**
 * Buscas dos alunos que não encontraram conversa (seção XIV: "o que precisa virar novo
 * material?"). Cada uma pode virar um rascunho no acervo.
 */
export const unansweredSearches = [
  { query: "como falar ao telefone", count: 23 },
  { query: "entrevista de emprego em inglês", count: 18 },
  { query: "small talk com cliente", count: 15 },
  { query: "apresentar um projeto", count: 11 },
];

export const supportRequests = [
  { name: "Rafaela Couto", subject: "Não recebi o acesso ao curso após o Pix", when: "há 2 h", status: "aberto" as const },
  { name: "Diego Faria", subject: "Como baixo a ficha da conversa?", when: "há 5 h", status: "aberto" as const },
  { name: "Marta Siqueira", subject: "Trocar o cartão da assinatura", when: "ontem", status: "respondido" as const },
];

export const nextMeeting = {
  date: "Qui, 27 de novembro",
  time: "19h",
  theme: "[Exemplo] Contar histórias de fim de ano",
  registered: 64,
};

/* Alunos e vendas */

export type StudentRow = {
  name: string;
  initials: string;
  email: string;
  plan: "Assinatura" | "Avulso" | "Mentoria" | "Sem plano";
  courses: number;
  productions: number;
  lastSeen: string;
  status: "ativo" | "inativo";
};

export const students: StudentRow[] = [
  { name: "Luiza Prado", initials: "LP", email: "luiza.prado@exemplo.com", plan: "Assinatura", courses: 1, productions: 5, lastSeen: "Hoje", status: "ativo" },
  { name: "Helena Duarte", initials: "HD", email: "helena.d@exemplo.com", plan: "Assinatura", courses: 2, productions: 9, lastSeen: "Hoje", status: "ativo" },
  { name: "Caio Rezende", initials: "CR", email: "caio.rezende@exemplo.com", plan: "Assinatura", courses: 0, productions: 1, lastSeen: "Hoje", status: "ativo" },
  { name: "Bianca Lopes", initials: "BL", email: "bianca.lopes@exemplo.com", plan: "Avulso", courses: 0, productions: 2, lastSeen: "Ontem", status: "ativo" },
  { name: "Otávio Mendes", initials: "OM", email: "otavio.m@exemplo.com", plan: "Mentoria", courses: 1, productions: 14, lastSeen: "Ontem", status: "ativo" },
  { name: "Lara Fonseca", initials: "LF", email: "lara.fonseca@exemplo.com", plan: "Assinatura", courses: 1, productions: 3, lastSeen: "3 dias", status: "ativo" },
  { name: "Pedro Almeida", initials: "PA", email: "pedro.almeida@exemplo.com", plan: "Assinatura", courses: 1, productions: 6, lastSeen: "5 dias", status: "ativo" },
  { name: "Sofia Ramos", initials: "SR", email: "sofia.ramos@exemplo.com", plan: "Sem plano", courses: 1, productions: 4, lastSeen: "3 semanas", status: "inativo" },
  { name: "Gustavo Lima", initials: "GL", email: "gustavo.lima@exemplo.com", plan: "Mentoria", courses: 2, productions: 18, lastSeen: "Hoje", status: "ativo" },
  { name: "Renata Vieira", initials: "RV", email: "renata.v@exemplo.com", plan: "Assinatura", courses: 0, productions: 0, lastSeen: "2 semanas", status: "inativo" },
];

export const orders = [
  { id: "#LS-10511", name: "Helena Duarte", item: "Curso: Como enriquecer minhas conversas?", value: 150, method: "Pix", date: "12/11/2026", status: "pago" as const },
  { id: "#LS-10509", name: "Caio Rezende", item: "Assinatura Materiais Exclusivos", value: 34.99, method: "Cartão", date: "12/11/2026", status: "pago" as const },
  { id: "#LS-10503", name: "Bianca Lopes", item: "Conversa: Não consigo falar da minha área", value: 29.9, method: "Pix", date: "11/11/2026", status: "pago" as const },
  { id: "#LS-10498", name: "Otávio Mendes", item: "Pacote de conversação", value: 200, method: "Cartão", date: "11/11/2026", status: "pago" as const },
  { id: "#LS-10494", name: "Rafaela Couto", item: "Curso: Como ler livros em inglês?", value: 150, method: "Pix", date: "11/11/2026", status: "pendente" as const },
  { id: "#LS-10487", name: "Lara Fonseca", item: "Assinatura Materiais Exclusivos", value: 34.99, method: "Cartão", date: "10/11/2026", status: "pago" as const },
  { id: "#LS-10471", name: "Gustavo Lima", item: "Mentoria individual", value: 400, method: "Cartão", date: "08/11/2026", status: "pago" as const },
  { id: "#LS-10455", name: "Renata Vieira", item: "Assinatura Materiais Exclusivos", value: 34.99, method: "Cartão", date: "05/11/2026", status: "reembolsado" as const },
];

export const coupons = [
  { code: "BEMVINDA10", discount: "10%", applies: "Assinatura", uses: 38, until: "31/12/2026", active: true },
  { code: "LEITURA20", discount: "20%", applies: "Curso: Como ler livros em inglês?", uses: 12, until: "30/11/2026", active: true },
  { code: "ENCONTRO", discount: "R$ 15", applies: "Pacote de conversação", uses: 4, until: "15/10/2026", active: false },
];

/* Mentoria */

export const mentoringCycle = {
  name: "Ciclo de janeiro",
  starts: "12/01/2027",
  seats: 6,
  filled: 4,
  open: true,
};

export const applications = [
  {
    id: "a1",
    name: "Mariana Teles",
    initials: "MT",
    goal: "Apresentar resultados em reuniões com a matriz, em inglês.",
    situation: "Profissional · gerente de projetos",
    production: "Áudio · 2min15",
    date: "10/11/2026",
  },
  {
    id: "a2",
    name: "Fernando Brito",
    initials: "FB",
    goal: "Preparar a entrevista do mestrado no exterior.",
    situation: "Acadêmico · mestrado",
    production: "Texto · 320 palavras",
    date: "08/11/2026",
  },
  {
    id: "a3",
    name: "Carolina Pires",
    initials: "CP",
    goal: "Voltar a conversar sem travar depois de anos sem praticar.",
    situation: "Geral · retomada",
    production: "Áudio · 1min40",
    date: "05/11/2026",
  },
];

export const mentees = [
  { name: "Otávio Mendes", initials: "OM", focus: "Contar a própria trajetória em entrevistas", next: "14/11, 18h", experiment: "Reconto da última reunião" },
  { name: "Gustavo Lima", initials: "GL", focus: "Conduzir reuniões com o time de fora", next: "18/11, 08h", experiment: "Abrir a reunião sem roteiro" },
  { name: "Ana Beatriz Costa", initials: "AC", focus: "Ler artigos e falar sobre eles", next: "19/11, 19h", experiment: "Resumo oral de um artigo por semana" },
  { name: "Júlio Santana", initials: "JS", focus: "Small talk com clientes", next: "21/11, 12h", experiment: "Três perguntas de retorno por conversa" },
];
