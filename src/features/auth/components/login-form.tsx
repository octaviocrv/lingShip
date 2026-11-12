"use client";

import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Info, Mail } from "lucide-react";
import { AppleIcon, GoogleIcon } from "@/components/icons/brand-icons";
import { Field, TextInput } from "@/components/ui/form/text-field";
import { PasswordInput } from "@/components/ui/form/password-input";
import { homeAnchors } from "@/config/routes";
import { cn } from "@/lib/cn";
import { loginContent } from "../content/login";
import { authService } from "../services/auth-service";
import type { AuthResult, SocialProvider } from "../types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * DEMONSTRAÇÃO: o login não valida nada; "Entrar" leva direto para a plataforma (mesmo com os
 * campos vazios). Quando houver autenticação real, trocar para `true` e ajustar o authService.
 */
const VALIDATE_FIELDS = false;

/**
 * Escala do formulário. Tudo é múltiplo de --auth-fs (corpo do texto, fluido) e mantém a
 * proporção da referência: campo 3,3x a altura do texto, raio ~1x, etc. Espaços verticais
 * usam --s (passo que encolhe em telas baixas). Ver "auth-scale" em globals.css.
 */
const fieldScale = {
  "--field-h": "calc(var(--auth-fs) * 3.3)",
  "--field-radius": "calc(var(--auth-fs) * 0.97)",
  "--field-px": "calc(var(--auth-fs) * 1.43)",
  "--field-gap": "calc(var(--auth-fs) * 1.37)",
  "--field-icon": "calc(var(--auth-fs) * 1.37)",
  "--field-text": "var(--auth-fs)",
  "--field-label": "calc(var(--auth-fs) * 1.086)",
  "--field-label-gap": "calc(var(--s) * 0.42)",
  "--field-hint": "calc(var(--auth-fs) * 0.83)",
} as CSSProperties;

type Errors = { email?: string; password?: string };

/**
 * Formulário de login (lado direito da referência). A autenticação real ainda não existe:
 * na demonstração, o `authService` leva direto para a plataforma e os campos não são
 * validados (VALIDATE_FIELDS). Quando houver backend, ligar a validação e o serviço real.
 */
