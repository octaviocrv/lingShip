import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CircleDashed,
  Clapperboard,
  Eye,
  Lightbulb,
  NotebookPen,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import type { EditorialStatus } from "../content/catalog";
import { cn } from "@/lib/cn";

/*
 * Peças visuais da plataforma. Só usam os tokens de globals.css (canvas, card, hairline,
 * radius-box, shadow-card...), então mudar a identidade visual é mudar os tokens.
 */

/* Card */

export function Card({
  className,
  children,
  as: Tag = "section",
}: {
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "article" | "aside";
}) {
  return <Tag className={cn("rounded-box bg-card p-5 shadow-card lg:p-6", className)}>{children}</Tag>;
}

export function CardHeader({
  title,
  icon: Icon,
  action,
  description,
  className,
}: {
  title: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 className="flex items-center gap-2.5 font-sans text-[1rem] font-semibold leading-tight text-midnight">
          {Icon && <Icon aria-hidden className="size-[18px] text-purple" strokeWidth={2} />}
          {title}
        </h2>
        {description && <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Link discreto do canto do card ("Ver tudo →"). */
export function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-md text-[0.8rem] font-semibold text-purple transition-colors hover:text-purple-deep"
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

/* Cabeçalho de página */

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="min-w-0 max-w-3xl">
        {eyebrow && <div className="mb-2 text-[0.78rem] font-semibold text-purple">{eyebrow}</div>}
        <h1 className="font-serif text-[clamp(1.6rem,1.2rem+1.1vw,2.15rem)] font-semibold leading-[1.15] text-midnight">
          {title}
        </h1>
        {description && <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}

/* Botões */

type BtnVariant = "primary" | "secondary" | "soft" | "dark" | "ghost";
type BtnSize = "sm" | "md";

const btnVariants: Record<BtnVariant, string> = {
  // laranja com texto grafite: o mesmo par dos botões do site e do login
  primary: "bg-orange text-midnight shadow-[0_8px_20px_-8px_rgb(249_115_22/0.6)] hover:bg-orange-hover",
  secondary: "border border-hairline bg-card text-midnight hover:border-purple/30 hover:bg-snow",
  soft: "bg-surface text-purple hover:bg-lilac",
  dark: "bg-midnight text-snow hover:bg-ink-deep",
  ghost: "text-purple hover:bg-surface",
};

const btnSizes: Record<BtnSize, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-5 text-[0.86rem]",
};

export function btnClass(variant: BtnVariant = "primary", size: BtnSize = "md", className?: string) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,border-color,color,translate] duration-200 hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    btnSizes[size],
    btnVariants[variant],
    className,
  );
}

export function Btn({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: BtnSize }) {
  return <button type={type} className={btnClass(variant, size, className)} {...rest} />;
}

export function BtnLink({
  variant,
  size,
  className,
  ...rest
}: ComponentProps<typeof Link> & { variant?: BtnVariant; size?: BtnSize }) {
  return <Link className={btnClass(variant, size, className)} {...rest} />;
}

/* Selos */

type PillTone = "neutral" | "purple" | "orange" | "solid" | "success" | "warning" | "dark";

const pillTones: Record<PillTone, string> = {
  neutral: "bg-canvas text-ink",
  purple: "bg-surface text-purple",
  orange: "bg-orange/12 text-orange-deep",
  solid: "bg-orange text-midnight", // sobre fundo escuro
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  dark: "bg-midnight/85 text-snow backdrop-blur",
};

export function Pill({
  tone = "neutral",
  icon: Icon,
  children,
  className,
}: {
  tone?: PillTone;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.72rem] font-semibold leading-none",
        pillTones[tone],
        className,
      )}
    >
      {Icon && <Icon aria-hidden className="size-3.5" strokeWidth={2.2} />}
      {children}
    </span>
  );
}

const statusMeta: Record<EditorialStatus, { label: string; tone: PillTone; icon: LucideIcon }> = {
  ideia: { label: "Ideia", tone: "neutral", icon: Lightbulb },
  roteiro: { label: "Roteiro", tone: "purple", icon: NotebookPen },
  gravado: { label: "Gravado", tone: "orange", icon: Clapperboard },
  revisao: { label: "Em revisão", tone: "warning", icon: Eye },
  publicado: { label: "Publicado", tone: "success", icon: CheckCircle2 },
};

/** Status editorial: sempre ícone + rótulo, nunca só a cor. */
export function StatusBadge({ status }: { status: EditorialStatus }) {
  const meta = statusMeta[status] ?? { label: status, tone: "neutral" as const, icon: CircleDashed };
  return (
    <Pill tone={meta.tone} icon={meta.icon}>
      {meta.label}
    </Pill>
  );
}

/* Avatar e ícones */

export function Avatar({
  initials,
  src,
  alt = "",
  size = "md",
  className,
}: {
  initials?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = { sm: "size-8 text-[0.66rem]", md: "size-10 text-[0.72rem]", lg: "size-16 text-[1rem]" }[size];
  const px = { sm: 32, md: 40, lg: 64 }[size];
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className={cn("shrink-0 rounded-full object-cover ring-2 ring-white", dim, className)}
      />
    );
  }
  return (
    <span
      aria-hidden={!alt}
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-coral/12 font-bold tracking-[0.04em] text-coral-deep",
        dim,
        className,
      )}
    >
      {initials}
    </span>
  );
}

type TileTone = "purple" | "orange" | "coral" | "dark" | "success";

const tileTones: Record<TileTone, string> = {
  purple: "bg-surface text-purple",
  orange: "bg-orange/12 text-orange-deep",
  coral: "bg-coral/10 text-coral-deep",
  dark: "bg-midnight text-snow",
  success: "bg-success-soft text-success",
};

export function IconTile({
  icon: Icon,
  tone = "purple",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: TileTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = { sm: "size-9 [&_svg]:size-4", md: "size-11 [&_svg]:size-5", lg: "size-13 [&_svg]:size-6" }[size];
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-tile", dim, tileTones[tone], className)}>
      <Icon aria-hidden strokeWidth={2} />
    </span>
  );
}

/* Progresso */

export function ProgressBar({ value, max, label, className }: { value: number; max: number; label: string; className?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-chart-soft", className)}
    >
      <div className="h-full rounded-full bg-chart" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* Conteúdo ilustrativo */

/**
 * Marca um texto pedagógico como ILUSTRATIVO. Todo bloco de conteúdo da professora no
 * protótipo passa por aqui, para nunca parecer texto real do método.
 */
export function Illustrative({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-tile border border-dashed border-purple/25 bg-surface/40 px-4 py-3.5", className)}>
      <p className="mb-1.5 flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-purple">
        <PenLine aria-hidden className="size-3" strokeWidth={2.4} />
        Texto da professora · ilustrativo
      </p>
      <div className="text-[0.9rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

/* Delta (variação de métrica) */

export function Delta({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold",
        up ? "bg-success-soft text-success" : "bg-coral/10 text-coral-deep",
      )}
    >
      <span aria-hidden>{up ? "↑" : "↓"}</span>
      <span className="sr-only">{up ? "alta de" : "queda de"}</span>
      {Math.abs(value).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
    </span>
  );
}

/* Tabelas */

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("-mx-5 overflow-x-auto lg:-mx-6", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left text-[0.86rem]">{children}</table>
    </div>
  );
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={cn(
        "border-b border-hairline px-5 pb-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted first:pl-5 lg:px-6",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("border-b border-hairline px-5 py-3.5 align-middle text-ink lg:px-6", className)}>{children}</td>;
}
