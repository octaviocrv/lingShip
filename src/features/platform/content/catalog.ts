/**
 * Acervo FICTÍCIO da demonstração (conversas, séries e cursos), usado pelas duas visões:
 * o aluno vê o que está publicado; a professora vê tudo, com o status editorial.
 *
 * As perguntas seguem o formato do documento de direção (a unidade é a situação do aluno,
 * nunca "gramática" ou "nível"). Os textos pedagógicos são da Vanessa: aqui só há
 * marcadores ilustrativos, montados em `illustrativeBody()`.
 */

export type SituationId = "conversas" | "trabalho" | "leitura" | "confianca" | "filmes";

export const situations: { id: SituationId; label: string }[] = [
  { id: "conversas", label: "Conversas do dia a dia" },
  { id: "trabalho", label: "Trabalho" },
  { id: "leitura", label: "Leitura" },
  { id: "confianca", label: "Confiança" },
  { id: "filmes", label: "Filmes e séries" },
];

export const situationLabel = (id: SituationId) => situations.find((s) => s.id === id)?.label ?? id;

/** Status editorial (seção IX do documento de direção). */
export type EditorialStatus = "ideia" | "roteiro" | "gravado" | "revisao" | "publicado";

export const editorialStatuses: { id: EditorialStatus; label: string }[] = [
  { id: "ideia", label: "Ideia" },
  { id: "roteiro", label: "Roteiro" },
  { id: "gravado", label: "Gravado" },
  { id: "revisao", label: "Em revisão" },
  { id: "publicado", label: "Publicado" },
];

export type Access = { kind: "gratuito" } | { kind: "assinatura" } | { kind: "avulso"; price: number };

export type Autonomy = "Conhecer" | "Testar" | "Variar" | "Transferir";

export type Conversation = {
  slug: string;
  question: string;
  /** frase curta que aparece no card, como o aluno descreveria a situação */
  hook: string;
  situations: SituationId[];
  format: "Vídeo" | "Áudio" | "Ficha";
  minutes: number;
  access: Access;
  cover: string;
  series?: string;
  related: string[];
  status: EditorialStatus;
  updated: string;
  saves: number;
  views: number;
  /** campos internos do acervo: o aluno não vê */
  internal: {
    difficulty: string;
    transformation: string;
    strategies: string[];
    audiences: string[];
    autonomy: Autonomy;
  };
};

const cover = (name: string) => `/images/platform/capas/${name}.webp`;

export const series = [
  { slug: "conversas-com-mais-cor", title: "Conversas com mais cor", cover: cover("cafe") },
  { slug: "ingles-no-trabalho", title: "Inglês no trabalho", cover: cover("apresentacao") },
  { slug: "ler-por-prazer", title: "Ler por prazer", cover: cover("leitura") },
  { slug: "sem-cobranca", title: "Sem cobrança", cover: cover("estudo") },
] as const;

export const seriesTitle = (slug?: string) => series.find((s) => s.slug === slug)?.title;

