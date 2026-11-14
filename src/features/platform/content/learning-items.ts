/** Dados fictícios para validar a separação entre materiais de consulta e exercícios. */
export type MaterialKind = "arquivo" | "leitura" | "link";

export const studentMaterials = [
  {
    id: "material-01",
    title: "Mapa para organizar uma história",
    description: "Roteiro curto para preparar uma história sem decorar frase por frase.",
    kind: "arquivo" as MaterialKind,
    format: "PDF · 3 páginas",
    source: "Aula de 12 nov",
    category: "Da sua aula",
    addedAt: "Adicionado hoje",
  },
  {
    id: "material-02",
    title: "Expressões para ganhar tempo ao falar",
    description: "Lista de expressões para pausar, reorganizar a ideia e continuar a conversa.",
    kind: "arquivo" as MaterialKind,
    format: "PDF · 2 páginas",
    source: "Preparado pela Vanessa",
    category: "Da sua aula",
    addedAt: "Adicionado em 10 nov",
  },
  {
    id: "material-03",
    title: "Como dar mais detalhe às respostas",
    description: "Leitura de apoio para explorar camadas, exemplos e comparações.",
    kind: "leitura" as MaterialKind,
    format: "Texto · 6 min de leitura",
    source: "Biblioteca LingShip",
    category: "Biblioteca",
    addedAt: "Disponível no seu acesso",
  },
  {
    id: "material-04",
    title: "Playlist: pessoas contando experiências",
    description: "Vídeos curtos para observar como falantes organizam uma história.",
    kind: "link" as MaterialKind,
    format: "Links externos",
    source: "Indicação da Vanessa",
    category: "Biblioteca",
    addedAt: "Disponível no seu acesso",
  },
] as const;

export type ExerciseStatus = "para-fazer" | "enviado" | "concluido";

export const studentExercises = [
  {
    id: "exercise-01",
    title: "Conte uma história curta do seu fim de semana",
    instruction: "Grave um áudio de até 2 minutos. Use o mapa da aula para escolher início, detalhe e fechamento.",
    type: "Produção em áudio",
    source: "Aula de 12 nov",
    status: "para-fazer" as ExerciseStatus,
    month: "Novembro de 2026",
    due: "Entregar até segunda, 17 nov",
    assignedAt: "12 nov",
    delivery: "Áudio ou vídeo curto",
  },
  {
    id: "exercise-02",
    title: "Escolha duas expressões para experimentar",
    instruction: "Anote em que situação você quer usar cada expressão nesta semana.",
    type: "Prática breve",
    source: "Sugestão revisada pela Vanessa",
    status: "para-fazer" as ExerciseStatus,
    month: "Novembro de 2026",
    due: "Entregar até quarta, 19 nov",
    assignedAt: "12 nov",
    delivery: "Foto, PDF ou texto escaneado",
  },
  {
    id: "exercise-03",
    title: "Minha apresentação profissional",
    instruction: "Envie um áudio falando sobre sua área e o que você faz no trabalho.",
    type: "Produção em áudio",
    source: "Aula de 5 nov",
    status: "enviado" as ExerciseStatus,
    month: "Novembro de 2026",
    due: "Enviado em 8 nov",
    assignedAt: "5 nov",
    delivery: "Áudio ou vídeo curto",
  },
  {
    id: "exercise-04",
    title: "Detalhes que fazem diferença",
    instruction: "Transforme três respostas curtas em respostas com mais contexto.",
    type: "Exercício escrito",
    source: "Aula de 29 out",
    status: "concluido" as ExerciseStatus,
    month: "Outubro de 2026",
    due: "Concluído em 3 nov",
    assignedAt: "29 out",
    delivery: "Foto, PDF ou texto escaneado",
  },
] as const;

export type StudentExercise = (typeof studentExercises)[number];

export function getStudentExercise(id: string): StudentExercise | undefined {
  return studentExercises.find((exercise) => exercise.id === id);
}