export function LoginForm() {
  const { form, errors: messages } = loginContent;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const validate = (): Errors => {
    const next: Errors = {};
    const value = email.trim();
    if (!value) next.email = messages.emailRequired;
    else if (!EMAIL_PATTERN.test(value)) next.email = messages.emailInvalid;
    if (!password) next.password = messages.passwordRequired;
    return next;
  };

  const handle = async (run: () => Promise<AuthResult>) => {
    setPending(true);
    setNotice(null);
    try {
      const result = await run();
      if (result.ok) window.location.assign(result.redirectTo);
      else setNotice(result.message);
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (VALIDATE_FIELDS) {
      const found = validate();
      setErrors(found);
      if (found.email || found.password) {
        document.getElementById(found.email ? "login-email" : "login-senha")?.focus();
        return;
      }
    }
    void handle(() => authService.signIn({ email: email.trim(), password }));
  };

  const social = (provider: SocialProvider) => handle(() => authService.signInWithProvider(provider));

  return (
    <div style={fieldScale} className="w-full text-[length:var(--auth-fs)]">
      {/* rótulo: traço laranja + texto, alinhados à mesma margem esquerda do título e dos campos */}
      <p className="auth-in flex items-center gap-[1.73em] text-[0.857em] font-bold uppercase leading-[1.2] tracking-[0.25em] text-purple-ink [--d:300ms]">
        <span aria-hidden className="auth-line h-[max(1.5px,0.17em)] w-[3.33em] shrink-0 bg-orange [--d:450ms]" />
        {loginContent.form.eyebrow}
      </p>

      <h1 className="auth-in mt-[calc(var(--s)*1.9)] text-balance font-serif text-[3.03em] font-semibold leading-[1.1] tracking-[-0.005em] text-ink-deep [--d:400ms]">
        {form.title}
      </h1>

      <form
        noValidate
        onSubmit={onSubmit}
        className="mt-[calc(var(--s)*2.4)]"
        aria-describedby={notice ? "login-aviso" : undefined}
      >
        <Field label={form.email.label} htmlFor="login-email" error={errors.email} className="auth-in [--d:520ms]">
          <TextInput
            id="login-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={form.email.placeholder}
            icon={Mail}
            value={email}
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-erro" : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
        </Field>

        <Field
          label={form.password.label}
          htmlFor="login-senha"
          error={errors.password}
          className="auth-in mt-[calc(var(--s)*1.6)] [--d:600ms]"
        >
          <PasswordInput
            id="login-senha"
            name="password"
            autoComplete="current-password"
            placeholder={form.password.placeholder}
            value={password}
            invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "login-senha-erro" : undefined}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
        </Field>

        {/* alinhado à borda direita dos campos */}
        <div className="auth-in mt-[calc(var(--s)*1)] flex justify-end [--d:680ms]">
          <button
            type="button"
            disabled={pending}
            onClick={() => handle(() => authService.requestPasswordReset(email.trim()))}
            className="cursor-pointer rounded-md text-[0.971em] font-semibold leading-[1.3] text-purple-ink underline-offset-4 transition-colors hover:text-purple hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple disabled:cursor-default"
          >
            {form.forgotPassword}
          </button>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="auth-in mt-[calc(var(--s)*2.6)] flex h-[2.8em] w-full cursor-pointer items-center justify-center rounded-full bg-orange text-[1.143em] font-bold text-ink-deep shadow-[0_0.55em_1.4em_rgb(249_115_22/0.22)] transition-[background-color,translate] duration-300 [--d:760ms] hover:-translate-y-0.5 hover:bg-orange-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-purple disabled:cursor-progress disabled:opacity-80 disabled:hover:translate-y-0"
        >
          {pending ? form.submitting : form.submit}
        </button>
      </form>

      {/* aviso do serviço (hoje: plataforma ainda não aberta) */}
      <div aria-live="polite">
        {notice && (
          <p
            id="login-aviso"
            className="auth-in mt-[calc(var(--s)*1)] flex items-start gap-[0.75em] rounded-[1em] border border-purple/15 bg-white/70 px-[1.1em] py-[0.85em] text-[0.9em] leading-[1.55] text-ink"
          >
            <Info aria-hidden className="mt-[0.15em] size-[1.25em] shrink-0 text-purple" />
            {notice}
          </p>
        )}
      </div>

      {/* divisória: o texto no centro, linhas iguais dos dois lados */}
      <div className="mt-[calc(var(--s)*2.3)] grid grid-cols-[1fr_auto_1fr] items-center gap-[2.45em]">
        <span aria-hidden className="auth-line-end h-px bg-[#d8d1db] [--d:900ms]" />
        <span className="auth-in text-[0.943em] leading-[1.2] text-[#7e7185] [--d:840ms]">{form.divider}</span>
        <span aria-hidden className="auth-line h-px bg-[#d8d1db] [--d:900ms]" />
      </div>

      <div className="mt-[calc(var(--s)*1.65)] grid grid-cols-2 gap-[1.31em]">
        <SocialButton
          className="[--d:940ms]"
          onClick={() => social("google")}
          disabled={pending}
          icon={<GoogleIcon className="size-[1.6em]" />}
        >
          {form.providers.google}
        </SocialButton>
        <SocialButton
          className="[--d:1020ms]"
          onClick={() => social("apple")}
          disabled={pending}
          icon={<AppleIcon className="size-[1.6em] text-black" />}
        >
          {form.providers.apple}
        </SocialButton>
      </div>

      <p className="auth-in mt-[calc(var(--s)*2.6)] flex flex-wrap items-baseline justify-center gap-x-[1em] gap-y-[0.3em] text-center text-[0.971em] text-ink-deep [--d:1100ms]">
        {form.signUpQuestion}
        <a
          href={homeAnchors.planos}
          className="rounded-md text-[1.15em] font-bold text-purple-ink underline-offset-4 transition-colors hover:text-purple hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          {form.signUpCta}
        </a>
      </p>
    </div>
  );
}

function SocialButton({
  icon,
  children,
  onClick,
  disabled,
  className,
}: {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "auth-in flex h-[3.3em] min-w-0 cursor-pointer items-center justify-center gap-[0.95em] rounded-full border border-[#e9e1ed] bg-white/60 px-[1em] text-[0.971em] font-medium text-[#1e193f]",
        "shadow-[0_0.45em_1.4em_rgb(43_33_64/0.06)] transition-[background-color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-purple/25 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple disabled:cursor-progress",
        className,
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{children}</span>
    </button>
  );
}
