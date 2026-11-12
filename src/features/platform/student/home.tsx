import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  CalendarPlus,
  MessagesSquare,
  Mic,
  PlayCircle,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";
import { routes } from "@/config/routes";
import { getConversation, getCourse, publishedConversations, situationLabel } from "../content/catalog";
import { liveMeeting, situationPrompts, student, studentStats } from "../content/student";
import { formatIcon } from "../components/conversation-card";
import { BtnLink, Card, CardHeader, CardLink, IconTile, Pill, ProgressBar } from "../components/ui";

const s = routes.platform.student;
const statIcons = [PlayCircle, Mic, Bookmark, Users];
const statTones = ["purple", "orange", "coral", "dark"] as const;

export function StudentHome() {
  const course = getCourse(student.courses[0])!;
  const progress = student.courseProgress[course.slug];
  const nextLesson = course.lessons[progress.done];
  const nextConversation = nextLesson.conversation ? getConversation(nextLesson.conversation) : undefined;
  const saved = student.saved.map(getConversation).filter((c) => c !== undefined);
  const suggestions = publishedConversations
    .filter(
      (c) => !student.watched.includes(c.slug) && !student.saved.includes(c.slug) && c.slug !== nextConversation?.slug,
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="font-serif text-[clamp(1.75rem,1.3rem+1.2vw,2.35rem)] font-semibold leading-tight text-midnight">
          Olá, {student.firstName}! Que bom te ver de novo.
        </h1>
        <p className="mt-2 text-[0.98rem] text-muted">Retome de onde parou ou comece pela situação que você está vivendo.</p>
      </div>

      {/* percurso em números de experiência, não em porcentagem */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {studentStats.map((stat, i) => (
          <Card key={stat.label} as="div" className="flex items-center gap-4 lg:p-5">
            <IconTile icon={statIcons[i]} tone={statTones[i]} size="lg" />
            <div className="min-w-0">
              <p className="text-[0.8rem] text-muted">{stat.label}</p>
              <p className="mt-0.5 flex items-baseline gap-2">
                <span className="text-[1.6rem] font-semibold leading-none text-midnight">{stat.value}</span>
                <span className="truncate text-[0.74rem] text-muted">{stat.note}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        {/* Continuar */}
        <Card className="overflow-hidden p-0 lg:p-0">
          <div className="grid h-full md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative min-h-52">
              <Image src={course.cover} alt="" fill sizes="(min-width: 1280px) 28vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(43_33_64/0.55))]" />
              <span className="absolute bottom-4 left-4">
                <Pill tone="dark" icon={PlayCircle}>
                  Aula {progress.done + 1} de {course.lessons.length}
                </Pill>
              </span>
            </div>
            <div className="flex flex-col p-6 lg:p-7">
              <p className="text-[0.78rem] font-semibold text-purple">Continue de onde parou</p>
              <p className="mt-1 text-[0.84rem] text-muted">Curso · {course.title}</p>
              <h2 className="mt-4 font-serif text-[1.45rem] font-semibold leading-snug text-midnight">{nextLesson.question}</h2>
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-[0.78rem] text-muted">
                  <span>
                    {progress.done} conversas · {progress.reflections} reflexões · {progress.productions} produções
                  </span>
                </div>
                <ProgressBar value={progress.done} max={course.lessons.length} label="Conversas concluídas no curso" />
              </div>
              <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
                <BtnLink href={nextConversation ? s.conversation(nextConversation.slug) : s.course(course.slug)}>
                  Continuar
                  <ArrowRight aria-hidden />
                </BtnLink>
                <BtnLink href={s.course(course.slug)} variant="secondary">
                  Ver o curso
                </BtnLink>
              </div>
            </div>
          </div>
        </Card>

        {/* Salvos */}
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
                      <span className="block truncate text-[0.88rem] font-semibold text-midnight group-hover:text-purple">{c.question}</span>
                      <span className="block text-[0.76rem] text-muted">
                        {situationLabel(c.situations[0])} · {c.minutes} min
                      </span>
                    </span>
                    <ArrowRight aria-hidden className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-purple" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Entrada pela situação (seção IV do documento de direção) */}
      <Card>
        <CardHeader
          title="O que acontece com você quando tenta usar inglês?"
          icon={MessagesSquare}
          description="Escolha a frase que mais parece com você. A conversa certa começa por aí."
          action={<CardLink href={s.conversations}>Todas as conversas</CardLink>}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {situationPrompts.map((p) => (
            <Link
              key={p.text}
              href={s.conversation(p.conversation)}
              className="group flex items-center justify-between gap-3 rounded-tile border border-hairline bg-snow/60 px-4 py-3.5 transition-colors hover:border-purple/30 hover:bg-surface"
            >
              <span>
                <span className="block text-[0.92rem] font-semibold text-midnight">“{p.text}”</span>
                <span className="mt-0.5 block text-[0.74rem] text-muted">{situationLabel(p.situation)}</span>
              </span>
              <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-purple" />
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* Encontro ao vivo */}
        <Card>
          <CardHeader title="Encontro ao vivo do mês" icon={Radio} />
          <div className="relative aspect-[16/9] overflow-hidden rounded-tile">
            <Image src={liveMeeting.photo} alt="Vanessa em sala de aula" fill sizes="(min-width: 1280px) 22vw, 45vw" className="object-cover object-[50%_30%]" />
          </div>
          <p className="mt-4 font-serif text-[1.05rem] font-semibold leading-snug text-midnight">{liveMeeting.theme}</p>
          <p className="mt-2 flex items-center gap-2 text-[0.82rem] text-ink">
            <CalendarDays aria-hidden className="size-4 text-purple" />
            {liveMeeting.date} · {liveMeeting.time}
          </p>
          <p className="mt-1 text-[0.78rem] text-muted">{liveMeeting.registered} pessoas confirmadas</p>
          <div className="mt-5 flex gap-2.5">
            <BtnLink href={s.home} size="sm">
              Confirmar presença
            </BtnLink>
            <BtnLink href={s.home} size="sm" variant="secondary">
              <CalendarPlus aria-hidden />
              Agenda
            </BtnLink>
          </div>
        </Card>

        {/* Sugestões */}
        <Card>
          <CardHeader title="Continue por aqui" icon={Sparkles} description="Conversas ligadas ao que você tem visto." />
          <ul className="space-y-3">
            {suggestions.map((c) => (
              <li key={c.slug}>
                <Link href={s.conversation(c.slug)} className="group flex items-center gap-4 rounded-tile p-1.5 transition-colors hover:bg-canvas">
                  <span className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[0.7rem]">
                    <Image src={c.cover} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.72rem] font-semibold text-purple">{situationLabel(c.situations[0])}</span>
                    <span className="mt-0.5 block font-serif text-[0.98rem] font-semibold leading-snug text-midnight group-hover:text-purple">
                      {c.question}
                    </span>
                    <span className="mt-1 block text-[0.74rem] text-muted">
                      {c.format} · {c.minutes} min
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Mentoria (o "Grow your business" da referência) */}
        <div className="relative flex min-h-80 flex-col overflow-hidden rounded-box bg-midnight p-6 text-snow shadow-card lg:col-span-2 xl:col-span-1">
          <Image
            src="/images/platform/vanessa-cafe.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, 90vw"
            className="object-cover object-[50%_25%] opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(43_33_64/0.35),rgb(43_33_64/0.95)_70%)]" />
          <div className="relative mt-auto">
            <Pill tone="solid">
              Vagas limitadas por ciclo
            </Pill>
            <p className="mt-4 font-serif text-[1.45rem] font-semibold leading-snug">Quer um olhar individual sobre o seu inglês?</p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-snow/75">
              Na mentoria, a Vanessa acompanha suas produções e ajusta a estratégia com você.
            </p>
            <BtnLink href={s.mentoring} variant="secondary" className="mt-5 border-transparent">
              Conhecer a mentoria
              <ArrowRight aria-hidden />
            </BtnLink>
          </div>
        </div>
      </div>
    </div>
  );
}
