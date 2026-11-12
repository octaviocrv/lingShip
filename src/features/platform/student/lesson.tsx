import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, MessagesSquare, PenLine, PlayCircle, Sparkles } from "lucide-react";
import { routes } from "@/config/routes";
import { getConversation, illustrativeBody, type Course } from "../content/catalog";
import { formatIcon } from "../components/conversation-card";
import { BtnLink, Card, CardHeader, Illustrative, Pill, ProgressBar } from "../components/ui";
import { LessonList } from "./components/lesson-list";
import { VideoPlayer } from "./components/video-player";
import { courseView } from "./course-progress";
import { LessonComplete } from "./lesson-complete";
import { PracticeForm } from "./practice-form";

const s = routes.platform.student;

/**
 * Aula do curso. O conteúdo da aula é a conversa ligada a ela (quando há) e a prática
 * proposta; a lateral mostra a trilha do curso para o aluno saber onde está.
 */
export function LessonPage({ course, number }: { course: Course; number: number }) {
  const view = courseView(course);
  const lessons = view.modules.flatMap((m) => m.lessons);
  const lesson = lessons[number - 1];
  const lessonModule = view.modules.find((m) => m.lessons.some((l) => l.index === lesson.index))!;
  const prev = lessons[number - 2];
  const next = lessons[number];
  const conversation = lesson.conversation ? getConversation(lesson.conversation) : undefined;
  const FormatIcon = conversation ? formatIcon[conversation.format] : PlayCircle;

  return (
    <div>
      <nav aria-label="Você está em" className="mb-5 flex flex-wrap items-center gap-1.5 text-[0.82rem] text-muted">
        <Link href={s.courses} className="font-semibold text-purple hover:text-purple-deep">
          Meus cursos
        </Link>
        <ChevronRight aria-hidden className="size-3.5" />
        <Link href={s.course(course.slug)} className="font-semibold text-purple hover:text-purple-deep">
          {course.title}
        </Link>
        <ChevronRight aria-hidden className="size-3.5" />
        <span>Módulo {lessonModule.number}</span>
      </nav>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
        <div className="min-w-0 space-y-6">
          <div>
            <p className="text-[0.8rem] font-semibold text-purple">
              Aula {lesson.number} de {view.total} · {lessonModule.title}
            </p>
            <h1 className="mt-2 font-serif text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-semibold leading-[1.15] text-midnight">
              {lesson.question}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.84rem] text-muted">
              {lesson.minutes} min
              {lesson.practice && <Pill tone="orange">{lesson.practice}</Pill>}
              {lesson.state === "concluida" && <Pill tone="success">Concluída</Pill>}
            </p>
          </div>

          <VideoPlayer
            poster={conversation?.cover ?? course.cover}
            icon={FormatIcon}
            label={`${conversation?.format ?? "Vídeo"} · ${lesson.minutes} min`}
          />

          <Card>
            <CardHeader title="Sobre esta aula" icon={Sparkles} />
            <Illustrative>
              {conversation
                ? illustrativeBody(conversation).why
                : "Aqui a Vanessa apresenta a aula: o que ela propõe, por que agora e como ela se liga às anteriores."}
            </Illustrative>
            {conversation && (
              <Link
                href={s.conversation(conversation.slug)}
                className="group mt-4 flex items-center gap-3 rounded-tile border border-hairline p-4 transition-colors hover:border-purple/30 hover:bg-snow"
              >
                <MessagesSquare aria-hidden className="size-5 shrink-0 text-purple" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.74rem] text-muted">Esta aula usa a conversa completa, com cena, estratégia e exemplos</span>
                  <span className="block text-[0.9rem] font-semibold text-midnight group-hover:text-purple">{conversation.question}</span>
                </span>
                <ArrowRight aria-hidden className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-purple" />
              </Link>
            )}
          </Card>

          {lesson.practice && (
            <Card>
              <CardHeader title="Prática da aula" icon={PenLine} description={`${lesson.practice}. Fica no seu portfólio do curso.`} />
              <PracticeForm />
            </Card>
          )}

          {/* navegação entre aulas */}
          <div className="flex flex-col-reverse gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <BtnLink href={s.lesson(course.slug, prev.number)} variant="ghost" className="justify-start px-2">
                <ArrowLeft aria-hidden />
                Aula {prev.number}
              </BtnLink>
            ) : (
              <span />
            )}
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <LessonComplete initial={lesson.state === "concluida"} />
              {next ? (
                <BtnLink href={s.lesson(course.slug, next.number)}>
                  Próxima aula
                  <ArrowRight aria-hidden />
                </BtnLink>
              ) : (
                <BtnLink href={s.course(course.slug)}>Voltar ao curso</BtnLink>
              )}
            </div>
          </div>
        </div>

        {/* trilha do curso */}
        <aside aria-label="Aulas do curso" className="xl:sticky xl:top-[calc(var(--demo-bar-h,0px)+1.5rem)] xl:self-start">
          <Card className="p-4 lg:p-5">
            <div className="mb-4 px-1">
              <p className="text-[0.74rem] font-semibold text-muted">Seu progresso</p>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar value={view.done} max={view.total} label="Aulas concluídas no curso" />
                <span className="text-[0.8rem] font-semibold tabular-nums text-midnight">{view.percent}%</span>
              </div>
            </div>
            <div className="max-h-[calc(100svh-var(--demo-bar-h,0px)-12rem)] space-y-4 overflow-y-auto pr-1 max-xl:max-h-none">
              {view.modules.map((m) => (
                <div key={m.number}>
                  <p className="mb-1 px-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-purple">
                    Módulo {m.number} · {m.title}
                  </p>
                  <LessonList lessons={m.lessons} courseSlug={course.slug} compact currentIndex={lesson.index} />
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
