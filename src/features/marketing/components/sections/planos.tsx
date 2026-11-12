import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";
import { GRID_LG } from "@/components/ui/carousel-grid";
import { ActionButton, Container, LinkButton, SectionHeading, Tag } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { planos, planosSection } from "@/features/marketing/content/planos";

export function Planos() {
  return (
    <section id="planos" className="bg-lilac/60 py-14 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={planosSection.eyebrow}
          title={planosSection.title}
          description={planosSection.description}
        />

        <Carousel
          label="Planos e pacotes"
          className="mt-10 lg:mt-14"
          trackClassName={cn(GRID_LG, "lg:grid-cols-2 xl:grid-cols-4")}
        >
          {planos.map((plano) => (
            <div key={plano.id} className="glass flex h-full flex-col rounded-card p-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.1rem] bg-surface">
                <Image
                  src={plano.photo.src}
                  alt={plano.photo.alt}
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <Tag className="self-start">{plano.label}</Tag>
                <h3 className="mt-4 text-[1.3rem] font-medium">{plano.name}</h3>
                <p className="mt-3 flex-1 text-[0.86rem] leading-[1.8] text-muted">{plano.description}</p>
                <p className="mt-6 font-serif text-[1.9rem] font-medium text-ink">{plano.price}</p>
                <ActionButton className="mt-5 self-start">{plano.cta}</ActionButton>
              </div>
            </div>
          ))}
        </Carousel>

        <div
          data-reveal
          className="glass mt-10 flex flex-col gap-5 rounded-[1.5rem] px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <p className="text-[0.92rem] leading-[1.85] text-muted">
            <strong className="font-semibold text-ink">{planosSection.liveClass.lead}</strong>{" "}
            {planosSection.liveClass.text}
          </p>
          <LinkButton href={planosSection.liveClass.cta.href} className="shrink-0 self-start lg:self-auto">
            {planosSection.liveClass.cta.label}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
