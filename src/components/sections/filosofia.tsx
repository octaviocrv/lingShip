import Image from "next/image";
import { Check, FileText } from "lucide-react";
import { Carousel, GRID_LG } from "@/components/ui/carousel";
import { ActionButton, Container, Eyebrow, IconBadge, LinkButton } from "@/components/ui/primitives";
import { baseTitle, filosofiaSection, formacao } from "@/content/filosofia";
import { cn } from "@/lib/cn";

/** "Minha filosofia sobre educação" + formação da Vanessa (âncora "Sobre" do menu). */
export function Filosofia() {
  return (
    <section id="sobre" className="relative overflow-hidden py-14 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div data-reveal>
            <Eyebrow className="max-lg:justify-center">{filosofiaSection.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-title font-medium max-lg:text-center">{filosofiaSection.title}</h2>

            <div className="mt-8 space-y-6 text-[0.95rem] leading-[1.95] text-muted">
              {filosofiaSection.paragraphs.map((paragraph, i) => (
                <p key={i}>
                  {paragraph.map((trecho, j) =>
                    "strong" in trecho && trecho.strong ? (
                      <strong key={j} className="font-semibold text-ink">
                        {trecho.text}
                      </strong>
                    ) : (
                      <span key={j}>{trecho.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ActionButton variant="ghost">
                <FileText className="size-4 text-orange" aria-hidden />
                {filosofiaSection.curriculumCta}
              </ActionButton>
              <LinkButton href={filosofiaSection.plansCta.href}>{filosofiaSection.plansCta.label}</LinkButton>
            </div>
          </div>

          {/* Foto em arco, como no protótipo */}
          <div data-reveal="zoom" className="relative mx-auto w-full max-w-[440px] lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-ink shadow-soft">
              <Image
                src={filosofiaSection.photo.src}
                alt={filosofiaSection.photo.alt}
                fill
                quality={85}
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover object-[58%_30%]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-[1.6rem] border border-white/25"
              />
            </div>
          </div>
        </div>

        {/* A base que sustenta esse olhar */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <p data-reveal className="text-eyebrow font-bold uppercase text-purple max-lg:text-center">
            {baseTitle}
          </p>
          <Carousel label="Formação" className="mt-8" trackClassName={cn(GRID_LG, "lg:grid-cols-4")}>
            {formacao.map((bloco) => (
              <div
                key={bloco.title}
                className={cn(
                  "flex h-full flex-col rounded-card p-7",
                  bloco.featured ? "bg-midnight text-white shadow-soft" : "glass",
                )}
              >
                <IconBadge icon={bloco.icon} className={cn(bloco.featured && "bg-white/15 text-white")} />
                <h3 className={cn("mt-5 text-[1.15rem] font-medium", bloco.featured && "text-white")}>
                  {bloco.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {bloco.items.map((item) => (
                    <li
                      key={item.name}
                      className={cn("flex gap-2.5 text-[0.86rem] leading-snug", bloco.featured ? "text-white/90" : "text-muted")}
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />
                      <span>
                        {item.name}
                        {item.detail && (
                          <span className={cn("block text-[0.78rem]", bloco.featured ? "text-white/70" : "text-muted/80")}>
                            {item.detail}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
