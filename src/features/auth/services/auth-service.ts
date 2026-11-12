import type { AuthResult, AuthService } from "../types";
import { loginContent } from "../content/login";

/**
 * Serviço de autenticação provisório: a plataforma ainda não existe, então toda tentativa
 * responde que o acesso não está disponível, sem fingir sucesso. Nada é enviado para fora.
 *
 * Para ligar a autenticação real, trocar esta implementação (ou criar outra com a mesma
 * interface `AuthService`) e devolver `{ ok: true, redirectTo }` quando der certo.
 */
const unavailable = (message: string): Promise<AuthResult> =>
  Promise.resolve({ ok: false, code: "unavailable", message });

export const authService: AuthService = {
  signIn: () => unavailable(loginContent.notices.unavailable),
  signInWithProvider: () => unavailable(loginContent.notices.unavailable),
  requestPasswordReset: () => unavailable(loginContent.notices.passwordReset),
};
