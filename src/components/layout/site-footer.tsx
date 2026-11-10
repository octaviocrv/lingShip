import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/primitives";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { footerContact } from "@/content/contato";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-lilac/60">
      <Container className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1.1fr]">
          <div>
            <a href="#inicio" aria-label="Lingship, voltar ao início" className="inline-block">
              <Logo size="lg" />
            </a>
            <p className="mt-6 max-w-sm text-[0.92rem] leading-[1.9] text-muted">{siteConfig.description}</p>
          </div>

          <div>
            <h2 className="font-sans text-eyebrow font-bold uppercase text-ink">Navegue</h2>
            <ul className="mt-5 space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className="text-[0.92rem] text-muted transition-colors hover:text-purple">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-eyebrow font-bold uppercase text-ink">Fale com a gente</h2>
            <ul className="mt-5 space-y-3 text-[0.92rem] leading-relaxed text-muted">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-purple">
                  {siteConfig.email}
                </a>
              </li>
              {footerContact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="font-logo text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-purple-strong">
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
