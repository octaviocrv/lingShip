import type { ReactNode } from "react";
import { routes } from "@/config/routes";
import { PlatformShell } from "@/features/platform/components/shell/platform-shell";
import { student } from "@/features/platform/content/student";

/** Área do aluno. */
export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <PlatformShell
      area="student"
      homeHref={routes.platform.student.home}
      searchAction={routes.platform.student.conversations}
      searchPlaceholder="Busque com suas palavras: “como sair do good”"
      showSearch={false}
      user={{ name: student.name, role: student.plan, initials: student.initials }}
    >
      {children}
    </PlatformShell>
  );
}

