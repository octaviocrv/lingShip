import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";
import { PlatformShell } from "@/features/platform/components/shell/platform-shell";
import { BtnLink } from "@/features/platform/components/ui";
import { student } from "@/features/platform/content/student";

/** Área do aluno. */
export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <PlatformShell
      area="student"
      homeHref={routes.platform.student.home}
      searchAction={routes.platform.student.conversations}
      searchPlaceholder="Busque com suas palavras: “como sair do good”"
      user={{ name: student.name, role: student.plan, initials: student.initials }}
      sidebarFooter={<MentoringCard />}
    >
      {children}
    </PlatformShell>
  );
}

/**
 * Convite da mentoria no pé da barra lateral (o "Level up" da referência). Os encontros ao
 * vivo ficam só na home, para a informação não se repetir.
 */
function MentoringCard() {
  return (
    <div className="relative overflow-hidden rounded-box bg-midnight p-5 text-snow">
      <Image
        src="/images/platform/vanessa-avatar.webp"
        alt=""
        width={48}
        height={48}
        className="size-12 rounded-full object-cover ring-2 ring-orange"
      />
      <span aria-hidden className="absolute -right-5 -top-9 font-logo text-[7rem] leading-none text-orange/20">
        ”
      </span>
      <p className="relative mt-4 font-serif text-[1.05rem] font-semibold leading-snug">Quer um olhar individual?</p>
      <p className="relative mt-1.5 text-[0.78rem] leading-relaxed text-snow/70">Na mentoria, a Vanessa acompanha suas produções de perto.</p>
      <BtnLink href={routes.platform.student.mentoring} size="sm" className="relative mt-4 w-full">
        Conhecer a mentoria
        <ArrowRight aria-hidden />
      </BtnLink>
    </div>
  );
}
