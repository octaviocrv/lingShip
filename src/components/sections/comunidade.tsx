import { Presentation, Quote } from "lucide-react";
import { Carousel, GRID_LG } from "@/components/ui/carousel";
import { Container, IconBadge, Initials, LinkButton, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { apresentacoes, comunidadeSection, depoimentos } from "@/content/comunidade";

/** "Comunidade viva": apresentações (faixa que desliza) + "Vozes da comunidade". */
export function Comunidade() {
  return (
    <section id="comunidade" className="overflow-hidden py-14 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={comunidadeSection.eyebrow}
          title={comunidadeSection.title}
          description={comunidadeSection.description}
        />

        {/* Apresentações: desliza na horizontal ("Deslize para ver algumas apresentações") */}
        {/* no desktop continua a faixa que desliza (3 por vez); no celular ganha pontos e setas */}
        <Carousel
          label="Apresentações da comunidade"
          reveal="block"
          className="mt-10 lg:mt-14"
          trackClassName="lg:gap-5 lg:pb-4 lg:pt-0"
          slideClassName="lg:w-[calc((100%-2.5rem)/3)] lg:snap-start"
        >
          {apresentacoes.map((pessoa) => (
            <div key={pessoa.name} className="glass flex h-full flex-col rounded-card p-7">
              <IconBadge icon={Presentation} />
              <p className="mt-6 flex-1 text-[0.92rem] leading-[1.85] text-muted">{pessoa.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <Initials>{pessoa.initials}</Initials>
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">{pessoa.name}</p>
                  <p className="text-[0.76rem] text-purple">{pessoa.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Vozes da comunidade */}
        <p data-reveal className="mt-14 text-eyebrow font-bold uppercase text-purple sm:mt-20">
          {comunidadeSection.voicesTitle}
        </p>
        <Carousel label="Vozes da comunidade" className="mt-8" trackClassName={cn(GRID_LG, "lg:grid-cols-3")}>
          {depoimentos.map((pessoa) => (
            <div key={pessoa.name} className="glass flex h-full flex-col rounded-card p-7">
              <Quote className="size-7 fill-orange text-orange" aria-hidden />
              <blockquote className="mt-5 flex-1 text-[0.92rem] leading-[1.85] text-muted">{pessoa.quote}</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <Initials>{pessoa.initials}</Initials>
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">{pessoa.name}</p>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">{pessoa.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div
          data-reveal
          className="glass mt-10 flex flex-col gap-5 rounded-[1.5rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <p className="text-[0.92rem] leading-relaxed text-muted">{comunidadeSection.cta.text}</p>
          <LinkButton href={comunidadeSection.cta.href} className="shrink-0">
            {comunidadeSection.cta.label}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
