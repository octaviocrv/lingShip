"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Clapperboard, Headphones, Laugh, Plane, Shirt, Sparkles, UsersRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { Btn, Card, Pill, ProgressBar } from "../../components/ui";

type Option = { id: string; label: string; note?: string };
type Question = { id: string; topic: string; prompt: string; help: string; options: Option[]; multiple?: boolean; followUps?: Record<string, Question[]> };

const topics = [
  { id: "music", label: "Música", note: "artistas, letras e shows", icon: Headphones, tone: "from-[#51337f] to-[#bd78b5]" },
  { id: "feed", label: "TikTok & memes", note: "o que prende sua atenção", icon: Laugh, tone: "from-[#f07138] to-[#f6b14f]" },
  { id: "screen", label: "Filmes, séries & games", note: "universos para maratonar", icon: Clapperboard, tone: "from-[#263d69] to-[#6d8dca]" },
  { id: "books", label: "Livros & ideias", note: "histórias, curiosidades e assuntos", icon: BookOpen, tone: "from-[#2c5e53] to-[#88af6f]" },
  { id: "travel", label: "Viagens & culturas", note: "lugares, comidas e pessoas", icon: Plane, tone: "from-[#b85e42] to-[#dda258]" },
  { id: "style", label: "Estilo & referências", note: "roupa, estética e vibe", icon: Shirt, tone: "from-[#834471] to-[#d092b7]" },
  { id: "social", label: "Rolês & rotina", note: "onde você se sente em casa", icon: UsersRound, tone: "from-[#b85e42] to-[#dda258]" },
] as const;

