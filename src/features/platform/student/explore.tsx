"use client";

import { useMemo, useState } from "react";
import { Bookmark, Camera, Check, ExternalLink, Heart, Lightbulb, Play, Sparkles, Target, Video } from "lucide-react";
import { exploreInterests, exploreItems, type ExploreCategory, type ExploreItem } from "../content/explore";
import { Btn, Card, IconTile, PageHeader, Pill } from "../components/ui";
import { cn } from "@/lib/cn";

const filters: Array<"Todos" | ExploreCategory | "Salvos"> = ["Todos", "TED Talks", "Criatividade", "Dia a dia", "Salvos"];

function PlatformIcon({ platform }: { platform: ExploreItem["platform"] }) {
  if (platform === "YouTube") return <Video aria-hidden className="size-4 text-[#e53935]" />;
  if (platform === "Instagram") return <Camera aria-hidden className="size-4 text-[#bc3aa4]" />;
  return <span aria-hidden className="grid size-4 place-items-center rounded-[4px] bg-ink text-[8px] font-bold text-white">♪</span>;
}

const visualStyle: Record<ExploreItem["visual"], string> = {
  ideas: "bg-[radial-gradient(circle_at_75%_20%,rgb(249_115_22/.9),transparent_19%),linear-gradient(135deg,#33234c,#7650b7)]",
  design: "bg-[radial-gradient(circle_at_24%_75%,rgb(249_115_22/.95),transparent_21%),linear-gradient(135deg,#6d3fc0,#f1e9fb)]",
  travel: "bg-[radial-gradient(circle_at_72%_24%,rgb(255_255_255/.75),transparent_18%),linear-gradient(135deg,#5b3f9c,#e79259)]",
  routine: "bg-[radial-gradient(circle_at_25%_25%,rgb(249_115_22/.9),transparent_17%),linear-gradient(135deg,#2b2140,#be8fe9)]",
};

