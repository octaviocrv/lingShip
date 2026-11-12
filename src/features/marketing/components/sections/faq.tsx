import { ChevronDown } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { faq, faqSection } from "@/features/marketing/content/faq";

/** Perguntas frequentes em acordeão nativo (details/summary): funciona sem JavaScript. */
export function Faq() {
  return (
    <section id="duvidas" className="py-14 sm:py-24 lg:py-28">
      <Container className="max-w-[960px]">
        <div data-reveal className="max-lg:text-center">
          <Eyebrow className="max-lg:justify-center">{faqSection.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-title font-medium">{faqSection.title}</h2>
        </div>

        <div data-reveal-group className="mt-10 space-y-3">
          {faq.map((item) => (
            <details key={item.question} className="glass-flat group rounded-[1.25rem] open:shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-serif text-[1.05rem] text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="size-5 shrink-0 text-orange transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="px-6 pb-6 text-[0.92rem] leading-[1.85] text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
