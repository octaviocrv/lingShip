import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Campos de formulário da Lingship (login hoje; cadastro, perfil e plataforma depois).
 *
 * As medidas vêm de variáveis CSS com valor padrão, para cada tela ajustar a escala sem
 * duplicar componente: --field-h, --field-radius, --field-px, --field-gap, --field-icon,
 * --field-text, --field-label e --field-label-gap. O login, por exemplo, liga essas variáveis
 * à escala fluida dele.
 */

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: ReactNode;
  htmlFor: string;
  /** mensagem de erro do campo; o input deve apontar para `${htmlFor}-erro` em aria-describedby */
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[var(--field-label-gap,0.5rem)]", className)}>
      <label htmlFor={htmlFor} className="text-[length:var(--field-label,0.9rem)] font-semibold leading-tight text-midnight">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-erro`} className="text-[length:var(--field-hint,0.78rem)] font-medium text-coral-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon;
  /** conteúdo à direita, dentro do campo (ex.: botão de mostrar senha) */
  trailing?: ReactNode;
  invalid?: boolean;
  wrapperClassName?: string;
};

/** Caixa do campo com ícone opcional à esquerda e espaço à direita. */
export function TextInput({ icon: Icon, trailing, invalid, wrapperClassName, className, ...props }: TextInputProps) {
  return (
    <div
      className={cn(
        "flex h-[var(--field-h,3.5rem)] items-center gap-[var(--field-gap,1rem)] rounded-[var(--field-radius,1rem)] border bg-white/65 px-[var(--field-px,1.25rem)] transition-[border-color,box-shadow,background-color] duration-200",
        "focus-within:border-purple/60 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgb(109_63_192/0.12)]",
        invalid ? "border-coral/70" : "border-[#ddd3e7] hover:border-purple/35",
        wrapperClassName,
      )}
    >
      {Icon && <Icon aria-hidden strokeWidth={1.7} className="size-[var(--field-icon,1.25rem)] shrink-0 text-midnight/85" />}
      <input
        aria-invalid={invalid || undefined}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent text-[length:var(--field-text,0.95rem)] text-ink outline-none placeholder:text-muted/85",
          className,
        )}
        {...props}
      />
      {trailing}
    </div>
  );
}
