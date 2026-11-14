export type ExplorePlatform = "YouTube" | "TikTok" | "Instagram";
export type ExploreCategory = "TED Talks" | "Trabalho" | "Criatividade" | "Dia a dia";

export type ExploreItem = {
  id: string;
  platform: ExplorePlatform;
  category: ExploreCategory;
  title: string;
  creator: string;
  description: string;
  duration: string;
  level: "Iniciante" | "Intermediário";
  accent?: string;
  actionLabel: string;
  url: string;
  visual: "ideas" | "design" | "travel" | "routine";
};

/** Dados de demonstração. Depois entram fontes aprovadas, API do YouTube e curadoria. */
export const exploreItems: ExploreItem[] = [
  {
    id: "ted-ideas",
    platform: "YouTube",
    category: "TED Talks",
    title: "Where good ideas come from",
    creator: "TED",
    description: "Ideias, criatividade e como explicar um ponto de vista.",
    duration: "17 min",
    level: "Intermediário",
    accent: "Inglês americano",
    actionLabel: "Assistir no YouTube",
    url: "https://www.youtube.com/watch?v=NugRZGDbPFU",
    visual: "ideas",
  },
  {
    id: "ted-design",
    platform: "YouTube",
    category: "Criatividade",
    title: "The first secret of design is noticing",
    creator: "TED",
    description: "Uma conversa curta para ouvir inglês ligado a design e observação.",
    duration: "11 min",
    level: "Intermediário",
    accent: "Inglês americano",
    actionLabel: "Assistir no YouTube",
    url: "https://www.youtube.com/watch?v=QMTVik-3V2M",
    visual: "design",
  },
  {
    id: "tiktok-routine",
    platform: "TikTok",
    category: "Dia a dia",
    title: "Frases naturais para falar da sua rotina",
    creator: "Criador sugerido",
    description: "Abra no seu TikTok, assista até o fim e salve se fizer sentido para você.",
    duration: "1 min",
    level: "Iniciante",
    actionLabel: "Abrir no TikTok",
    url: "https://www.tiktok.com/search?q=easy%20english%20daily%20routine",
    visual: "routine",
  },
  {
    id: "instagram-travel",
    platform: "Instagram",
    category: "Dia a dia",
    title: "Inglês para viagens: perguntas que você realmente usa",
    creator: "Criador sugerido",
    description: "Uma busca para começar a deixar o seu Reels mais próximo dos seus interesses.",
    duration: "curto",
    level: "Iniciante",
    actionLabel: "Abrir no Instagram",
    url: "https://www.instagram.com/explore/search/keyword/?q=english%20travel%20tips",
    visual: "travel",
  },
];

export const exploreInterests = ["Design e criatividade", "Viagens e culturas", "Inglês para trabalho"];
