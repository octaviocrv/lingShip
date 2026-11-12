import type { ReactNode } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";

/**
 * Grupo das telas de acesso (login hoje; cadastro e recuperação de senha depois).
 * Fica separado do site institucional: sem cabeçalho, rodapé, abertura nem trilha sonora.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
