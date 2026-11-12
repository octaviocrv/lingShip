import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, GraduationCap, Pencil, Plus, Users, Wallet } from "lucide-react";
import { routes } from "@/config/routes";
import { brl, brlShort, int } from "@/lib/format";
import { courses } from "../content/catalog";
import { Btn, BtnLink, Card, PageHeader, Pill } from "../components/ui";

export function TeacherCourses() {
  return (
    <>
      <PageHeader
        title="Cursos"
        description="Monte e reorganize cursos a partir das conversas do acervo."
        actions={
          <Btn>
            <Plus aria-hidden />
            Novo curso
          </Btn>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.slug} as="article" className="flex flex-col p-0 lg:p-0">
            <div className="relative aspect-[16/8] overflow-hidden rounded-t-box">
              <Image src={c.cover} alt="" fill sizes="(min-width: 1536px) 30vw, 50vw" className="object-cover" />
              <span className="absolute left-4 top-4">
                {c.status === "publicado" ? (
                  <Pill tone="success" icon={CheckCircle2} className="bg-success-soft/95">
                    Publicado
                  </Pill>
                ) : (
                  <Pill tone="warning" icon={Pencil} className="bg-warning-soft/95">
                    Rascunho
                  </Pill>
                )}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 lg:p-6">
              <h2 className="font-serif text-[1.25rem] font-semibold leading-snug text-midnight">
                <Link href={routes.platform.teacher.course(c.slug)} className="hover:text-purple">
                  {c.title}
                </Link>
              </h2>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <Stat icon={BookOpen} value={String(c.lessons.length)} label="aulas" />
                <Stat icon={Users} value={int(c.enrolled)} label="matrículas" />
                <Stat icon={Wallet} value={c.enrolled ? brlShort(c.enrolled * c.price) : "–"} label="receita" />
              </div>
              <p className="mt-4 flex items-center gap-2 text-[0.8rem] text-muted">
                <GraduationCap aria-hidden className="size-4" />
                {c.completed ? `${c.completed} concluíram com produção final` : "Ainda sem alunos"} · {brl(c.price)}
              </p>
              <div className="mt-auto pt-5">
                <BtnLink href={routes.platform.teacher.course(c.slug)} variant="secondary" size="sm">
                  <Pencil aria-hidden />
                  Editar estrutura
                </BtnLink>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="rounded-tile bg-canvas px-2 py-3">
      <Icon aria-hidden className="mx-auto size-4 text-purple" />
      <p className="mt-1.5 text-[1rem] font-semibold text-midnight">{value}</p>
      <p className="text-[0.7rem] text-muted">{label}</p>
    </div>
  );
}
