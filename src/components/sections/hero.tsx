import type { CSSProperties } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container, Eyebrow, LinkButton } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { hero, heroFloating } from "@/content/hero";

/**
 * Hero no layout do modelo de referência: bloco lilás-rosado com curva embaixo, título em duas
 * cores, botão principal + botão de play, e a foto em arco cercada de cards flutuantes.
 */
export function Hero() {
  const { method, stage, live, bubble } = heroFloating;

  return (
    <section id="inicio" className="relative">
      {/* Bloco colorido com a curva no rodapé */}
      <div className="relative overflow-hidden lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center bg-[linear-gradient(160deg,var(--color-lilac)_0%,var(--color-snow)_48%,var(--color-blush)_100%)] pt-[76px] [border-radius:0_0_50%_50%/0_0_40px_40px] sm:[border-radius:0_0_50%_50%/0_0_72px_72px] lg:pt-[84px] lg:[border-radius:0_0_50%_50%/0_0_90px_90px]">
        {/* manchas suaves de laranja e roxo, as cores da logo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_30rem_at_8%_20%,rgb(249_115_22/0.08),transparent_60%),radial-gradient(46rem_34rem_at_85%_60%,rgb(109_63_192/0.10),transparent_62%)]"
        />

        {/*
          Desktop: duas colunas com territórios fixos. A do texto nunca fica abaixo de 28rem;
          a do palco (foto + cards) é flexível. Nenhuma das duas invade a outra.
        */}
        <Container className="relative hidden items-center gap-16 lg:grid pb-20 pt-10 sm:pb-28 sm:pt-14 lg:grid-cols-[minmax(28rem,0.9fr)_minmax(0,1.2fr)] lg:gap-[clamp(2rem,4vw,5rem)] lg:pb-16 lg:pt-4">
          {/* Texto: é um container, então o título escala pela largura da própria coluna */}
          <div className="@container min-w-0">
            <div data-intro>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>
            <p
              data-intro
              style={{ "--intro-delay": "80ms" } as CSSProperties}
              className="mt-5 font-logo text-[0.82rem] font-semibold uppercase tracking-[0.32em] text-purple sm:text-sm"
            >
              {siteConfig.tagline}
            </p>
            <h1
              data-intro
              style={{ "--intro-delay": "160ms" } as CSSProperties}
              className="mt-4 text-[clamp(2.1rem,10.5cqi,4.1rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
            >
              <span className="block whitespace-nowrap text-orange-deep">{hero.title[0]}</span>
              <span className="block whitespace-nowrap text-midnight">{hero.title[1]}</span>
            </h1>
            <p
              data-intro
              style={{ "--intro-delay": "240ms" } as CSSProperties}
              className="mt-5 max-w-lg text-[1rem] leading-[1.9] text-muted sm:text-[1.05rem]"
            >
              {hero.lead.before}
              <strong className="font-semibold text-ink">{hero.lead.strong}</strong>
              {hero.lead.after}
            </p>

            <div
              data-intro
              style={{ "--intro-delay": "320ms" } as CSSProperties}
              className="mt-7 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
            >
              <LinkButton href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </LinkButton>

              {/* botão de play, como o "Watch how it works" do modelo */}
              <a
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-4 self-start font-medium text-ink sm:self-auto"
              >
                <span className="grid size-14 place-items-center rounded-full bg-white shadow-[0_14px_34px_rgb(43_33_64/0.14)] transition-transform duration-300 ease-out group-hover:scale-105">
                  <Play className="ml-0.5 size-5 fill-purple text-purple" aria-hidden />
                </span>
                <span className="text-[0.98rem] transition-colors group-hover:text-purple">
                  {hero.secondaryCta.label}
                </span>
              </a>
            </div>

            <ul
              data-intro
              style={{ "--intro-delay": "400ms" } as CSSProperties}
              className="mt-7 flex flex-wrap gap-x-7 gap-y-3"
            >
              {hero.highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-[0.85rem] text-muted">
                  <Icon className="size-4 text-orange" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/*
            Palco: foto em arco + cards flutuantes. O palco é um container (cqi = 1% da largura
            dele): a foto ocupa o miolo (88cqi) e as laterais ficam reservadas para os cards,
            que se ancoram nas bordas do palco (left/right 0). Tudo escala junto, então os cards
            nunca saem pela direita da tela nem entram na coluna de texto.
          */}
          <div
            data-intro="zoom"
            style={{ "--intro-delay": "200ms" } as CSSProperties}
            className="@container relative mx-auto w-full min-w-0 max-w-[640px] lg:mr-0 lg:max-w-[min(780px,max(26rem,calc((100svh_-_13rem)_*_0.91)))]"
          >
            <div className="relative pb-[5cqi]">
              {/* halo atrás da foto */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[4%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.75),transparent)]"
              />

              <div className="relative mx-auto aspect-[4/5] w-[88cqi] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-ink shadow-soft">
                <Image
                  src={hero.photo.src}
                  alt={hero.photo.alt}
                  fill
                  priority
                  quality={85}
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  className="object-cover object-[50%_40%]"
                />
                {/* fio fino interno acompanhando o arco */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-[1.6rem] border border-white/25"
                />
              </div>

              {/* Card: método, ancorado na borda esquerda do palco */}
              <div className="glass absolute left-0 top-[17%] flex max-w-[33cqi] animate-float items-center gap-[2.4cqi] rounded-2xl px-[2.2cqi] py-[1.8cqi]">
                <span className="grid size-[clamp(1.75rem,5.2cqi,2.25rem)] shrink-0 place-items-center rounded-xl bg-purple text-white">
                  <method.icon className="size-[55%]" aria-hidden />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-[clamp(0.76rem,2.3cqi,0.9rem)] font-bold text-ink">{method.title}</span>
                  <span className="block text-[clamp(0.62rem,1.75cqi,0.7rem)] text-muted">{method.label}</span>
                </span>
              </div>

              {/* Bolha de ícone, ancorada perto da borda direita */}
              <span
                aria-label={bubble.label}
                role="img"
                className="absolute right-[6cqi] top-[5%] grid size-[clamp(2rem,6.2cqi,2.6rem)] animate-float place-items-center rounded-2xl bg-orange text-midnight shadow-button [animation-delay:-2s]"
              >
                <bubble.icon className="size-[45%]" aria-hidden />
              </span>

              {/* Card: palco dos estudantes, ancorado na borda direita */}
              <div className="glass absolute right-0 top-[48%] w-[31cqi] animate-float rounded-2xl px-[2.2cqi] py-[1.9cqi] [animation-delay:-4s]">
                <stage.check className="absolute right-[2.4cqi] top-[2cqi] size-3.5 text-purple" aria-hidden />
                <div className="flex items-start gap-[2.4cqi]">
                  <span className="grid size-[clamp(1.75rem,5.2cqi,2.25rem)] shrink-0 place-items-center rounded-xl bg-coral text-white">
                    <stage.icon className="size-[55%]" aria-hidden />
                  </span>
                  <span className="min-w-0 pr-4 leading-tight">
                    <span className="block text-[clamp(0.72rem,2.05cqi,0.84rem)] font-bold text-ink">{stage.title}</span>
                    <span className="mt-0.5 block text-[clamp(0.62rem,1.7cqi,0.68rem)] text-muted">{stage.label}</span>
                  </span>
                </div>
              </div>

              {/* Card: aula ao vivo, ancorado embaixo à esquerda */}
              <div className="glass absolute bottom-0 left-0 w-[36cqi] animate-float rounded-2xl p-[2.4cqi] [animation-delay:-1s]">
                <p className="flex items-center gap-2 text-[clamp(0.52rem,1.5cqi,0.6rem)] font-bold uppercase tracking-[0.22em] text-ink/80">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-orange" />
                  </span>
                  {live.eyebrow}
                </p>
                <div className="mt-[2.2cqi] flex items-center gap-[2.4cqi]">
                  <span className="relative size-[clamp(1.75rem,5.2cqi,2.25rem)] shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                    <Image src={hero.photo.src} alt="" fill sizes="48px" className="object-cover object-[50%_25%]" />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[clamp(0.74rem,2.1cqi,0.86rem)] font-bold text-ink">{live.title}</span>
                    <span className="mt-0.5 block text-[clamp(0.62rem,1.7cqi,0.7rem)] text-muted">{live.label}</span>
                  </span>
                </div>
                <a
                  href={live.cta.href}
                  className="mt-[2.2cqi] flex h-[clamp(1.8rem,5cqi,2.1rem)] items-center justify-center rounded-full bg-purple text-[clamp(0.66rem,1.8cqi,0.74rem)] font-semibold text-white transition-colors hover:bg-purple-deep"
                >
                  {live.cta.label}
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/*
          HERO DO CELULAR E TABLET (abaixo de 1024px). Ordem pensada para a tela em pé:
          rótulo em pílula, título, a foto em arco com 3 selos curtos (sem textos espremidos)
          e a barra "Aula ao vivo" sobre a base da foto, depois o texto, os botões e os destaques
          numa faixa que desliza. O hero do desktop (acima) não muda.
        */}
        <Container className="relative pb-16 pt-6 sm:pb-24 sm:pt-10 lg:hidden">
          <div data-intro className="flex">
            <span className="glass-flat inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-purple">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-orange" />
              </span>
              {hero.eyebrow}
            </span>
          </div>

          <h1
            data-intro
            style={{ "--intro-delay": "100ms" } as CSSProperties}
            className="mt-5 text-[clamp(2.15rem,1.2rem+4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.015em]"
          >
            <span className="block text-orange-deep">{hero.title[0]}</span>
            <span className="block text-midnight">{hero.title[1]}</span>
          </h1>
          <p
            data-intro
            style={{ "--intro-delay": "160ms" } as CSSProperties}
            className="mt-3 font-logo text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-purple"
          >
            {siteConfig.tagline}
          </p>

          {/* Foto em arco + selos */}
          <div
            data-intro="zoom"
            style={{ "--intro-delay": "220ms" } as CSSProperties}
            className="relative mx-auto mt-8 w-full max-w-[24rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-ink shadow-soft">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                quality={85}
                sizes="(min-width: 640px) 384px, 92vw"
                className="object-cover object-[50%_35%]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-2.5 rounded-t-[999px] rounded-b-[1.6rem] border border-white/25"
              />
              {/* escurece a base para a barra de vidro ler bem */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-midnight/45 to-transparent"
              />
            </div>

            {/* selo: método */}
            <div className="glass absolute left-2 top-[18%] flex animate-float items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5">
              <span className="grid size-8 place-items-center rounded-full bg-purple text-white">
                <method.icon className="size-4" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.78rem] font-bold text-ink">{method.title}</span>
                <span className="block text-[0.6rem] text-muted">{method.label}</span>
              </span>
            </div>

            {/* selo: chat */}
            <span
              aria-label={bubble.label}
              role="img"
              className="absolute right-3 top-[6%] grid size-11 animate-float place-items-center rounded-2xl bg-orange text-midnight shadow-button [animation-delay:-2s]"
            >
              <bubble.icon className="size-5" aria-hidden />
            </span>

            {/* selo: palco */}
            <div className="glass absolute right-2 top-[46%] flex max-w-[62%] animate-float items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 [animation-delay:-4s]">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-coral text-white">
                <stage.icon className="size-4" aria-hidden />
              </span>
              <span className="truncate text-[0.72rem] font-bold text-ink">{stage.title}</span>
              <stage.check className="size-3.5 shrink-0 text-purple" aria-hidden />
            </div>

            {/* barra: aula ao vivo */}
            <div className="glass absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl p-2.5 pr-3">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                <Image src={hero.photo.src} alt="" fill sizes="40px" className="object-cover object-[50%_25%]" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="flex items-center gap-1.5 text-[0.54rem] font-bold uppercase tracking-[0.18em] text-ink/70">
                  <span className="size-1.5 rounded-full bg-orange" />
                  {live.eyebrow}
                </span>
                <span className="mt-0.5 block truncate text-[0.84rem] font-bold text-ink">{live.title}</span>
                <span className="block truncate text-[0.68rem] text-muted">{live.label}</span>
              </span>
              <a
                href={live.cta.href}
                className="shrink-0 rounded-full bg-purple px-3.5 py-2 text-[0.7rem] font-semibold text-white transition-colors active:bg-purple-deep"
              >
                Participar
              </a>
            </div>
          </div>

          <p
            data-intro
            style={{ "--intro-delay": "300ms" } as CSSProperties}
            className="mt-8 text-[0.98rem] leading-[1.8] text-muted"
          >
            {hero.lead.before}
            <strong className="font-semibold text-ink">{hero.lead.strong}</strong>
            {hero.lead.after}
          </p>

          <div
            data-intro
            style={{ "--intro-delay": "360ms" } as CSSProperties}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <LinkButton href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </LinkButton>
            <a
              href={hero.secondaryCta.href}
              className="glass-flat inline-flex h-14 items-center justify-center gap-3 rounded-full px-6 font-medium text-ink"
            >
              <span className="grid size-8 place-items-center rounded-full bg-white shadow-[0_8px_20px_rgb(43_33_64/0.14)]">
                <Play className="ml-0.5 size-3.5 fill-purple text-purple" aria-hidden />
              </span>
              <span className="text-[0.92rem]">{hero.secondaryCta.label}</span>
            </a>
          </div>

          {/* destaques em faixa que desliza */}
          <ul
            data-intro
            style={{ "--intro-delay": "420ms" } as CSSProperties}
            className="no-scrollbar -mx-5 mt-7 flex gap-2.5 overflow-x-auto px-5 sm:-mx-8 sm:px-8"
          >
            {hero.highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="glass-flat flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[0.76rem] font-medium text-ink/85"
              >
                <Icon className="size-4 text-orange" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
