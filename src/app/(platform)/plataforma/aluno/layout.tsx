import type { ReactNode } from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { routes } from "@/config/routes";
import { PlatformShell } from "@/features/platform/components/shell/platform-shell";
import { BtnLink } from "@/features/platform/components/ui";
import { liveMeeting, student } from "@/features/platform/content/student";

/** Área do aluno. */
export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <PlatformShell
      area="student"
      homeHref={routes.platform.student.home}
      searchAction={routes.platform.student.conversations}
      searchPlaceholder="Busque com suas palavras: “como sair do good”"
      user={{ name: student.name, role: student.plan, initials: student.initials }}
      sidebarFooter={<LiveCard />}
    >
      {children}
    </PlatformShell>
  );
}

/** Cartão do encontro ao vivo no pé da barra lateral (o "Upgrade to Pro" da referência). */
function LiveCard() {
  return (
    <div className="overflow-hidden rounded-box bg-lilac">
      <div className="relative h-24">
        <Image src={liveMeeting.photo} alt="Vanessa em sala de aula" fill sizes="224px" className="object-cover object-[50%_30%]" />
        <span className="absolute left-3 top-3 rounded-full bg-midnight/85 px-2.5 py-1 text-[0.66rem] font-semibold text-snow">
          Ao vivo
        </span>
      </div>
      <div className="p-4">
        <p className="font-serif text-[1rem] font-semibold leading-snug text-midnight">Encontro do mês com a Vanessa</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.76rem] text-ink">
          <CalendarDays aria-hidden className="size-3.5 text-purple" />
          {liveMeeting.date.replace("Qui, ", "")} · 19h
        </p>
        <BtnLink href={routes.platform.student.home} size="sm" className="mt-3.5 w-full">
          Garantir meu lugar
        </BtnLink>
      </div>
    </div>
  );
}