const questions: Record<string, Question> = {
  music: {
    id: "music-main", topic: "Música", prompt: "O que mais toca no seu fone?", help: "Pode marcar tudo que realmente entra na sua playlist.", multiple: true,
    options: ["Rock", "Indie", "Trap", "Funk", "Sertanejo", "MPB", "Pop", "Eletrônica", "Metal", "Pagode"].map((label) => ({ id: label.toLowerCase(), label })),
    followUps: {
      rock: [{ id: "music-rock", topic: "Música · Rock", prompt: "Tá, mas qual é a sua praia no rock?", help: "Escolha as bandas e fases que mais combinam com você.", multiple: true, options: ["Arctic Monkeys / The Strokes", "Pink Floyd / Led Zeppelin", "Linkin Park / Evanescence", "Nirvana / Foo Fighters", "Metallica / System of a Down", "Queen / The Beatles"].map((label) => ({ id: label, label })) }],
      indie: [{ id: "music-indie", topic: "Música · Indie", prompt: "Seu indie puxa mais para qual lado?", help: "Vale misturar uma ou mais fases.", multiple: true, options: ["The Neighbourhood / Cigarettes After Sex", "Lana Del Rey / Lorde", "Tame Impala / Mac DeMarco", "Phoebe Bridgers / Boygenius", "Mitski / Clairo", "Festivais e descobertas aleatórias"].map((label) => ({ id: label, label })) }],
      pop: [{ id: "music-pop", topic: "Música · Pop", prompt: "No pop, qual universo você abre sem pensar?", help: "Sem culpa de repetir artista no fone.", multiple: true, options: ["Taylor Swift", "Beyoncé / Rihanna", "Billie Eilish / Olivia Rodrigo", "Dua Lipa / Charli XCX", "Lady Gaga / Britney", "Pop brasileiro"].map((label) => ({ id: label, label })) }],
      trap: [{ id: "music-trap", topic: "Música · Trap", prompt: "Qual lado do trap te pega mais?", help: "Pode ser pelo som, estética ou as duas coisas.", multiple: true, options: ["Travis Scott / Don Toliver", "Matuê / Teto / WIU", "Drake / 21 Savage", "Playlists para treinar", "R&B e trap mais calmo", "Drill"].map((label) => ({ id: label, label })) }],
    },
  },
  feed: {
    id: "feed-main", topic: "TikTok & memes", prompt: "Seu algoritmo te conhece melhor que seus amigos?", help: "Marca o tipo de vídeo que faz você perder a noção do tempo.", multiple: true,
    options: ["Memes absurdos e humor nonsense", "Cortes de podcasts", "Fofocas e cultura pop", "Edits de filmes e personagens", "Futebol e memes esportivos", "Academia e humor fitness", "Moda, maquiagem e estética", "Games e humor nerd", "Vídeos de animais", "Humor ácido e irônico"].map((label) => ({ id: label, label })),
    followUps: {
      "Games e humor nerd": [{ id: "feed-games", topic: "TikTok & memes · Games", prompt: "Quando o assunto é game, onde você cai?", help: "Escolha seus mundos favoritos.", multiple: true, options: ["Valorant / CS2", "League of Legends", "FIFA / futebol virtual", "Minecraft / sandbox", "The Last of Us / jogos de história", "Nintendo / cozy games"].map((label) => ({ id: label, label })) }],
      "Edits de filmes e personagens": [{ id: "feed-edits", topic: "TikTok & memes · Edits", prompt: "Qual tipo de edit sempre te pega?", help: "Aqui vale assumir os favoritos.", multiple: true, options: ["Anti-heróis e vilões", "Romance e cenas de casal", "Animes", "Séries de época", "Marvel / DC", "Filmes cult"].map((label) => ({ id: label, label })) }],
    },
  },
  screen: {
    id: "screen-main", topic: "Filmes, séries & games", prompt: "Qual desses universos te prende por horas?", help: "Não é um teste de cinema: escolha os que você realmente reassiste ou comenta.", multiple: true,
    options: ["Christopher Nolan / Interestelar", "Tarantino / Pulp Fiction", "Marvel / DC", "Harry Potter / Senhor dos Anéis", "Friends / How I Met Your Mother", "Breaking Bad / Peaky Blinders", "Studio Ghibli / Animes", "Terror psicológico", "Comédias românticas", "Reality shows"].map((label) => ({ id: label, label })),
    followUps: {
      "Studio Ghibli / Animes": [{ id: "screen-anime", topic: "Filmes, séries & games · Anime", prompt: "Qual anime ou energia é mais sua?", help: "Pode marcar mais de um.", multiple: true, options: ["Studio Ghibli", "Shonen: Naruto / Jujutsu / One Piece", "Attack on Titan / mais intenso", "Romance e slice of life", "Haikyuu / esportes", "Ainda quero descobrir"].map((label) => ({ id: label, label })) }],
      "Reality shows": [{ id: "screen-reality", topic: "Filmes, séries & games · Reality", prompt: "Qual reality vira assunto no seu grupo?", help: "Sem julgamento por aqui.", multiple: true, options: ["BBB", "MasterChef", "The Circle / Love Is Blind", "Drag Race", "Casamento às Cegas Brasil", "Nenhum específico, só os melhores cortes"].map((label) => ({ id: label, label })) }],
    },
  },
  books: {
    id: "books-main", topic: "Livros & ideias", prompt: "Que tipo de assunto te faz abrir mais uma aba?", help: "Pode ser livro, podcast, documentário ou uma curiosidade aleatória.", multiple: true,
    options: ["Fantasia e mundos imaginários", "Romance e histórias de pessoas", "True crime e mistérios", "Psicologia e comportamento", "História e culturas", "Negócios e carreira", "Ciência e tecnologia", "Notícias e atualidades", "Quadrinhos e mangás", "Não sou da leitura, mas gosto de vídeos sobre isso"].map((label) => ({ id: label, label })),
    followUps: {
      "Fantasia e mundos imaginários": [{ id: "books-fantasy", topic: "Livros & ideias · Fantasia", prompt: "Qual portal você atravessaria primeiro?", help: "Escolha seus universos favoritos.", multiple: true, options: ["Harry Potter", "Senhor dos Anéis", "Percy Jackson", "Jogos Vorazes", "Bridgerton e romance de época", "Quero descobrir fantasias novas"].map((label) => ({ id: label, label })) }],
    },
  },
  travel: {
    id: "travel-main", topic: "Viagens & culturas", prompt: "Quando você pensa em viagem, qual é o melhor tipo de roteiro?", help: "Vale marcar mais de um — uma viagem pode ter praia, cidade e comida boa.", multiple: true,
    options: ["Cidade grande e vida noturna", "Praia e sossego", "Museus, história e arquitetura", "Comida local e mercados", "Trilha, montanha e natureza", "Shows e festivais", "Road trip", "Intercâmbio e conhecer gente", "Parques e destinos temáticos", "Ainda estou juntando referências"].map((label) => ({ id: label, label })),
    followUps: {
      "Intercâmbio e conhecer gente": [{ id: "travel-interchange", topic: "Viagens & culturas · Intercâmbio", prompt: "Para qual cenário você se imagina indo?", help: "Não é compromisso, é só uma referência sua.", multiple: true, options: ["Londres / Reino Unido", "Estados Unidos", "Canadá", "Austrália", "Irlanda", "Outro país para descobrir"].map((label) => ({ id: label, label })) }],
    },
  },
  style: {
    id: "style-main", topic: "Estilo & referências", prompt: "Se a gente abrisse seu guarda-roupa, qual seria a vibe?", help: "Pode combinar estilos. Ninguém cabe em uma estética só.", multiple: true,
    options: ["Streetwear / oversized", "Old money / clássico", "Alternativo / indie", "Esportivo / fitness", "Básico / minimalista", "Y2K / anos 2000", "Rock / grunge", "Praiano / natural", "Fashionista", "Casual / arrumadinho"].map((label) => ({ id: label, label })),
    followUps: {
      "Streetwear / oversized": [{ id: "style-street", topic: "Estilo · Streetwear", prompt: "Seu streetwear vai mais para onde?", help: "Escolha a referência que mais aparece no seu Pinterest ou feed.", multiple: true, options: ["Skate / urbano", "Tênis e sneaker culture", "Hip-hop e peças largas", "Techwear", "Vintage / brechó", "Básico com acessórios"].map((label) => ({ id: label, label })) }],
    },
  },
  social: {
    id: "social-main", topic: "Rolês & rotina", prompt: "Qual desses rolês tem mais a sua cara?", help: "Seu fim de semana pode ter mais de uma versão.", multiple: true,
    options: ["Resenha com os amigos", "Balada e festa", "Barzinho com música ao vivo", "Festival de música", "Café e livraria", "Cinema", "Futebol e churrasco", "Academia e esportes", "Trilha e natureza", "Jogar videogame com amigos", "Ficar em casa assistindo a alguma coisa"].map((label) => ({ id: label, label })),
  },
};

