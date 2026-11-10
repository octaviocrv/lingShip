import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/* Container */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>{children}</div>;
}

/* Botões */

type Variant = "orange" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Texto escuro sobre o laranja: mantém o contraste legível (o branco ficaria fraco).
  orange: "bg-orange text-ink shadow-button hover:bg-orange-hover hover:-translate-y-0.5",
  ghost: "glass text-ink hover:border-purple/40 hover:-translate-y-0.5",
  light: "bg-white text-purple-strong hover:-translate-y-0.5 hover:bg-lilac",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8rem]",
  md: "h-12 px-6 text-[0.88rem]",
  lg: "h-14 px-8 text-[0.95rem]",
};

function buttonClass(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full text-center font-semibold leading-tight transition-all duration-300 ease-out [&_svg]:shrink-0",
    sizes[size],
    variants[variant],
    className,
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size };

/** Botão que leva a outra parte da página (âncora). */
export function LinkButton({ variant = "orange", size = "md", className, children, ...rest }: LinkButtonProps) {
  return (
    <a className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

/**
 * Botão de ação (comprar, enviar, receber materiais).
 * Nesta versão ainda não tem ação ligada: é só o visual, à espera da integração.
 */
export function ActionButton({ variant = "orange", size = "md", className, children, ...rest }: ActionButtonProps) {
  return (
    <button type="button" className={buttonClass(variant, size, cn("cursor-pointer", className))} {...rest}>
      {children}
    </button>
  );
}

/* Eyebrow: linha laranja curta + rótulo em caixa alta roxa */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-4 text-eyebrow font-bold uppercase text-purple", className)}>
      <span aria-hidden className="h-px w-10 bg-orange" />
      {children}
    </p>
  );
}

/* Título de seção */

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** "split": título à esquerda e texto à direita (como no protótipo). "stack": tudo empilhado. */
  layout?: "split" | "stack";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, layout = "split", className }: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        layout === "split" ? "grid items-end gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16" : "max-w-3xl",
        className,
      )}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-title font-medium">{title}</h2>
      </div>
      {description && (
        <p className={cn("text-[0.95rem] leading-[1.9] text-muted", layout === "stack" && "mt-6")}>{description}</p>
      )}
    </div>
  );
}

/* Ícone em círculo lilás (cards) */

export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn("grid size-11 place-items-center rounded-full bg-surface text-purple", className)}>
      <Icon className="size-[18px]" strokeWidth={2} aria-hidden />
    </span>
  );
}

/* Etiqueta pequena em pílula (categoria, "Acesso") */

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-purple",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* Avatar com iniciais (comunidade e depoimentos) */

export function Initials({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange/15 text-[0.72rem] font-bold tracking-[0.06em] text-orange-deep">
      {children}
    </span>
  );
}