export const conversations: Conversation[] = [
  {
    slug: "sair-do-good-e-very-well",
    question: "Como sair do “good” e do “very well”?",
    hook: "Você quer contar como foi e só sai “it was good”.",
    situations: ["conversas"],
    format: "Vídeo",
    minutes: 12,
    access: { kind: "gratuito" },
    cover: cover("cafe"),
    series: "conversas-com-mais-cor",
    related: ["ser-mais-descritivo", "contar-uma-historia", "continuar-a-conversa"],
    status: "publicado",
    updated: "02/11/2026",
    saves: 412,
    views: 3180,
    internal: {
      difficulty: "Respostas genéricas; falta de detalhe",
      transformation: "Fazer o outro imaginar e sustentar a troca",
      strategies: ["Perguntas sensoriais", "Camadas", "Comparação"],
      audiences: ["Geral"],
      autonomy: "Testar",
    },
  },
  {
    slug: "ser-mais-descritivo",
    question: "Como ser mais descritivo?",
    hook: "As ideias estão na cabeça, mas a frase sai curta.",
    situations: ["conversas"],
    format: "Vídeo",
    minutes: 14,
    access: { kind: "assinatura" },
    cover: cover("grupo"),
    series: "conversas-com-mais-cor",
    related: ["sair-do-good-e-very-well", "contar-uma-historia"],
    status: "publicado",
    updated: "28/10/2026",
    saves: 356,
    views: 2410,
    internal: {
      difficulty: "Falta de detalhe",
      transformation: "Descrever para o outro enxergar",
      strategies: ["Perguntas sensoriais", "Reconto"],
      audiences: ["Geral", "Avançado"],
      autonomy: "Variar",
    },
  },
  {
    slug: "contar-uma-historia",
    question: "Como contar uma história sem perder o fio?",
    hook: "Começa bem, se enrola no meio e termina com “anyway”.",
    situations: ["conversas"],
    format: "Vídeo",
    minutes: 13,
    access: { kind: "assinatura" },
    cover: cover("reuniao"),
    series: "conversas-com-mais-cor",
    related: ["ser-mais-descritivo", "continuar-a-conversa"],
    status: "publicado",
    updated: "21/10/2026",
    saves: 298,
    views: 1960,
    internal: {
      difficulty: "Organização da fala",
      transformation: "Conduzir quem escuta até o fim",
      strategies: ["Camadas", "Reconto"],
      audiences: ["Geral"],
      autonomy: "Testar",
    },
  },
  {
    slug: "continuar-a-conversa",
    question: "Como continuar a conversa depois do “and you?”",
    hook: "A troca morre na segunda pergunta.",
    situations: ["conversas"],
    format: "Áudio",
    minutes: 9,
    access: { kind: "assinatura" },
    cover: cover("cafe"),
    series: "conversas-com-mais-cor",
    related: ["sair-do-good-e-very-well", "deu-branco"],
    status: "publicado",
    updated: "14/10/2026",
    saves: 241,
    views: 1730,
    internal: {
      difficulty: "Conversa que não se sustenta",
      transformation: "Manter a troca viva",
      strategies: ["Perguntas de retorno"],
      audiences: ["Geral"],
      autonomy: "Conhecer",
    },
  },
  {
    slug: "falar-da-minha-area",
    question: "Não consigo falar da minha área. Por onde começo?",
    hook: "Você domina o trabalho, mas em inglês parece outra pessoa.",
    situations: ["trabalho"],
    format: "Vídeo",
    minutes: 15,
    access: { kind: "avulso", price: 29.9 },
    cover: cover("apresentacao"),
    series: "ingles-no-trabalho",
    related: ["reuniao-sem-decorar", "parar-de-me-cobrar"],
    status: "publicado",
    updated: "05/11/2026",
    saves: 318,
    views: 2050,
    internal: {
      difficulty: "Repertório profissional",
      transformation: "Falar do próprio trabalho com segurança",
      strategies: ["Mapa de situações", "Reconto"],
      audiences: ["Profissional"],
      autonomy: "Transferir",
    },
  },
  {
    slug: "reuniao-sem-decorar",
    question: "Como me apresentar numa reunião sem decorar texto?",
    hook: "Você ensaia tudo e, na hora, a frase decorada some.",
    situations: ["trabalho", "confianca"],
    format: "Vídeo",
    minutes: 11,
    access: { kind: "assinatura" },
    cover: cover("reuniao"),
    series: "ingles-no-trabalho",
    related: ["falar-da-minha-area", "deu-branco"],
    status: "publicado",
    updated: "30/10/2026",
    saves: 205,
    views: 1420,
    internal: {
      difficulty: "Dependência de roteiro",
      transformation: "Falar a partir de ideias, não de frases",
      strategies: ["Camadas", "Mapa de situações"],
      audiences: ["Profissional"],
      autonomy: "Variar",
    },
  },
  {
    slug: "ler-um-livro",
    question: "Como ler um livro em inglês sem parar a cada palavra?",
    hook: "Três páginas, vinte buscas no dicionário e o livro volta pra estante.",
    situations: ["leitura"],
    format: "Vídeo",
    minutes: 12,
    access: { kind: "gratuito" },
    cover: cover("leitura"),
    series: "ler-por-prazer",
    related: ["parar-de-me-cobrar", "filme-sem-legenda"],
    status: "publicado",
    updated: "19/10/2026",
    saves: 389,
    views: 2890,
    internal: {
      difficulty: "Leitura interrompida",
      transformation: "Ler pelo sentido, não pela palavra",
      strategies: ["Leitura em camadas", "Comparação"],
      audiences: ["Geral", "Acadêmico"],
      autonomy: "Testar",
    },
  },
  {
    slug: "parar-de-me-cobrar",
    question: "Como parar de me cobrar o inglês perfeito?",
    hook: "Você sabe mais do que mostra, porque espera estar pronto.",
    situations: ["confianca"],
    format: "Áudio",
    minutes: 10,
    access: { kind: "gratuito" },
    cover: cover("estudo"),
    series: "sem-cobranca",
    related: ["deu-branco", "reuniao-sem-decorar"],
    status: "publicado",
    updated: "08/10/2026",
    saves: 447,
    views: 3420,
    internal: {
      difficulty: "Autocobrança",
      transformation: "Separar dificuldade de incapacidade",
      strategies: ["Observação", "Registro"],
      audiences: ["Geral"],
      autonomy: "Conhecer",
    },
  },
  {
    slug: "deu-branco",
    question: "O que fazer quando dá branco no meio da frase?",
    hook: "A palavra some e a conversa trava junto.",
    situations: ["confianca", "conversas"],
    format: "Vídeo",
    minutes: 8,
    access: { kind: "assinatura" },
    cover: cover("grupo"),
    series: "sem-cobranca",
    related: ["parar-de-me-cobrar", "continuar-a-conversa"],
    status: "publicado",
    updated: "01/10/2026",
    saves: 276,
    views: 1880,
    internal: {
      difficulty: "Bloqueio na fala",
      transformation: "Contornar sem parar a conversa",
      strategies: ["Paráfrase", "Perguntas de retorno"],
      audiences: ["Geral"],
      autonomy: "Testar",
    },
  },
  {
    slug: "filme-sem-legenda",
    question: "Como acompanhar um filme sem legenda em português?",
    hook: "Você entende tudo na aula e nada na série.",
    situations: ["filmes"],
    format: "Vídeo",
    minutes: 13,
    access: { kind: "assinatura" },
    cover: cover("estudo"),
    related: ["ler-um-livro", "parar-de-me-cobrar"],
    status: "publicado",
    updated: "24/09/2026",
    saves: 192,
    views: 1350,
    internal: {
      difficulty: "Compreensão em velocidade real",
      transformation: "Acompanhar pelo contexto",
      strategies: ["Comparação", "Reconto"],
      audiences: ["Geral"],
      autonomy: "Variar",
    },
  },
  // Em produção: só a professora vê
  {
    slug: "opiniao-sem-soar-rigido",
    question: "Como dar minha opinião sem soar rígido?",
    hook: "Você concorda ou discorda, mas parece seco.",
    situations: ["conversas", "trabalho"],
    format: "Vídeo",
    minutes: 12,
    access: { kind: "assinatura" },
    cover: cover("grupo"),
    series: "conversas-com-mais-cor",
    related: ["continuar-a-conversa"],
    status: "revisao",
    updated: "10/11/2026",
    saves: 0,
    views: 0,
    internal: {
      difficulty: "Tom da fala",
      transformation: "Posicionar-se mantendo a troca",
      strategies: ["Camadas", "Comparação"],
      audiences: ["Geral", "Profissional"],
      autonomy: "Variar",
    },
  },
  {
    slug: "entrevista-de-emprego",
    question: "Como falar de mim numa entrevista de emprego?",
    hook: "A pergunta “tell me about yourself” e o silêncio depois.",
    situations: ["trabalho"],
    format: "Vídeo",
    minutes: 14,
    access: { kind: "avulso", price: 29.9 },
    cover: cover("apresentacao"),
    series: "ingles-no-trabalho",
    related: ["falar-da-minha-area"],
    status: "gravado",
    updated: "09/11/2026",
    saves: 0,
    views: 0,
    internal: {
      difficulty: "Falar de si",
      transformation: "Contar a própria trajetória",
      strategies: ["Reconto", "Mapa de situações"],
      audiences: ["Profissional"],
      autonomy: "Transferir",
    },
  },
  {
    slug: "ligacao-sem-travar",
    question: "Como falar ao telefone sem travar?",
    hook: "Sem ver o rosto da pessoa, tudo fica mais difícil.",
    situations: ["trabalho", "confianca"],
    format: "Áudio",
    minutes: 10,
    access: { kind: "assinatura" },
    cover: cover("reuniao"),
    related: ["deu-branco"],
    status: "roteiro",
    updated: "06/11/2026",
    saves: 0,
    views: 0,
    internal: {
      difficulty: "Compreensão sem apoio visual",
      transformation: "Conduzir a ligação",
      strategies: ["Perguntas de retorno", "Paráfrase"],
      audiences: ["Profissional"],
      autonomy: "Testar",
    },
  },
  {
    slug: "email-formal",
    question: "Como escrever um e-mail que soe natural?",
    hook: "Tudo certo na gramática, mas parece traduzido.",
    situations: ["trabalho"],
    format: "Ficha",
    minutes: 8,
    access: { kind: "assinatura" },
    cover: cover("estudo"),
    related: ["falar-da-minha-area"],
    status: "ideia",
    updated: "03/11/2026",
    saves: 0,
    views: 0,
    internal: {
      difficulty: "Escrita que soa traduzida",
      transformation: "Escrever como se fala no trabalho",
      strategies: ["Comparação"],
      audiences: ["Profissional"],
      autonomy: "Conhecer",
    },
  },
];

