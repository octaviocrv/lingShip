import { routes } from "@/config/routes";
import type { AuthResult, AuthService } from "../types";
import { loginContent } from "../content/login";

/**
 * Serviço de autenticação da DEMONSTRAÇÃO: não há conta nem senha de verdade, então "Entrar"
 * (e Google/Apple) leva direto para a área do aluno do protótipo, sem validar nada.
 * Nada é enviado para fora.
 *
 * Para ligar a autenticação real, trocar esta implementação (ou criar outra com a mesma
 * interface `AuthService`) e só devolver `{ ok: true, redirectTo }` quando as credenciais
 * forem válidas. O formulário também volta a validar os campos (ver login-form.tsx).
 */
const enterDemo = (): Promise<AuthResult> => Promise.resolve({ ok: true, redirectTo: routes.platform.student.home });

export const authService: AuthService = {
  signIn: enterDemo,
  signInWithProvider: enterDemo,
  requestPasswordReset: () =>
    Promise.resolve({ ok: false, code: "unavailable", message: loginContent.notices.passwordReset }),
};
