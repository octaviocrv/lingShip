import { IntroSplash } from "@/components/effects/intro-splash";
import { RevealObserver } from "@/components/effects/reveal-observer";
import { MobileDock } from "@/components/layout/mobile-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Comunidade } from "@/components/sections/comunidade";
import { Contato } from "@/components/sections/contato";
import { Desafios } from "@/components/sections/desafios";
import { Faq } from "@/components/sections/faq";
import { Filosofia } from "@/components/sections/filosofia";
import { Hero } from "@/components/sections/hero";
import { Metricas } from "@/components/sections/metricas";
import { MateriaisGratuitos } from "@/components/sections/materiais-gratuitos";
import { Metodo } from "@/components/sections/metodo";
import { Planos } from "@/components/sections/planos";

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
      <RevealObserver />
    </>
  );
}
