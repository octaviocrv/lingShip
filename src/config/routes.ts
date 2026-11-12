/**
 * Endereços das páginas do site e da plataforma, num lugar só. Links internos usam estas
 * constantes em vez de texto solto, para que mudar uma rota não quebre links espalhados.
 *
 * `planned` são rotas previstas que ainda não existem: ficam aqui para orientar a evolução,
 * mas nenhum link deve apontar para elas antes de a página ser criada.
 */
export const routes = {
  home: "/",
  auth: {
    login: "/login",
  },
  planned: {
    signUp: "/cadastro",
    forgotPassword: "/recuperar-senha",
    platform: "/plataforma",
  },
} as const;

/** Âncoras da home usadas fora dela (ex.: o login manda "Criar conta" para os planos). */
export const homeAnchors = {
  planos: `${routes.home}#planos`,
  contato: `${routes.home}#contato`,
} as const;
