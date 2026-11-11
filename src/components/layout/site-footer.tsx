import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/primitives";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { footerContact } from "@/content/contato";

export function SiteFooter() {
  return (
    <footer className="bg-midnight text-white/70">
      {/* no celular o rodapé é o básico: logo, e-mail e direitos, tudo centralizado */}
      <Container className="pb-6 pt-8 md:pb-10 md:pt-20">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1.1fr] md:gap-12">
          <div className="max-md:flex max-md:flex-col max-md:items-center">
            <a href="#inicio" aria-label="Lingship, voltar ao início" className="inline-block">
              <span className="md:hidden">
                <Logo tone="light" />
              </span>
              <span className="hidden md:block">
                <Logo size="lg" tone="light" />
              </span>
            </a>
            <p className="mt-6 hidden max-w-sm text-[0.92rem] leading-[1.9] text-white/70 md:block">{siteConfig.description}</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-3 text-[0.8rem] text-white/70 md:hidden">
              {siteConfig.email}
            </a>
          </div>

          <div className="hidden md:block">
            <h2 className="font-sans text-eyebrow font-bold uppercase text-orange">Navegue</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:mt-5 md:block md:space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className="text-[0.85rem] text-white/75 transition-colors hover:text-white md:text-[0.92rem]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <h2 className="font-sans text-eyebrow font-bold uppercase text-orange">Fale com a gente</h2>
            <ul className="mt-4 space-y-2 text-[0.85rem] leading-relaxed text-white/75 md:mt-5 md:space-y-3 md:text-[0.92rem]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              {footerContact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/15 pt-4 text-center text-[0.7rem] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-left md:mt-14 md:gap-3 md:pt-6 md:text-xs">
          <p>
            © {siteConfig.year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="hidden font-logo text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-rose md:block">
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