export const publishedConversations = conversations.filter((c) => c.status === "publicado");

export const getConversation = (slug: string) => conversations.find((c) => c.slug === slug);

/**
 * Blocos da página de material (seção VI do documento de direção), com texto ILUSTRATIVO.
 * Cada bloco descreve o que a Vanessa escreve ali; não é conteúdo pedagógico real.
 */
export function illustrativeBody(c: Conversation) {
  return {
    scene: `Aqui entra uma cena curta, contada pela Vanessa, de quando isso acontece. Exemplo de formato: “${c.hook}”`,
    why: "Aqui a Vanessa explica o processo por trás da dificuldade, com as palavras dela, para tirar o peso e mostrar que existe um caminho.",
    welcome: "Um parágrafo de acolhimento: separar a dificuldade da incapacidade e lembrar que isso faz parte de aprender a usar a língua.",
    steps: [
      { title: "Passo 1 da estratégia", text: "Como a Vanessa conduz o primeiro movimento, em uma ou duas frases." },
      { title: "Passo 2 da estratégia", text: "O que muda na prática quando o aluno experimenta esse passo." },
      { title: "Passo 3 da estratégia", text: "Como transformar o passo em hábito, sem depender de correção." },
    ],
    examples: [
      { context: "Com um amigo", text: "Exemplo de fala nesta situação, escrito pela professora." },
      { context: "No trabalho", text: "A mesma estratégia com outro interlocutor." },
      { context: "Por escrito", text: "Uma variação em mensagem ou e-mail." },
    ],
    experience: "Convite para testar: a Vanessa propõe uma situação da sua vida para você experimentar a estratégia do seu jeito.",
    observe: [
      "Critério de observação 1, além de acertei ou errei",
      "Critério de observação 2: o que mudou na reação de quem ouviu",
      "Critério de observação 3: o que você conseguiu variar sozinho",
    ],
  };
}

