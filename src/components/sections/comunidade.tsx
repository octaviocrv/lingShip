import { Presentation, Quote } from "lucide-react";
import { Container, IconBadge, Initials, LinkButton, SectionHeading } from "@/components/ui/primitives";
import { apresentacoes, comunidadeSection, depoimentos } from "@/content/comunidade";

/** "Comunidade viva": apresentações (faixa que desliza) + "Vozes da comunidade". */
export function Comunidade() {
  return (
    <section id="comunidade" className="overflow-hidden py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={comunidadeSection.eyebrow}
          title={comunidadeSection.title}
          description={comunidadeSection.description}
        />

        {/* Apresentações: desliza na horizontal ("Deslize para ver algumas apresentações") */}
        <ul
          data-reveal
          aria-label="Apresentações da comunidade"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mt-14"
        >
          {apresentacoes.map((pessoa) => (
            <li
              key={pessoa.name}
              className="glass flex w-[82%] shrink-0 snap-start flex-col rounded-card p-7 sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <IconBadge icon={Presentation} />
              <p className="mt-6 flex-1 text-[0.92rem] leading-[1.85] text-muted">{pessoa.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <Initials>{pessoa.initials}</Initials>
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">{pessoa.name}</p>
                  <p className="text-[0.76rem] text-purple">{pessoa.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Vozes da comunidade */}
        <p data-reveal className="mt-20 text-eyebrow font-bold uppercase text-purple">
          {comunidadeSection.voicesTitle}
        </p>
        <ul data-reveal-group className="mt-8 grid gap-5 md:grid-cols-3">
          {depoimentos.map((pessoa) => (
            <li key={pessoa.name} className="glass flex flex-col rounded-card p-7">
              <Quote className="size-7 fill-orange text-orange" aria-hidden />
              <blockquote className="mt-5 flex-1 text-[0.92rem] leading-[1.85] text-muted">{pessoa.quote}</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <Initials>{pessoa.initials}</Initials>
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">{pessoa.name}</p>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">{pessoa.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

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