const STORAGE_KEY = "lingship-universe-quiz-v1";

export function UniverseQuiz() {
  const [chosenTopics, setChosenTopics] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);

  const queue = useMemo(() => chosenTopics.flatMap((topic) => {
    const root = questions[topic];
    const selected = answers[root.id] ?? [];
    return [root, ...selected.flatMap((option) => root.followUps?.[option] ?? [])];
  }), [chosenTopics, answers]);
  const complete = started && queue.length > 0 && queue.every((question) => (answers[question.id] ?? []).length > 0) && step >= queue.length;
  const current = queue[step];

  const persist = (nextTopics: string[], nextAnswers: Record<string, string[]>, nextStarted: boolean) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ chosenTopics: nextTopics, answers: nextAnswers, started: nextStarted }));
  const toggleTopic = (id: string) => setChosenTopics((currentTopics) => {
    const next = currentTopics.includes(id) ? currentTopics.filter((topic) => topic !== id) : [...currentTopics, id];
    persist(next, answers, started);
    return next;
  });
  const toggleAnswer = (question: Question, option: string) => setAnswers((currentAnswers) => {
    const values = currentAnswers[question.id] ?? [];
    const next = option === "none" ? (values.includes("none") ? [] : ["none"]) : question.multiple ? (values.includes(option) ? values.filter((value) => value !== option) : [...values.filter((value) => value !== "none"), option]) : [option];
    const nextAnswers = { ...currentAnswers, [question.id]: next };
    persist(chosenTopics, nextAnswers, started);
    return nextAnswers;
  });
  const reset = () => { setChosenTopics([]); setAnswers({}); setStarted(false); setStep(0); window.localStorage.removeItem(STORAGE_KEY); };

  if (!started) return <TopicPicker chosenTopics={chosenTopics} onToggle={toggleTopic} onStart={() => { setStarted(true); setStep(0); persist(chosenTopics, answers, true); }} />;
  if (complete) return <ProfileSummary answers={answers} onAdjust={() => setStep(0)} onReset={reset} />;
  if (!current) return <TopicPicker chosenTopics={chosenTopics} onToggle={toggleTopic} onStart={() => { setStarted(true); setStep(0); persist(chosenTopics, answers, true); }} />;

  const selected = answers[current.id] ?? [];
  const progress = Math.max(1, Math.round(((step + 2) / Math.max(queue.length + 1, 1)) * 100));
  return <section>
    <QuizIntro />
    <div className="mt-6 max-w-3xl"><div className="flex items-center justify-between gap-4 text-[0.76rem] font-semibold text-muted"><span>{current.topic}</span><span>Pergunta {step + 2} de {queue.length + 1}</span></div><ProgressBar value={progress} max={100} label="Progresso do quiz" className="mt-2" /></div>
    <Card className="mt-5 max-w-4xl">
      <h2 className="max-w-2xl font-serif text-[1.55rem] font-semibold leading-tight text-midnight">{current.prompt}</h2><p className="mt-2 text-[0.86rem] text-muted">{current.help}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {current.options.map((option) => <OptionCard key={option.id} option={option} selected={selected.includes(option.id)} onClick={() => toggleAnswer(current, option.id)} />)}
        <OptionCard option={{ id: "none", label: "Nenhuma dessas" }} selected={selected.includes("none")} onClick={() => toggleAnswer(current, "none")} />
      </div>
      <div className="mt-7 flex items-center justify-between gap-3 border-t border-hairline pt-5"><Btn variant="secondary" size="sm" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}><ArrowLeft aria-hidden />Voltar</Btn><Btn size="sm" disabled={!selected.length} onClick={() => setStep((value) => value + 1)}>{step + 1 === queue.length ? "Ver meu perfil" : "Continuar"}<ArrowRight aria-hidden /></Btn></div>
    </Card>
  </section>;
}

