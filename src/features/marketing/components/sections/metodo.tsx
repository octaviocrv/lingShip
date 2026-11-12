import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { GRID_LG } from "@/components/ui/carousel-grid";
import { Container, IconBadge, LinkButton, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { metodoSection, passos } from "@/features/marketing/content/metodo";

export function Metodo() {
  return (
    <section id="metodo" className="relative bg-lilac/60 py-14 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={metodoSection.eyebrow}
          title={metodoSection.title}
          description={metodoSection.description}
          layout="stack"
        />

        <Carousel label="Os 5 passos do método" className="mt-10 lg:mt-14" trackClassName={cn(GRID_LG, "lg:grid-cols-5")}>
          {passos.map((passo, i) => (
            <div key={passo.title} className="glass flex h-full flex-col overflow-hidden rounded-card">
              {/* foto do passo, com o ícone pousando na borda */}
              <div className="relative aspect-[4/3]">
                {/* o corte da foto fica só nesta camada, para o ícone poder passar da borda */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={passo.image.src}
                    alt={passo.image.alt}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: passo.image.position }}
                  />
                </div>
                <IconBadge
                  icon={passo.icon}
                  className="absolute bottom-0 left-5 z-10 translate-y-1/2 bg-white text-purple shadow-[0_8px_24px_rgb(43_33_64/0.18)] ring-4 ring-white/70"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-11">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-ink/70">
                  Passo {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[1.15rem] font-medium">{passo.title}</h3>
                <p className="mt-3 text-[0.86rem] leading-[1.8] text-muted">{passo.description}</p>
              </div>
            </div>
          ))}
        </Carousel>

        <div data-reveal className="mt-10">
          <LinkButton href={metodoSection.cta.href}>
            {metodoSection.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
