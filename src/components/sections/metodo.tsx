import { ArrowRight } from "lucide-react";
import { Container, IconBadge, LinkButton, SectionHeading } from "@/components/ui/primitives";
import { metodoSection, passos } from "@/content/metodo";

export function Metodo() {
  return (
    <section id="metodo" className="relative bg-lilac/50 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={metodoSection.eyebrow}
          title={metodoSection.title}
          description={metodoSection.description}
          layout="stack"
        />

        <ol data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {passos.map((passo, i) => (
            <li key={passo.title} className="glass flex flex-col rounded-card p-6">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-ink/70">
                Passo {String(i + 1).padStart(2, "0")}
              </p>
              <IconBadge icon={passo.icon} className="mt-5" />
              <h3 className="mt-5 text-[1.15rem] font-medium">{passo.title}</h3>
              <p className="mt-3 text-[0.86rem] leading-[1.8] text-muted">{passo.description}</p>
            </li>
          ))}
        </ol>

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