function QuizIntro() { return <Card className="relative overflow-hidden bg-midnight text-snow"><span aria-hidden className="absolute -right-9 -top-14 size-52 rounded-full bg-orange/25 blur-2xl" /><div className="relative max-w-2xl"><span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-orange">Seu universo</span><h2 className="mt-3 font-serif text-[1.6rem] font-semibold leading-tight text-snow">Vamos mapear o que faz sentido no seu mundo.</h2><p className="mt-2 text-[0.88rem] leading-relaxed text-snow/75">Perguntas rápidas e bem específicas. Você escolhe o que gosta; a LingShip só organiza suas referências para usar no futuro.</p></div></Card>; }

function TopicPicker({ chosenTopics, onToggle, onStart }: { chosenTopics: string[]; onToggle: (id: string) => void; onStart: () => void }) { return <section><QuizIntro /><div className="mt-6 flex items-center justify-between gap-4"><div><p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-purple">Pergunta 1</p><h3 className="mt-1 font-sans text-[0.95rem] font-semibold text-midnight">O que faz parte do seu mundo hoje?</h3><p className="mt-1 text-[0.8rem] text-muted">Marque tudo que combina com você. Nas próximas perguntas, o quiz aprofunda apenas o que você selecionar.</p></div><Pill tone="purple">{chosenTopics.length} assuntos</Pill></div><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{topics.map((topic) => { const selected = chosenTopics.includes(topic.id); const Icon = topic.icon; return <button key={topic.id} type="button" aria-pressed={selected} onClick={() => onToggle(topic.id)} className={cn("relative min-h-36 overflow-hidden rounded-box p-4 text-left text-white shadow-card transition hover:-translate-y-0.5", `bg-gradient-to-br ${topic.tone}`, selected ? "ring-3 ring-orange ring-offset-2 ring-offset-canvas" : "opacity-90 hover:opacity-100")}><Icon aria-hidden className="absolute -bottom-4 -right-3 size-24 text-white/10" /><span className={cn("relative grid size-8 place-items-center rounded-full border", selected ? "border-orange bg-orange text-midnight" : "border-white/30 bg-white/10")}>{selected ? <Check aria-hidden className="size-4" /> : <Icon aria-hidden className="size-4" />}</span><span className="relative mt-5 block font-serif text-[1.15rem] font-semibold">{topic.label}</span><span className="relative mt-1 block text-[0.74rem] text-white/75">{topic.note}</span></button>; })}</div><div className="mt-5 flex justify-end"><Btn disabled={!chosenTopics.length} onClick={onStart}>Continuar o quiz<ArrowRight aria-hidden /></Btn></div></section>; }

function OptionCard({ option, selected, onClick }: { option: Option; selected: boolean; onClick: () => void }) { return <button type="button" aria-pressed={selected} onClick={onClick} className={cn("flex min-h-16 cursor-pointer items-center justify-between gap-3 rounded-tile border p-4 text-left transition", selected ? "border-purple bg-surface text-purple" : "border-hairline bg-card text-ink hover:border-purple/35 hover:bg-snow")}><span className="text-[0.86rem] font-semibold">{option.label}</span><span className={cn("grid size-5 shrink-0 place-items-center rounded-full border", selected ? "border-purple bg-purple text-white" : "border-hairline bg-canvas text-transparent")}><Check aria-hidden className="size-3" /></span></button>; }

function ProfileSummary({ answers, onAdjust, onReset }: { answers: Record<string, string[]>; onAdjust: () => void; onReset: () => void }) { const values = Object.values(answers).flat().filter((value) => value !== "none"); return <section><QuizIntro /><Card className="mt-6"><div className="flex items-start gap-3"><span className="grid size-11 place-items-center rounded-tile bg-surface text-purple"><Sparkles aria-hidden className="size-5" /></span><div><p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-purple">Perfil em construção</p><h2 className="mt-1 font-serif text-[1.35rem] font-semibold">Suas referências foram registradas</h2></div></div><p className="mt-4 text-[0.86rem] leading-relaxed text-muted">Nada aqui define quem você é ou como deve estudar. São dados estruturados para você atualizar quando quiser e, no futuro, encontrar conteúdos ligados ao seu universo.</p><div className="mt-5 flex flex-wrap gap-2">{values.map((value) => <Pill key={value} tone="purple">{value}</Pill>)}</div><div className="mt-6 flex flex-wrap gap-2.5"><Btn variant="secondary" onClick={onAdjust}>Ajustar respostas</Btn><Btn variant="ghost" onClick={onReset}>Refazer quiz</Btn></div></Card></section>; }
