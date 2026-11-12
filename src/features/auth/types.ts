/**
 * Tipos do acesso à plataforma. Ficam separados da tela para que o provedor de autenticação
 * escolhido depois (Auth.js, Supabase, Clerk, API própria...) só precise implementar
 * `AuthService` (services/auth-service.ts), sem mexer nos componentes.
 */

export type Credentials = {
  email: string;
  password: string;
};

/** Provedores de login social exibidos na tela. */
export type SocialProvider = "google" | "apple";

export type AuthErrorCode = "invalid-credentials" | "unavailable" | "network";

export type AuthResult = { ok: true; redirectTo: string } | { ok: false; code: AuthErrorCode; message: string };

export interface AuthService {
  signIn(credentials: Credentials): Promise<AuthResult>;
  signInWithProvider(provider: SocialProvider): Promise<AuthResult>;
  requestPasswordReset(email: string): Promise<AuthResult>;
}
