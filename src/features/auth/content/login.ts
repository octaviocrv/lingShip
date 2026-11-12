import { siteConfig } from "@/config/site";

/** Textos da tela de login (mesmos da referência "Tela de Login Lingship"). */
export const loginContent = {
  meta: {
    title: `Entrar | ${siteConfig.name}`,
    description: "Acesse a plataforma Lingship e participe da comunidade, das aulas e dos desafios.",
  },
  showcase: {
    titleLines: ["Pronto para", "continuar sua"],
    titleHighlight: "jornada em inglês?",
    description: "Acesse a plataforma e participe da comunidade, aulas e desafios.",
    image: {
      // cena mais aberta: a mesma da referência, para telas largas (16:9 e mais)
      wide: { src: "/images/auth/login-escrivaninha-ampla.jpg", width: 1672, height: 941 },
      // cena mais próxima: para telas mais quadradas (16:10 em tela cheia, 4:3), em que o painel fica alto
      close: { src: "/images/auth/login-escrivaninha-proxima.jpg", width: 1536, height: 1024 },
      alt: "Escrivaninha à luz de luminária com livros de inglês, caneca da Lingship e notebook",
    },
  },
  form: {
    eyebrow: "Entre na sua conta",
    title: "Boas-vindas de volta!",
    email: { label: "E-mail", placeholder: "Seu e-mail" },
    password: { label: "Senha", placeholder: "Sua senha" },
    forgotPassword: "Esqueceu sua senha?",
    submit: "Entrar",
    submitting: "Entrando...",
    divider: "Ou entre com",
    providers: { google: "Google", apple: "Apple" },
    signUpQuestion: "Não tem uma conta?",
    signUpCta: "Criar conta",
  },
  errors: {
    emailRequired: "Informe seu e-mail.",
    emailInvalid: "Confira o e-mail: ele precisa ter o formato nome@exemplo.com.",
    passwordRequired: "Informe sua senha.",
  },
  notices: {
    unavailable: `A plataforma da ${siteConfig.name} ainda está sendo preparada. Assim que o acesso abrir, você entra por aqui.`,
    passwordReset: `A recuperação de senha chega junto com a plataforma. Se precisar de ajuda agora, escreva para ${siteConfig.email}.`,
  },
} as const;
