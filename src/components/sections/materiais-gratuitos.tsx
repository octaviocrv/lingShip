import { Play } from "lucide-react";
import { Carousel, GRID_LG } from "@/components/ui/carousel";
import { cn } from "@/lib/cn";
import { ActionButton, Container, SectionHeading, Tag } from "@/components/ui/primitives";
import { materiais, materiaisSection, type Material } from "@/content/materiais";

export function MateriaisGratuitos() {
  return (
    <section id="materiais" className="py-14 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={materiaisSection.eyebrow}
          title={materiaisSection.title}
          description={materiaisSection.description}
        />

        <Carousel
          label="Materiais gratuitos"
          className="mt-10 lg:mt-14"
          trackClassName={cn(GRID_LG, "lg:grid-cols-4")}
        >
          {materiais.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </Carousel>

        <div
          data-reveal
          className="glass mt-10 flex flex-col gap-5 rounded-[1.5rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <p className="text-[0.92rem] leading-relaxed text-muted">{materiaisSection.newsletter.text}</p>
          <ActionButton className="shrink-0">{materiaisSection.newsletter.cta}</ActionButton>
        </div>
      </Container>
    </section>
  );
}

/**
 * Card de vídeo. Enquanto `material.video` estiver vazio, a área de cima é só o espaço
 * reservado para o vídeo (gradiente com botão de play, sem ação).
 */
function MaterialCard({ material }: { material: Material }) {
  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-card">
      <div
        className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-midnight via-purple to-rose"
        data-video-slot={material.id}
      >
        {/* espaço reservado para o vídeo: inserir o player aqui quando o vídeo existir */}
        <span
          aria-hidden
          className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full bg-orange text-midnight shadow-button transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 size-5 fill-current" aria-hidden />
          </span>
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.68rem] font-bold text-white">
          {material.duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Tag className="self-start">{material.category}</Tag>
        <h3 className="mt-4 text-[1.12rem] font-medium leading-snug">{material.title}</h3>
      </div>
    </article>
  );
}
