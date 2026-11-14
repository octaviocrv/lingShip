/** Comunicados fictícios para validar o quadro de recados da home do aluno. */
export const announcements = [
  {
    id: "holiday",
    kind: "calendario",
    audience: "Para todos",
    title: "Feriado: não teremos aulas em 20 de novembro",
    text: "As aulas daquela quinta serão remarcadas diretamente com cada aluna.",
    date: "Aviso de calendário",
  },
  {
    id: "vacation",
    kind: "ferias",
    audience: "Para todos",
    title: "Recesso da Vanessa: 23 de dezembro a 6 de janeiro",
    text: "As aulas voltam na semana do dia 7. Materiais e gravações continuam disponíveis normalmente.",
    date: "Planeje suas entregas",
  },
  {
    id: "platform",
    kind: "plataforma",
    audience: "Novidade na plataforma",
    title: "Agora você pode enviar exercícios por aqui",
    text: "Envie foto do caderno, PDF, áudio ou vídeo direto na página de cada atividade.",
    date: "Atualização recente",
  },
  {
    id: "personal",
    kind: "pessoal",
    audience: "Recado para você",
    title: "Sua próxima aula ainda será confirmada",
    text: "Assim que a Vanessa confirmar o horário, ele aparecerá em Minhas aulas.",
    date: "Acompanhamento individual",
  },
] as const;
