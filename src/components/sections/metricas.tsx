import { MetricItem } from "@/components/effects/metric-item";
import { PeopleAssemble } from "@/components/effects/people-assemble";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { metricas, metricasSection } from "@/content/metricas";

/**
 * Faixa de números logo abaixo do hero: título centralizado, o grupo de pessoas (que se monta
 * conforme a rolagem) e, por cima do pé da imagem, o cartão de vidro com as 4 métricas. O cartão cobre a base
 * da imagem, que vem cortada, então as pessoas parecem apoiadas nos números.
 */
export function Metricas() {
  return (
    <section aria-labelledby="metricas-titulo" className="overflow-hidden py-12 sm:py-20 lg:py-24">
      <Container>
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{metricasSection.eyebrow}</Eyebrow>
          <h2 id="metricas-titulo" className="mt-5 text-title font-medium">
            {metricasSection.title}
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.9] text-muted sm:text-[1rem]">{metricasSection.description}</p>
        </div>

        {/* Grupo que se monta com a rolagem (3 camadas, uma por pessoa) */}
        <div className="mx-auto mt-10 w-full max-w-[min(46rem,100%)] lg:mt-12">
          <PeopleAssemble
            people={metricasSection.people}
            alt={metricasSection.photo.alt}
            width={2200}
            height={1419}
          />
        </div>

        {/* Cartão de métricas sobre o pé da foto */}
        <dl
          data-reveal
          data-no-txt
          className="glass relative z-10 mx-auto -mt-[clamp(2rem,6vw,4.5rem)] grid max-w-5xl grid-cols-2 gap-y-10 rounded-[2rem] px-4 py-9 sm:px-8 sm:py-11 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-line"
        >
          {metricas.map(({ value, suffix, label }, i) => (
            <MetricItem key={label} value={value} suffix={suffix} label={label} delay={i * 220} />
          ))}
        </dl>
      </Container>
    </section>
  );
}