/* Cursos */

export type CourseLesson = {
  question: string;
  conversation?: string;
  practice?: string;
  /** duração da aula; nas ligadas a uma conversa, vale a duração da conversa */
  minutes?: number;
  /** linha de apoio na lista de aulas (o que acontece nessa aula) */
  summary?: string;
};

/** Módulo: um grupo de aulas-pergunta em torno de um mesmo movimento do curso. */
export type CourseModule = { title: string; summary: string; lessons: CourseLesson[] };

export type Course = {
  slug: string;
  title: string;
  cover: string;
  price: number;
  status: "publicado" | "rascunho";
  enrolled: number;
  completed: number;
  forWho: string;
  today: string;
  after: string;
  modules: CourseModule[];
  /** todas as aulas em sequência (derivado dos módulos; o painel da professora usa esta lista) */
  lessons: CourseLesson[];
};

const defineCourse = (c: Omit<Course, "lessons">): Course => ({ ...c, lessons: c.modules.flatMap((m) => m.lessons) });

export const courses: Course[] = [
  defineCourse({
    slug: "enriquecer-minhas-conversas",
    title: "Como enriquecer minhas conversas?",
    cover: cover("cafe"),
    price: 150,
    status: "publicado",
    enrolled: 128,
    completed: 34,
    forWho: "Para quem já conversa em inglês, mas sente que as respostas ficam curtas e a troca não flui.",
    today: "Respostas curtas, sempre as mesmas palavras e conversas que acabam cedo.",
    after: "Conversas com detalhe, histórias contadas até o fim e trocas que continuam.",
    modules: [
      {
        title: "Ponto de partida",
        summary: "Onde suas conversas estão hoje.",
        lessons: [
          { question: "O que eu já consigo dizer hoje?", practice: "Linha de base: áudio livre", minutes: 6, summary: "Uma gravação livre para comparar no fim do curso." },
          { question: "Como sair do “good” e do “very well”?", conversation: "sair-do-good-e-very-well", practice: "Áudio", summary: "Quando a resposta pronta encerra a conversa." },
        ],
      },
      {
        title: "Dar cor ao que você conta",
        summary: "Detalhe, cena e história.",
        lessons: [
          { question: "Como ser mais descritivo?", conversation: "ser-mais-descritivo", practice: "Texto", summary: "Fazer quem ouve enxergar o que você viveu." },
          { question: "Como contar uma história sem perder o fio?", conversation: "contar-uma-historia", practice: "Relato", summary: "Começo, meio e fim sem se perder no caminho." },
        ],
      },
      {
        title: "Manter a conversa viva",
        summary: "Reagir, contornar e se posicionar.",
        lessons: [
          { question: "Como continuar a conversa depois do “and you?”", conversation: "continuar-a-conversa", practice: "Áudio", summary: "Perguntas de retorno que mantêm a troca." },
          { question: "O que fazer quando dá branco no meio da frase?", conversation: "deu-branco", summary: "Seguir falando quando a palavra some." },
          { question: "Como dar minha opinião sem soar rígido?", conversation: "opiniao-sem-soar-rigido", practice: "Áudio", minutes: 12, summary: "Concordar e discordar mantendo a conversa aberta." },
        ],
      },
      {
        title: "O que mudou",
        summary: "Comparar o início e o fim.",
        lessons: [
          { question: "O que mudou na minha conversa?", practice: "Produção final", minutes: 8, summary: "Nova gravação e comparação com a linha de base." },
        ],
      },
    ],
  }),
  defineCourse({
    slug: "ler-livros-em-ingles",
    title: "Como ler livros em inglês?",
    cover: cover("leitura"),
    price: 150,
    status: "publicado",
    enrolled: 86,
    completed: 21,
    forWho: "Para quem quer ler por prazer, sem transformar cada página em exercício.",
    today: "Leitura interrompida, dicionário aberto o tempo todo e livros abandonados.",
    after: "Ler pelo sentido, escolher livros com autonomia e conversar sobre o que leu.",
    modules: [
      {
        title: "Como você lê hoje",
        summary: "Ponto de partida da leitura.",
        lessons: [
          { question: "Como eu leio hoje?", practice: "Linha de base: trecho lido em voz alta", minutes: 7, summary: "Um trecho lido em voz alta para comparar depois." },
          { question: "Como ler um livro em inglês sem parar a cada palavra?", conversation: "ler-um-livro", practice: "Registro de leitura", summary: "Ler pelo sentido, não palavra por palavra." },
        ],
      },
      {
        title: "Escolher e seguir lendo",
        summary: "Autonomia para o próximo livro.",
        lessons: [{ question: "Como escolher o próximo livro?", minutes: 10, summary: "Critérios para escolher sem depender de lista pronta." }],
      },
      {
        title: "Conversar sobre leitura",
        summary: "Da página para a fala.",
        lessons: [
          { question: "Como falar sobre o que eu li?", practice: "Áudio", minutes: 11, summary: "Contar a história e dar sua opinião sobre ela." },
          { question: "O que mudou na minha leitura?", practice: "Produção final", minutes: 8, summary: "Nova leitura em voz alta e comparação." },
        ],
      },
    ],
  }),
  defineCourse({
    slug: "autonomia-e-naturalidade",
    title: "Como construir mais autonomia e naturalidade em inglês?",
    cover: cover("estudo"),
    price: 180,
    status: "rascunho",
    enrolled: 0,
    completed: 0,
    forWho: "Para quem quer continuar evoluindo sem depender de aula ou correção o tempo todo.",
    today: "Dependência de correção e insegurança para praticar sozinho.",
    after: "Saber observar a própria fala e escolher o próximo passo.",
    modules: [
      {
        title: "Ponto de partida",
        summary: "Onde você depende de alguém.",
        lessons: [
          { question: "Onde eu dependo de alguém hoje?", practice: "Linha de base", minutes: 6 },
          { question: "Como parar de me cobrar o inglês perfeito?", conversation: "parar-de-me-cobrar" },
          { question: "Como observar minha própria fala?", minutes: 10 },
        ],
      },
    ],
  }),
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

/** Duração da aula: a da conversa ligada ou a definida na aula. */
export const lessonMinutes = (lesson: CourseLesson) =>
  (lesson.conversation ? getConversation(lesson.conversation)?.minutes : undefined) ?? lesson.minutes ?? 10;

/** Ofertas (preços do protótipo do site, ilustrativos). */
export const offers = {
  subscription: { name: "Materiais Exclusivos", price: 34.99 },
  conversationPack: { name: "Pacote de conversação", price: 200 },
  mentoring: { name: "Mentoria individual", price: 400 },
} as const;
