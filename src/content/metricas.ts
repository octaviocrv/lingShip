/**
 * Métricas da faixa "Nossos números", logo abaixo do hero.
 * ATENÇÃO: valores PROVISÓRIOS (mocados). Trocar pelos números reais assim que a Vanessa passar.
 * `value` é só o número; `suffix` é o sinal que vem depois (+, %).
 */
export const metricasSection = {
  eyebrow: "Nossos números",
  title: "Uma comunidade que cresce falando.",
  // Uma imagem por pessoa (mesmo tamanho): geradas do recorte pessoas-se-divertindo-semfundo.
  people: [
    { src: "/fotos/pessoa-1.webp" },
    { src: "/fotos/pessoa-2.webp" },
    { src: "/fotos/pessoa-3.webp" },
  ] as [{ src: string }, { src: string }, { src: string }],
  photo: {
    alt: "Grupo de estudantes da comunidade Lingship sorrindo e se divertindo juntos",
  },
  description:
    "Cada número aqui nasce de estudantes que praticam, se encontram e ganham segurança para se comunicar em inglês. Juntos, a gente marca passos que definem a nossa jornada.",
};

export const metricas: { value: number; suffix: string; label: string }[] = [
  { value: 500, suffix: "+", label: "Estudantes na comunidade" },
  { value: 12, suffix: "", label: "Aulas ao vivo por ano" },
  { value: 80, suffix: "+", label: "Materiais e vídeos" },
  { value: 95, suffix: "%", label: "Recomendam a Lingship" },
];
