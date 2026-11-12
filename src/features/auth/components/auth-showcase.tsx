import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { LogoMark } from "@/components/brand/logo";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { loginContent } from "../content/login";

/**
 * Painel de foto à esquerda das telas de acesso, com borda direita curva (clip-auth-curve).
 *
 * Fluido: recuos e tipografia vêm das variáveis --panel-* (globals.css, "auth-scale"), que
 * crescem com a tela e com o zoom. O logo fica no alto; o bloco do título fica na altura que
 * sobra, entre dois espaços flexíveis na proporção 1:3,5 (como na referência), que encolhem
 * até um mínimo em telas baixas em vez de empurrar o conteúdo para fora. O recuo da direita é uma
 * porcentagem do painel, para o texto nunca encostar na curva.
 *
 * Duas fotos, escolhidas pelo formato da tela (<picture>, o navegador baixa só uma):
 * - telas largas (16:9 e mais, a maioria dos notebooks e monitores): a cena ampla, ampliada
 *   1,14x e enquadrada como na referência (livros, caneca e notebook na base);
 * - telas mais quadradas (até 3:2, ex.: 16:10 em tela cheia e 4:3): a cena próxima, que
 *   preenche o painel alto sem precisar ampliar a foto além da resolução dela.
 */
export function AuthShowcase({ className }: { className?: string }) {
  const { titleLines, titleHighlight, description, image } = loginContent.showcase;
  const common = { alt: image.alt, quality: 85, loading: "eager", fetchPriority: "high" } as const;
  // o painel tem 45% da largura; a cena ampla é ampliada 1,14x, então pede uma versão maior
  const { props: wide } = getImageProps({ ...common, ...image.wide, sizes: "52vw" });
  const { props: close } = getImageProps({ ...common, ...image.close, sizes: "46vw" });

  return (
    <aside
      className={cn(
        "clip-auth-curve relative min-h-svh flex-col overflow-hidden bg-midnight text-white",
        className,
      )}
    >
      <div className="auth-photo absolute inset-0">
        <picture>
          <source media="(max-aspect-ratio: 3/2)" srcSet={close.srcSet} sizes={close.sizes} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- o alt vem de getImageProps */}
          <img
            {...wide}
            className="absolute inset-0 size-full origin-[66%_40%] scale-[1.14] object-cover object-[66%_40%] [@media(max-aspect-ratio:3/2)]:scale-100 [@media(max-aspect-ratio:3/2)]:object-[46%_50%]"
          />
        </picture>
      </div>

      {/* véu roxo escuro: mais forte à esquerda e no alto, onde fica o texto */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(30_18_52/0.74)_0%,rgb(30_18_52/0.56)_42%,rgb(30_18_52/0.22)_78%,rgb(30_18_52/0.08)_100%),linear-gradient(180deg,rgb(30_18_52/0.3)_0%,transparent_45%,rgb(30_18_52/0.15)_100%)]"
      />

      <div className="relative flex flex-1 flex-col pb-[clamp(2rem,6svh,4rem)] pl-[var(--panel-pad-x)] pr-[16%] pt-[var(--panel-pad-top)]">
        <a
          href={routes.home}
          aria-label={`${siteConfig.name}, voltar ao site`}
          className="auth-in inline-flex items-center gap-[calc(var(--panel-logo)*0.27)] self-start rounded-2xl [--d:250ms] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <LogoMark tone="snow" className="size-[var(--panel-logo)] drop-shadow-[0_6px_18px_rgb(0_0_0/0.25)]" />
          <span className="flex flex-col">
            <span className="font-logo text-[length:var(--panel-brand)] font-semibold leading-none tracking-[-0.01em]">
              {siteConfig.name}
            </span>
            <span className="mt-[0.85em] text-[length:var(--panel-tagline)] font-bold uppercase leading-none tracking-[0.21em]">
              {siteConfig.subtitle}
            </span>
          </span>
        </a>

        {/* espaço flexível acima do título (1 parte); abaixo tem 3,5 partes, como na referência */}
        <span aria-hidden className="min-h-[clamp(1.5rem,5svh,3rem)] flex-[1]" />

        <div>
          <span
            aria-hidden
            className="auth-line block h-[max(2px,0.06em)] w-[0.95em] bg-[#ff7e29] text-[length:var(--panel-title)] [--d:420ms]"
          />

          <p className="mt-[clamp(1.25rem,3.2svh,2.25rem)] font-serif text-[length:var(--panel-title)] font-semibold leading-[1.095] tracking-[-0.005em]">
            {titleLines.map((line, i) => (
              <span key={line} className="auth-in block" style={{ "--d": `${500 + i * 110}ms` } as CSSProperties}>
                {line}
              </span>
            ))}
            <span className="auth-in block text-[#ff7537] [--d:720ms]">{titleHighlight}</span>
          </p>

          <p className="auth-in mt-[1.25em] max-w-[19em] text-[length:var(--panel-text)] leading-[1.55] text-white/95 [--d:860ms]">
            {description}
          </p>
        </div>

        <span aria-hidden className="min-h-[clamp(1rem,3svh,2rem)] flex-[3.5]" />
      </div>
    </aside>
  );
}
