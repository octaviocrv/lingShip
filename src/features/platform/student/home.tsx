import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, CalendarDays, Check, Radio } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { getConversation, situationLabel } from "../content/catalog";
import { liveMeeting, student, upcomingMeetings } from "../content/student";
import { formatIcon } from "../components/conversation-card";
import { BtnLink, Card, CardHeader, CardLink, IconTile, Pill, ProgressBar } from "../components/ui";
import { CourseCard } from "./components/course-card";
import { LessonList } from "./components/lesson-list";
import { myCourses, type CourseView, type ModuleView } from "./course-progress";

const s = routes.platform.student;

/**
 * Início do aluno. Uma pergunta guia a tela: "onde eu continuo?".
 * 1) destaque da próxima aula; 2) o módulo atual em trilha; 3) meus cursos;
 * lateral: próximos encontros e conversas salvas.
 */
export function StudentHome() {
  const courses = myCourses();
  const current = courses.find((c) => c.next) ?? courses[0];
  const saved = student.saved
    .map(getConversation)
    .filter((c) => c !== undefined)
    .slice(0, 3);

  return (
    <div className="space-y-8 lg:space-y-10">
      <ContinueHero view={current} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
        <div className="min-w-0 space-y-8 lg:space-y-10">
          {current.nextModule && <CurrentModule view={current} module={current.nextModule} />}

          <section aria-labelledby="meus-cursos">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="meus-cursos" className="font-sans text-[1.1rem] font-semibold text-midnight">
                Meus cursos
              </h2>
              <CardLink href={s.courses}>Ver todos</CardLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {courses.map((view) => (
                <CourseCard key={view.course.slug} view={view} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6" aria-label="Agenda e salvos">
          <Card>
            <CardHeader title="Encontro do mês com a Vanessa" icon={Radio} />
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-tile">
              <Image
                src={liveMeeting.photo}
                alt="Vanessa em sala de aula"
                fill
                sizes="(min-width: 1280px) 320px, 90vw"
                className="object-cover object-[50%_30%]"
              />
              <span className="absolute left-3 top-3">
                <Pill tone="dark">Ao vivo · {liveMeeting.registered} confirmados</Pill>
              </span>
            </div>
            <ul className="space-y-4">
              {upcomingMeetings.map((m, i) => (
                <li key={m.when}>
                  <p className="mb-2 text-[0.74rem] font-semibold text-muted">{i === 0 ? "Próximo" : "Depois"}</p>
                  <div className="rounded-tile bg-canvas p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.9rem] font-semibold text-midnight">{m.theme}</p>
                      <Pill tone="orange" className="shrink-0">
                        {m.kind}
                      </Pill>
                    </div>
                    <p className="mt-2.5 flex items-center gap-1.5 text-[0.78rem] text-muted">
                      <CalendarDays aria-hidden className="size-3.5" />
                      {m.when} · {m.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <BtnLink href={s.home} variant="soft" size="sm" className="mt-5 w-full">
              Confirmar presença no próximo
            </BtnLink>
          </Card>

          <Card>
            <CardHeader title="Salvas para retomar" icon={Bookmark} action={<CardLink href={s.journey}>Ver todas</CardLink>} />
            <ul className="-my-1 divide-y divide-hairline">
              {saved.map((c) => {
                const Icon = formatIcon[c.format];
                return (
                  <li key={c.slug}>
                    <Link href={s.conversation(c.slug)} className="group flex items-center gap-3.5 py-3">
                      <IconTile icon={Icon} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.86rem] font-semibold leading-snug text-midnight group-hover:text-purple">
                          {c.question}
                        </span>
                        <span className="block text-[0.74rem] text-muted">
                          {situationLabel(c.situations[0])} · {c.minutes} min
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}

/** Destaque: a próxima aula + os módulos do curso em blocos numerados (como a referência). */
function ContinueHero({ view }: { view: CourseView }) {
  const { course, next } = view;
  const currentIdx = view.modules.findIndex((m) => m.hasNext);
  // até 3 blocos: o anterior, o atual e o seguinte
  const start = Math.max(0, Math.min(currentIdx - 1, view.modules.length - 3));
  const tiles = view.modules.slice(start, start + 3);

  return (
    <section
      aria-labelledby="continuar"
      className="grid overflow-hidden rounded-box bg-[linear-gradient(120deg,var(--color-lilac)_0%,var(--color-blush)_100%)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <p className="text-[0.95rem] text-ink">Olá, {student.firstName}.</p>
        <p className="mt-5 text-[0.78rem] font-semibold text-purple">
          Continue de onde parou · Módulo {view.nextModule?.number}
        </p>
        <h1 id="continuar" className="mt-2 font-serif text-[clamp(1.7rem,1.25rem+1.6vw,2.6rem)] font-semibold leading-[1.12] text-midnight">
          {next?.question ?? course.title}
        </h1>
        <p className="mt-3 text-[0.9rem] text-muted">
          Aula {next?.number} de {view.total} · {next?.minutes} min · {course.title}
        </p>
        <div className="mt-6 max-w-sm">
          <ProgressBar value={view.done} max={view.total} label="Aulas concluídas no curso" className="bg-white/70" />
          <p className="mt-2 text-[0.76rem] text-muted">
            {view.done} de {view.total} aulas · {view.productions} produções no portfólio
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <BtnLink href={next ? routes.platform.student.lesson(course.slug, next.number) : s.course(course.slug)} variant="dark">
            Continuar aula
            <ArrowRight aria-hidden />
          </BtnLink>
          <BtnLink href={s.course(course.slug)} variant="secondary" className="border-transparent bg-white/70">
            Ver o curso
          </BtnLink>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 p-4 pt-0 sm:gap-3 sm:p-6 sm:pt-0 lg:p-6 lg:pl-0">
        {tiles.map((m) => (
          <ModuleTile key={m.number} module={m} href={s.course(course.slug)} />
        ))}
      </div>
    </section>
  );
}

function ModuleTile({ module: m, href }: { module: ModuleView; href: string }) {
  const complete = m.done === m.total;
  const tone = m.hasNext ? "bg-orange text-midnight" : complete ? "bg-card text-midnight" : "bg-purple text-snow";
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-36 flex-col overflow-hidden rounded-tile p-3.5 transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-52 sm:p-4 lg:min-h-full",
        tone,
      )}
    >
      <span className="text-[0.74rem] font-semibold opacity-80">{String(m.number).padStart(2, "0")}</span>
      <span className="mt-2 font-serif text-[0.95rem] font-semibold leading-tight sm:text-[1.15rem]">{m.title}</span>
      <span className="mt-auto pt-4 text-[0.7rem] font-semibold sm:text-[0.74rem]">
        {complete ? (
          <span className="inline-flex items-center gap-1">
            <Check aria-hidden className="size-3.5" strokeWidth={3} />
            Concluído
          </span>
        ) : m.hasNext ? (
          "Você está aqui"
        ) : (
          `${m.total} ${m.total === 1 ? "aula" : "aulas"}`
        )}
      </span>
      {/* aspas da marca como grafismo do bloco */}
      <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-2 font-logo text-[7rem] leading-none opacity-15">
        ”
      </span>
    </Link>
  );
}

/** Módulo atual em trilha (a lista "Work and office" da referência). */
function CurrentModule({ view, module: m }: { view: CourseView; module: ModuleView }) {
  return (
    <Card as="section" className="lg:p-7">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 px-1">
        <div>
          <p className="text-[0.76rem] font-semibold text-muted">
            Módulo {m.number} · {view.course.title}
          </p>
          <h2 className="mt-1 font-serif text-[1.35rem] font-semibold leading-snug text-midnight">{m.title}</h2>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-56">
          <ProgressBar value={m.done} max={m.total} label={`Módulo ${m.number}: aulas concluídas`} />
          <span className="text-[0.8rem] font-semibold tabular-nums text-midnight">{Math.round((m.done / m.total) * 100)}%</span>
        </div>
      </div>
      <LessonList lessons={m.lessons} courseSlug={view.course.slug} />
      <div className="mt-4 border-t border-hairline px-1 pt-4">
        <CardLink href={s.course(view.course.slug)}>Ver todos os módulos do curso</CardLink>
      </div>
    </Card>
  );
}
