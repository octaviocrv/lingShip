/**
 * Endereços das páginas do site e da plataforma, num lugar só. Links internos usam estas
 * constantes em vez de texto solto, para que mudar uma rota não quebre links espalhados.
 *
 * `planned` são rotas previstas que ainda não existem: ficam aqui para orientar a evolução,
 * mas nenhum link deve apontar para elas antes de a página ser criada.
 */
const student = "/plataforma/aluno";
const teacher = "/plataforma/professora";

export const routes = {
  home: "/",
  auth: {
    login: "/login",
  },
  /** Plataforma (protótipo de demonstração, dados fictícios). */
  platform: {
    root: "/plataforma",
    student: {
      home: student,
      conversations: `${student}/conversas`,
      conversation: (slug: string) => `${student}/conversas/${slug}`,
      courses: `${student}/cursos`,
      course: (slug: string) => `${student}/cursos/${slug}`,
      /** aula do curso; `number` começa em 1 ("Aula 4") */
      lesson: (slug: string, number: number) => `${student}/cursos/${slug}/aulas/${number}`,
      journey: `${student}/percurso`,
      mentoring: `${student}/mentoria`,
      purchases: `${student}/compras`,
      settings: `${student}/configuracoes`,
    },
    teacher: {
      home: teacher,
      contents: `${teacher}/conteudos`,
      newContent: `${teacher}/conteudos/novo`,
      content: (slug: string) => `${teacher}/conteudos/${slug}`,
      courses: `${teacher}/cursos`,
      course: (slug: string) => `${teacher}/cursos/${slug}`,
      students: `${teacher}/alunos`,
      mentoring: `${teacher}/mentoria`,
    },
  },
  planned: {
    signUp: "/cadastro",
    forgotPassword: "/recuperar-senha",
  },
} as const;

/** Âncoras da home usadas fora dela (ex.: o login manda "Criar conta" para os planos). */
export const homeAnchors = {
  planos: `${routes.home}#planos`,
  contato: `${routes.home}#contato`,
} as const;
