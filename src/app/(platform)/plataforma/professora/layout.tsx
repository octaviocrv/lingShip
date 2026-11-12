import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { routes } from "@/config/routes";
import { PlatformShell } from "@/features/platform/components/shell/platform-shell";
import { BtnLink } from "@/features/platform/components/ui";
import { teacher } from "@/features/platform/content/teacher";

/** Painel da professora. */
export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <PlatformShell
      area="teacher"
      homeHref={routes.platform.teacher.home}
      searchAction={routes.platform.teacher.contents}
      searchPlaceholder="Buscar no acervo por pergunta"
      user={{ name: teacher.name, role: teacher.role, photo: teacher.photo }}
      sidebarFooter={<PublishCard />}
    >
      {children}
    </PlatformShell>
  );
}

function PublishCard() {
  return (
    <div className="relative overflow-hidden rounded-box bg-midnight p-5 text-snow">
      <span aria-hidden className="absolute -right-6 -top-8 font-logo text-[7rem] leading-none text-orange/25">
        ”
      </span>
      <p className="relative font-serif text-[1.05rem] font-semibold leading-snug">Uma explicação que você repete?</p>
      <p className="relative mt-1.5 text-[0.78rem] leading-relaxed text-snow/70">Grave uma vez e publique como conversa.</p>
      <BtnLink href={routes.platform.teacher.newContent} size="sm" className="relative mt-4 w-full">
        <Plus aria-hidden />
        Nova conversa
      </BtnLink>
    </div>
  );
}