/** Primeira visão do feed. As ações são locais; integrações e perfil real entram na próxima etapa. */
export function Explore() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [saved, setSaved] = useState<string[]>([]);
  const [missionDone, setMissionDone] = useState<string[]>([]);

  const items = useMemo(() => {
    if (filter === "Todos") return exploreItems;
    if (filter === "Salvos") return exploreItems.filter((item) => saved.includes(item.id));
    return exploreItems.filter((item) => item.category === filter);
  }, [filter, saved]);

  const toggleSave = (id: string) => setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const toggleMission = (id: string) => setMissionDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <>
      <PageHeader
        eyebrow="Primeira versão · conteúdo demonstrativo"
        title="Explorar"
        description="Descubra inglês que combina com você e leve esse interesse para o seu feed nas redes."
      />

      <section className="mb-7 grid gap-5 xl:grid-cols-[1.5fr_.9fr]">
        <Card className="relative overflow-hidden bg-midnight text-snow">
          <span aria-hidden className="absolute -right-8 -top-10 size-48 rounded-full bg-orange/20 blur-2xl" />
          <div className="relative">
            <Pill tone="solid" icon={Sparkles}>Para você</Pill>
            <h2 className="mt-4 max-w-xl font-serif text-[1.6rem] font-semibold leading-tight text-snow">Seu inglês pode aparecer mais no que você já gosta de ver.</h2>
            <p className="mt-2 max-w-2xl text-[0.88rem] leading-relaxed text-snow/75">Começamos com design, viagens e trabalho. Em breve, você poderá ajustar seus interesses aqui.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {exploreInterests.map((interest) => <span key={interest} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.74rem] font-semibold">{interest}</span>)}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <IconTile icon={Target} tone="orange" />
            <div><p className="font-semibold text-midnight">Treine seu feed</p><p className="mt-1 text-[0.8rem] leading-relaxed text-muted">Ações simples nas redes ajudam a mostrar que você quer mais inglês.</p></div>
          </div>
          <div className="mt-4 space-y-2.5">
            {["Abra 1 indicação no TikTok ou Instagram", "Assista a um vídeo em inglês até o fim", "Salve um conteúdo para rever"].map((label, index) => {
              const id = `mission-${index}`;
              const done = missionDone.includes(id);
              return <button key={id} type="button" onClick={() => toggleMission(id)} className="flex w-full cursor-pointer items-center gap-2.5 rounded-tile p-2 text-left text-[0.78rem] text-ink transition hover:bg-surface">
                <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border", done ? "border-success bg-success text-white" : "border-hairline bg-canvas text-transparent")}>{done && <Check aria-hidden className="size-3" />}</span>{label}
              </button>;
            })}
          </div>
        </Card>
      </section>

      <div role="tablist" aria-label="Filtrar indicações" className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={cn("h-9 shrink-0 cursor-pointer rounded-full px-4 text-[0.78rem] font-semibold transition", filter === item ? "bg-midnight text-snow" : "bg-card text-ink shadow-card hover:bg-surface")}>{item}{item === "Salvos" && saved.length ? ` · ${saved.length}` : ""}</button>)}
      </div>

      {items.length ? <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Indicações para explorar">
        {items.map((item) => {
          const isSaved = saved.includes(item.id);
          return <Card key={item.id} as="article" className="group flex min-h-[390px] flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-card-hover">
            <div className={cn("relative flex h-40 items-end p-5", visualStyle[item.visual])}>
              <Pill tone="dark"><PlatformIcon platform={item.platform} />{item.platform}</Pill>
              <span className="absolute inset-0 bg-gradient-to-t from-midnight/45 to-transparent" />
              <span className="relative ml-auto flex size-10 items-center justify-center rounded-full bg-white/90 text-midnight shadow-sm"><Play aria-hidden className="ml-0.5 size-4 fill-current" /></span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-3"><Pill tone="purple">{item.category}</Pill><span className="text-[0.72rem] font-medium text-muted">{item.duration}</span></div>
              <h2 className="mt-4 font-serif text-[1.2rem] font-semibold leading-snug text-midnight">{item.title}</h2>
              <p className="mt-1 text-[0.78rem] font-semibold text-purple">{item.creator}</p>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{item.description}</p>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-hairline pt-4"><span className="text-[0.72rem] text-muted">{item.level}{item.accent ? ` · ${item.accent}` : ""}</span><button type="button" aria-label={isSaved ? "Remover dos salvos" : "Salvar indicação"} onClick={() => toggleSave(item.id)} className={cn("grid size-9 cursor-pointer place-items-center rounded-full transition", isSaved ? "bg-orange text-midnight" : "bg-surface text-purple hover:bg-lilac")}><Bookmark aria-hidden className={cn("size-4", isSaved && "fill-current")} /></button></div>
              <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-midnight px-4 text-[0.78rem] font-semibold text-snow transition hover:bg-ink-deep">{item.actionLabel}<ExternalLink aria-hidden className="size-3.5" /></a>
            </div>
          </Card>;
        })}
      </section> : <Card className="flex flex-col items-center py-12 text-center"><span className="grid size-12 place-items-center rounded-full bg-surface text-purple"><Heart aria-hidden className="size-5" /></span><h2 className="mt-4 font-serif text-[1.2rem] font-semibold">Ainda não há indicações salvas</h2><p className="mt-2 max-w-sm text-[0.84rem] leading-relaxed text-muted">Quando encontrar algo que quer rever, use o ícone de salvar. Ele vai aparecer aqui.</p><Btn variant="soft" size="sm" className="mt-5" onClick={() => setFilter("Todos")}>Ver indicações</Btn></Card>}

      <Card className="mt-7 flex gap-4 border border-dashed border-purple/25 bg-surface/45"><IconTile icon={Lightbulb} tone="purple" /><p className="text-[0.82rem] leading-relaxed text-muted"><strong className="font-semibold text-midnight">Como esta versão vai evoluir:</strong> hoje são sugestões demonstrativas. Depois, a LingShip pode conectar canais aprovados do YouTube, perguntar seus interesses e usar IA para classificar conteúdos antes de indicar.</p></Card>
    </>
  );
}
