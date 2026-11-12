import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Símbolo L" da Lingship: o "L" fecha uma citação, lê-se "L disse" (a voz da Vanessa).
 * Quadrado arredondado grafite (ou roxo, sobre fundo escuro), L serifado creme e aspas laranja.
 * Desenhado em SVG com a Playfair Display do site; trocar pelo arquivo final quando houver.
 */
export function LogoMark({
  tone = "dark",
  className,
}: {
  /** "dark": grafite (padrão). "light": roxo, para fundo escuro. "snow": lilás claro com L grafite, sobre foto. */
  tone?: "dark" | "light" | "snow";
  className?: string;
}) {
  const rect = { dark: "fill-midnight", light: "fill-purple", snow: "fill-[#f0e8fb]" }[tone];
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("shrink-0", className)}>
      <rect width="64" height="64" rx="18" className={rect} />
      <text
        x="27"
        y="50"
        textAnchor="middle"
        fontSize="46"
        fontWeight="600"
        className={tone === "snow" ? "fill-ink-deep" : "fill-snow"}
        style={{ fontFamily: "var(--font-logo)" }}
      >
        L
      </text>
      <text
        x="46"
        y="40"
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        className="fill-orange"
        style={{ fontFamily: "var(--font-logo)" }}
      >
        {"”"}
      </text>
    </svg>
  );
}

/** Símbolo + nome "Lingship" + "Inglês na prática". `tone="light"` é a versão para o rodapé grafite. */
export function Logo({
  size = "md",
  tone = "dark",
  className,
}: {
  size?: "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", size === "lg" ? "gap-4" : "gap-3", className)}>
      <LogoMark tone={tone} className={size === "lg" ? "size-14" : "size-10 sm:size-11"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-logo font-semibold tracking-[-0.01em]",
            tone === "light" ? "text-snow" : "text-midnight",
            size === "lg" ? "text-[2.1rem]" : "text-[1.5rem] sm:text-[1.65rem]",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-1.5 font-bold uppercase",
            tone === "light" ? "text-rose" : "text-purple",
            size === "lg" ? "text-[0.66rem] tracking-[0.3em]" : "text-[0.52rem] tracking-[0.28em]",
          )}
        >
          {siteConfig.subtitle}
        </span>
      </span>
    </span>
  );
}
