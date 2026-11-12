import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, FileText, Flag, FolderHeart, Layers, Mic, Target, Users } from "lucide-react";
import { routes } from "@/config/routes";
import { brl } from "@/lib/format";
import type { Course } from "../content/catalog";
import { productions } from "../content/student";
import { BtnLink, Card, CardHeader, CardLink, IconTile, PageHeader, ProgressBar } from "../components/ui";
import { CourseCard } from "./components/course-card";
import { ModuleAccordion } from "./components/lesson-list";
import { courseView, duration, myCourses, otherCourses } from "./course-progress";

const s = routes.platform.student;

/** Meus cursos: os cursos adquiridos em linhas largas, com progresso e próxima aula. */
export function MyCourses() {
  const mine = myCourses();
  const others = otherCourses();

  return (
    <>
      <PageHeader
        title="Meus cursos"
        description="Cada curso é uma conversa que se aprofunda, organizada em módulos e aulas-pergunta."
      />

      <div className="space-y-6">
        {mine.map((view) => (
          <CourseCard key={view.course.slug} view={view} variant="row" />
        ))}
      </div>

      {others.length > 0 && (
        <section aria-labelledby="outros" className="mt-12">
          <h2 id="outros" className="mb-4 font-sans text-[1.1rem] font-semibold text-midnight">
            Outros cursos da Vanessa
          </h2>
          <div className="space-y-6">
            {others.map((view) => (
              <CourseCard key={view.course.slug} view={view} variant="row" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/** Página do curso: módulos expansíveis no centro, informações do curso na lateral. */
export function CoursePage({ course }: { course: Course }) {
  const view = courseView(course);
  const { owned, next } = view;
  const recent = productions.slice(0, 3);

  return (
    <div>
      <Link href={s.courses} className="mb-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple hover:text-purple-deep">
        <ArrowLeft aria-hidden className="size-4" />
        Meus cursos
      </Link>

      {/* Cabeçalho do curso */}
      <Card className="mb-8 grid gap-6 p-4 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:p-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-tile md:aspect-auto">
          <Image src={course.cover} alt="" fill priority sizes="(min-width: 768px) 260px, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col p-1 md:py-3 md:pr-4">
          <p className="text-[0.78rem] font-semibold text-purple">Curso</p>
          <h1 className="mt-1.5 font-serif text-[clamp(1.6rem,1.2rem+1.3vw,2.3rem)] font-semibold leading-[1.15] text-midnight">{course.title}</h1>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.82rem] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Layers aria-hidden className="size-4" />
              {course.modules.length} módulos · {view.total} aulas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="size-4" />
              {duration(view.minutes)} de conversa
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users aria-hidden className="size-4" />
              Com a Vanessa
            </span>
          </p>

          {owned ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-md">
                <div className="mb-1.5 flex justify-between text-[0.8rem]">
                  <span className="text-muted">
                    {view.done} de {view.total} aulas concluídas
                  </span>
                  <span className="font-semibold text-midnight">{view.percent}%</span>
                </div>
                <ProgressBar value={view.done} max={view.total} label="Aulas concluídas no curso" />
              </div>
              {next && (
                <BtnLink href={s.lesson(course.slug, next.number)} variant="dark">
                  {view.done ? `Continuar: aula ${next.number}` : "Começar o curso"}
                  <ArrowRight aria-hidden />
                </BtnLink>
              )}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-[1.5rem] font-semibold text-midnight">{brl(course.price)}</span>
              <BtnLink href={s.purchases}>Comprar curso</BtnLink>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
        <section aria-labelledby="modulos" className="min-w-0">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="modulos" className="font-sans text-[1.1rem] font-semibold text-midnight">
              Módulos e aulas
            </h2>
            <p className="text-[0.78rem] text-muted">Você pode abrir qualquer aula, na ordem que fizer sentido.</p>
          </div>
          <div className="space-y-4">
            {view.modules.map((m) => (
              <ModuleAccordion
                key={m.number}
                module={m}
                courseSlug={course.slug}
                linkable={owned}
                defaultOpen={owned ? m.hasNext : m.number === 1}
              />
            ))}
          </div>
        </section>

        <aside className="space-y-6" aria-label="Sobre o curso">
          <Card>
            <CardHeader title="Sobre o curso" />
            <p className="text-[0.88rem] leading-relaxed text-ink">{course.forWho}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-tile bg-canvas p-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral-deep">Hoje</p>
                <p className="mt-1 text-[0.86rem] leading-relaxed text-ink">{course.today}</p>
              </div>
              <div className="rounded-tile bg-lilac p-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-purple">Depois do curso</p>
                <p className="mt-1 text-[0.86rem] leading-relaxed text-ink">{course.after}</p>
              </div>
            </div>
            <p className="mt-3 text-[0.72rem] text-muted">Textos de apresentação ilustrativos.</p>
          </Card>

          <Card>
            <CardHeader title="Seu portfólio" icon={FolderHeart} description="Do primeiro áudio à produção final." />
            <ul className="space-y-2.5">
              <PortfolioRow icon={Flag} title="Linha de base" text={owned && view.done ? "Gravada na aula 1" : "Na primeira aula"} done={owned && view.done > 0} />
              <PortfolioRow
                icon={Mic}
                title="Produções escolhidas"
                text={owned ? `${view.productions} de até 3` : "Ao longo do curso"}
                done={owned && view.productions > 0}
              />
              <PortfolioRow icon={Target} title="Produção final" text="Na última aula, para comparar com o início" done={false} />
            </ul>
          </Card>

          {owned && (
            <Card>
              <CardHeader title="Produções recentes" action={<CardLink href={s.journey}>Percurso</CardLink>} />
              <ul className="space-y-3.5">
                {recent.map((x) => (
                  <li key={x.id} className="flex items-start gap-3">
                    <IconTile icon={x.kind === "Áudio" ? Mic : FileText} size="sm" tone={x.kind === "Áudio" ? "orange" : "purple"} />
                    <div className="min-w-0">
                      <p className="text-[0.86rem] font-semibold text-midnight">{x.title}</p>
                      <p className="text-[0.74rem] text-muted">
                        {x.kind} · {x.detail} · {x.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}

function PortfolioRow({ icon, title, text, done }: { icon: typeof Flag; title: string; text: string; done: boolean }) {
  return (
    <li className="flex items-center gap-3 rounded-tile bg-canvas px-3.5 py-3">
      <IconTile icon={icon} size="sm" tone={done ? "success" : "purple"} />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.86rem] font-semibold text-midnight">{title}</span>
        <span className="block text-[0.74rem] text-muted">{text}</span>
      </span>
      {done && <CheckCircle2 aria-label="Feito" className="size-4 text-success" />}
    </li>
  );
}
