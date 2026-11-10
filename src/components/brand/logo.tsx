import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Logo em texto, como no protótipo: "Lingship" em Playfair Display roxa
 * e "Inglês na prática" em caixa alta espaçada logo abaixo.
 * Trocar por arquivo de logo quando a Vanessa enviar a versão em alta resolução.
 */
export function Logo({ size = "md", className }: { size?: "md" | "lg"; className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-logo font-medium tracking-[-0.01em] text-purple",
          size === "lg" ? "text-[2.6rem]" : "text-[1.75rem] sm:text-[1.9rem]",
        )}
      >
        {siteConfig.name}
      </span>
      <span
        className={cn(
          "mt-1 font-bold uppercase text-violet",
          size === "lg" ? "text-[0.72rem] tracking-[0.34em]" : "text-[0.55rem] tracking-[0.3em]",
        )}
      >
        {siteConfig.subtitle}
      </span>
    </span>
  );
}
