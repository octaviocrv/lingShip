import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Layers, PlayCircle } from "lucide-react";
import { routes } from "@/config/routes";
import { brl } from "@/lib/format";
import { cn } from "@/lib/cn";
import { BtnLink, Pill, ProgressBar } from "../../components/ui";
import { duration, type CourseView } from "../course-progress";

const s = routes.platform.student;

/** Selo de progresso: "38%" ou "Concluído". */
function ProgressLine({ view }: { view: CourseView }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.78rem]">
        <span className="text-muted">
          {view.done} de {view.total} aulas
        </span>
        <span className="font-semibold text-midnight">{view.percent}%</span>
      </div>
      <ProgressBar value={view.done} max={view.total} label={`${view.course.title}: aulas concluídas`} />
    </div>
  );
}

/**
 * Card de curso. "grid" é o card em coluna (home); "row" é a linha larga com capa à esquerda
 * (página Meus cursos), que no celular vira coluna.
 */
export function CourseCard({ view, variant = "grid" }: { view: CourseView; variant?: "grid" | "row" }) {
  const { course, owned, next } = view;
  const modules = course.modules.length;
  const href = s.course(course.slug);
  const cta = owned ? (next ? s.lesson(course.slug, next.number) : href) : href;
  const ctaLabel = !owned ? "Conhecer o curso" : view.done === 0 ? "Começar" : next ? "Continuar" : "Rever o curso";

  const meta = (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.76rem] text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Layers aria-hidden className="size-3.5" />
        {modules} {modules === 1 ? "módulo" : "módulos"} · {view.total} aulas
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock aria-hidden className="size-3.5" />
        {duration(view.minutes)}
      </span>
    </p>
  );

  if (variant === "row") {
    return (
      <article className="grid overflow-hidden rounded-box bg-card shadow-card md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <Link href={href} className="relative block aspect-[16/9] md:aspect-auto md:min-h-60" tabIndex={-1} aria-hidden>
          <Image src={course.cover} alt="" fill sizes="(min-width: 768px) 300px, 100vw" className="object-cover" />
        </Link>
        <div className="flex flex-col p-5 lg:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="purple">Curso</Pill>
            {view.lastSeen && <span className="text-[0.74rem] text-muted">Estudado {view.lastSeen}</span>}
          </div>
          <h3 className="mt-3 font-serif text-[1.35rem] font-semibold leading-snug text-midnight">
            <Link href={href} className="hover:text-purple">
              {course.title}
            </Link>
          </h3>
          <p className="mt-1.5 max-w-2xl text-[0.88rem] leading-relaxed text-muted">{course.forWho}</p>
          <div className="mt-3">{meta}</div>
          {owned ? (
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-md">
                <ProgressLine view={view} />
                {next && (
                  <p className="mt-3 flex items-start gap-2 text-[0.84rem] text-ink">
                    <PlayCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-purple" />
                    <span>
                      <span className="text-muted">Próxima aula: </span>
                      <span className="font-semibold text-midnight">{next.question}</span>
                    </span>
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <BtnLink href={cta}>
                  {ctaLabel}
                  <ArrowRight aria-hidden />
                </BtnLink>
                <BtnLink href={href} variant="secondary">
                  Ver módulos
                </BtnLink>
              </div>
            </div>
          ) : (
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
              <span className="text-[1.2rem] font-semibold text-midnight">{brl(course.price)}</span>
              <BtnLink href={href} variant="secondary">
                {ctaLabel}
              </BtnLink>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-box bg-card shadow-card transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative aspect-[16/8] overflow-hidden">
        <Image src={course.cover} alt="" fill sizes="(min-width: 1280px) 26vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {meta}
        <h3 className="mt-2 font-serif text-[1.1rem] font-semibold leading-snug text-midnight">
          {/* link esticado: o card inteiro abre o curso */}
          <Link href={href} className="outline-none after:absolute after:inset-0 after:rounded-box focus-visible:after:outline-2 focus-visible:after:outline-purple">
            {course.title}
          </Link>
        </h3>
        <div className={cn("mt-auto pt-5", !owned && "hidden")}>
          <ProgressLine view={view} />
        </div>
      </div>
    </article>
  );
}
