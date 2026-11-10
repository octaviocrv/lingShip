import type { CSSProperties } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container, Eyebrow, LinkButton } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { activityTicker, hero, heroFloating } from "@/content/hero";

/**
 * Hero no layout do modelo de referência: bloco lilás com curva embaixo, título em duas
 * cores, botão principal + botão de play, e a foto em arco cercada de cards flutuantes.
 */
export function Hero() {
  const { method, stage, live, bubble } = heroFloating;

  return (
    <section id="inicio" className="relative">
      {/* Bloco colorido com a curva no rodapé */}
      <div className="relative overflow-hidden bg-lilac pt-[76px] [border-radius:0_0_50%_50%/0_0_40px_40px] sm:[border-radius:0_0_50%_50%/0_0_72px_72px] lg:pt-[84px] lg:[border-radius:0_0_50%_50%/0_0_120px_120px]">
        {/* manchas suaves de pêssego e roxo, como o fundo quente do modelo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_30rem_at_8%_20%,rgb(249_115_22/0.10),transparent_60%),radial-gradient(46rem_34rem_at_85%_60%,rgb(109_63_192/0.12),transparent_62%)]"
        />

        <Container className="relative grid items-center gap-16 pb-20 pt-10 sm:pb-28 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-32 lg:pt-14">
          {/* Texto */}
          <div>
            <div data-intro>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>
            <p
              data-intro
              style={{ "--intro-delay": "80ms" } as CSSProperties}
              className="mt-6 font-logo text-[0.82rem] font-semibold uppercase tracking-[0.32em] text-purple sm:text-sm"
            >
              {siteConfig.tagline}
            </p>
            <h1
              data-intro
              style={{ "--intro-delay": "160ms" } as CSSProperties}
              className="mt-4 text-[clamp(2.1rem,1.1rem+3.6vw,4.1rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
            >
              <span className="block whitespace-nowrap text-orange-hover">{hero.title[0]}</span>
              <span className="block whitespace-nowrap text-purple-strong">{hero.title[1]}</span>
            </h1>
            <p
              data-intro
              style={{ "--intro-delay": "240ms" } as CSSProperties}
              className="mt-7 max-w-lg text-[1rem] leading-[1.9] text-muted sm:text-[1.05rem]"
            >
              {hero.lead.before}
              <strong className="font-semibold text-ink">{hero.lead.strong}</strong>
              {hero.lead.after}
            </p>

            <div
              data-intro
              style={{ "--intro-delay": "320ms" } as CSSProperties}
              className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
            >
              <LinkButton href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </LinkButton>

              {/* botão de play, como o "Watch how it works" do modelo */}
              <a
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-4 self-start font-medium text-ink sm:self-auto"
              >
                <span className="grid size-14 place-items-center rounded-full bg-white shadow-[0_14px_34px_rgb(76_42_147/0.16)] transition-transform duration-300 ease-out group-hover:scale-105">
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
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
            >
              {hero.highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-[0.85rem] text-muted">
                  <Icon className="size-4 text-orange" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Foto em arco + cards flutuantes */}
          <div
            data-intro="zoom"
            style={{ "--intro-delay": "200ms" } as CSSProperties}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[400px]"
          >
            {/* halo atrás da foto */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.75),transparent)]"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-ink shadow-soft">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                quality={85}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover object-[50%_40%]"
              />
              {/* fio fino interno acompanhando o arco */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-[1.6rem] border border-white/25"
              />
            </div>

            {/* Card: método (como o "250k Assisted Student") */}
            <div className="glass absolute -left-8 top-[16%] flex animate-float items-center gap-3 rounded-2xl px-4 py-3 sm:-left-20 sm:gap-4 sm:px-5 sm:py-4 lg:-left-28">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-purple text-white sm:size-11">
                <method.icon className="size-5" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.95rem] font-bold text-ink sm:text-[1.05rem]">{method.title}</span>
                <span className="block text-[0.72rem] text-muted sm:text-[0.8rem]">{method.label}</span>
              </span>
            </div>

            {/* Bolha de ícone (como o ícone rosa do modelo) */}
            <span
              aria-label={bubble.label}
              role="img"
              className="absolute -right-3 top-[6%] grid size-12 animate-float place-items-center rounded-2xl bg-orange text-ink shadow-button [animation-delay:-2s] sm:-right-8 sm:size-14"
            >
              <bubble.icon className="size-6" aria-hidden />
            </span>

            {/* Card: palco (como o "Congratulations") */}
            <div className="glass absolute -right-6 top-[50%] w-[64%] animate-float rounded-2xl px-4 py-3 [animation-delay:-4s] sm:-right-20 sm:w-[60%] sm:px-5 sm:py-4 lg:-right-24">
              <stage.check className="absolute right-3 top-3 size-4 text-purple" aria-hidden />
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange/90 text-ink">
                  <stage.icon className="size-5" aria-hidden />
                </span>
                <span className="pr-4 leading-tight">
                  <span className="block text-[0.86rem] font-bold text-ink sm:text-[0.95rem]">{stage.title}</span>
                  <span className="mt-0.5 block text-[0.72rem] text-muted sm:text-[0.78rem]">{stage.label}</span>
                </span>
              </div>
            </div>

            {/* Card: aula ao vivo (como o "User Experience Class / Join Now") */}
            <div className="glass absolute -bottom-10 -left-6 w-[78%] animate-float rounded-2xl p-4 [animation-delay:-1s] sm:-left-16 sm:w-[72%] sm:p-5 lg:-left-24">
              <p className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink/80">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-orange" />
                </span>
                {live.eyebrow}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src={hero.photo.src}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover object-[50%_25%]"
                  />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.9rem] font-bold text-ink sm:text-[0.98rem]">{live.title}</span>
                  <span className="mt-0.5 block text-[0.74rem] text-muted sm:text-[0.8rem]">{live.label}</span>
                </span>
              </div>
              <a
                href={live.cta.href}
                className="mt-4 flex h-10 items-center justify-center rounded-full bg-purple text-[0.8rem] font-semibold text-white transition-colors hover:bg-purple-strong"
              >
                {live.cta.label}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Faixa de atividades rolando */}
      <div className="fade-edges relative mt-8 overflow-hidden py-6 sm:mt-10" aria-label="Atividades recentes da comunidade">
        <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...activityTicker, ...activityTicker].map(({ icon: Icon, label }, i) => (
            <li
              key={`${label}-${i}`}
              aria-hidden={i >= activityTicker.length}
              className="glass-flat flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.82rem] font-medium text-ink/85"
            >
              <Icon className="size-4 text-orange" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
