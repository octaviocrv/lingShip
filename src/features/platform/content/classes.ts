/** Dados fictícios para validar a futura área de aulas particulares. */
export const classPlan = {
  name: "Acompanhamento individual",
  cadence: "2 aulas por semana",
  duration: "50 minutos por aula",
  cycle: "Ciclo atual · novembro a dezembro de 2026",
  schedule: [
    { day: "Segunda", time: "19h às 19h50", detail: "Aula individual online" },
    { day: "Quarta", time: "19h às 19h50", detail: "Aula individual online" },
  ],
  attendance: { attended: 7, planned: 8, label: "87% de presença neste ciclo" },
};

export const classRecordings = [
  {
    month: "Novembro de 2026",
    items: [
      {
        date: "12 nov",
        title: "Organizando ideias antes de falar",
        summary: "Praticamos como sair da resposta curta e organizar uma ideia em começo, detalhe e fechamento.",
        topics: ["Estrutura da história", "Conectores", "Pausa para pensar"],
        duration: "50 min",
        status: "Disponível",
        youtubeId: "H_qJsD17kwI",
      },
      {
        date: "10 nov",
        title: "Contando histórias do fim de semana",
        summary: "Falamos de experiências recentes e trabalhamos mais detalhes para deixar a conversa mais viva.",
        topics: ["Passado", "Detalhes", "Perguntas de retorno"],
        duration: "48 min",
        status: "Disponível",
        youtubeId: "Rh8zNJkVyLc",
      },
      {
        date: "05 nov",
        title: "Como explicar seu trabalho",
        summary: "Montamos uma apresentação simples sobre a área de atuação e testamos formas de explicar a rotina.",
        topics: ["Apresentação profissional", "Vocabulário da área", "Exemplos"],
        duration: "51 min",
        status: "Disponível",
        youtubeId: "H_qJsD17kwI",
      },
    ],
  },
  {
    month: "Outubro de 2026",
    items: [
      {
        date: "29 out",
        title: "Detalhes que deixam a fala mais viva",
        summary: "Exploramos como usar comparação, exemplo e descrição para desenvolver uma resposta.",
        topics: ["Comparações", "Descrição", "Exemplos pessoais"],
        duration: "49 min",
        status: "Disponível",
        youtubeId: "Rh8zNJkVyLc",
      },
      {
        date: "27 out",
        title: "Linha de base: apresentação pessoal",
        summary: "Registramos uma primeira apresentação para reconhecer o ponto de partida e escolher um foco de prática.",
        topics: ["Apresentação", "Objetivo pessoal", "Ponto de partida"],
        duration: "52 min",
        status: "Disponível",
        youtubeId: "H_qJsD17kwI",
      },
    ],
  },
] as const;
