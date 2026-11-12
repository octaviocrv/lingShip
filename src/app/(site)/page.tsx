import { IntroSplash } from "@/features/marketing/components/effects/intro-splash";
import { RevealObserver } from "@/components/effects/reveal-observer";
import { SoundSystem } from "@/features/marketing/components/effects/sound-system";
import { MobileDock } from "@/features/marketing/components/layout/mobile-dock";
import { SiteFooter } from "@/features/marketing/components/layout/site-footer";
import { SiteHeader } from "@/features/marketing/components/layout/site-header";
import { Comunidade } from "@/features/marketing/components/sections/comunidade";
import { Contato } from "@/features/marketing/components/sections/contato";
import { Desafios } from "@/features/marketing/components/sections/desafios";
import { Faq } from "@/features/marketing/components/sections/faq";
import { Filosofia } from "@/features/marketing/components/sections/filosofia";
import { Hero } from "@/features/marketing/components/sections/hero";
import { Metricas } from "@/features/marketing/components/sections/metricas";
import { MateriaisGratuitos } from "@/features/marketing/components/sections/materiais-gratuitos";
import { Metodo } from "@/features/marketing/components/sections/metodo";
import { Planos } from "@/features/marketing/components/sections/planos";

/**
 * Ordem das seções = ordem de rolagem do protótipo da Vanessa (SITE123):
 * hero, métricas, materiais gratuitos, método, filosofia e formação, desafios,
 * comunidade e depoimentos, planos, perguntas frequentes, contato e rodapé.
 */
export default function Home() {
  return (
    <>
      <IntroSplash />
      <SiteHeader />
      <main>
        <Hero />
        <Metricas />
        <MateriaisGratuitos />
        <Metodo />
        <Filosofia />
        <Desafios />
        <Comunidade />
        <Planos />
        <Faq />
        <Contato />
      </main>
      <SiteFooter />
      <MobileDock />
      <SoundSystem />
      <RevealObserver />
    </>
  );
}
