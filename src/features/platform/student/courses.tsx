import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Flag,
  FolderHeart,
  Lock,
  Mic,
  PlayCircle,
  Route,
  Target,
} from "lucide-react";
import { routes } from "@/config/routes";
import { brl } from "@/lib/format";
import { cn } from "@/lib/cn";
import { courses, type Course } from "../content/catalog";
import { productions, student } from "../content/student";
import { BtnLink, Card, CardHeader, IconTile, Pill, ProgressBar } from "../components/ui";

const s = routes.platform.student;

export function MyCourses() {
  const mine = courses.filter((c) => student.courses.includes(c.slug));
  const others = courses.filter((c) => c.status === "publicado" && !student.courses.includes(c.slug));

  return (
    <div className="space-y-10">
      <div className="mb-2">
        <h1 className="font-serif text-[clamp(1.6rem,1.2rem+1.1vw,2.15rem)] font-semibold text-midnight">Meus cursos</h1>
        <p className="mt-2 text-[0.95rem] text-muted">Cada curso é uma conversa que se aprofunda, organizada por perguntas.</p>
      </div>

      <section aria-labelledby="andamento">
        <h2 id="andamento" className="mb-4 font-sans text-[1rem] font-semibold text-midnight">
          Em andamento
        </h2>
        <div className="grid gap-6">
          {mine.map((c) => {
            const p = student.courseProgress[c.slug];
            return (
              <Card key={c.slug} className="grid gap-6 p-4 md:grid-cols-[280px_minmax(0,1fr)] lg:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-tile md:aspect-auto">
                  <Image src={c.cover} alt="" fill sizes="280px" className="object-cover" />
                </div>
                <div className="flex flex-col py-2 pr-2">
                  <Pill tone="purple" className="self-start">
                    Curso
                  </Pill>
                  <h3 className="mt-3 font-serif text-[1.4rem] font-semibold leading-snug text-midnight">{c.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] text-muted">Próxima: {c.lessons[p.done].question}</p>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-center sm:max-w-md">
                    {[
                      { n: `${p.done}/${c.lessons.length}`, l: "conversas" },
                      { n: p.reflections, l: "reflexões" },
                      { n: p.productions, l: "produções" },
                    ].map((x) => (
                      <div key={x.l} className="rounded-tile bg-canvas px-2 py-2.5">
                        <p className="text-[1.15rem] font-semibold text-midnight">{x.n}</p>
                        <p className="text-[0.72rem] text-muted">{x.l}</p>
                      </div>
                    ))}
                  </div>
                  <ProgressBar value={p.done} max={c.lessons.length} label="Conversas concluídas" className="mt-5 sm:max-w-md" />
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <BtnLink href={s.course(c.slug)}>
                      Continuar o curso
                      <ArrowRight aria-hidden />
                    </BtnLink>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="disponiveis">
        <h2 id="disponiveis" className="mb-4 font-sans text-[1rem] font-semibold text-midnight">
          Outros cursos da Vanessa
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {others.map((c) => (
            <Card key={c.slug} className="flex flex-col p-0 lg:p-0">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-box">
                <Image src={c.cover} alt="" fill sizes="(min-width: 1280px) 30vw, 50vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <h3 className="font-serif text-[1.2rem] font-semibold leading-snug text-midnight">{c.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{c.forWho}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="text-[1.15rem] font-semibold text-midnight">{brl(c.price)}</span>
                  <BtnLink href={s.course(c.slug)} variant="secondary" size="sm">
                    Conhecer o curso
                  </BtnLink>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export function CoursePage({ course: c }: { course: Course }) {
  const owned = student.courses.includes(c.slug);
  const p = owned ? student.courseProgress[c.slug] : { done: 0, reflections: 0, productions: 0 };
  const myProductions = productions.filter((x) => x.kind === "Áudio" || x.kind === "Texto").slice(0, 3);

  return (
    <div>
      <Link href={s.courses} className="mb-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple hover:text-purple-deep">
        <ArrowLeft aria-hidden className="size-4" />
        Meus cursos
      </Link>

      {/* Apresentação: o que a pessoa vive hoje e o que poderá fazer de modo diferente */}
      <div className="relative mb-6 overflow-hidden rounded-box bg-midnight text-snow shadow-card">
        <Image src={c.cover} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(43_33_64/0.97)_30%,rgb(43_33_64/0.6))]" />
        <div className="relative grid gap-8 p-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:p-10">
          <div>
            <Pill tone="solid">
              Curso
            </Pill>
            <h1 className="mt-4 font-serif text-[clamp(1.8rem,1.3rem+1.6vw,2.7rem)] font-semibold leading-[1.12] !text-snow">{c.title}</h1>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-snow/75">{c.forWho}</p>
            {owned ? (
              <div className="mt-6 max-w-md">
                <div className="mb-2 flex justify-between text-[0.8rem] text-snow/75">
                  <span>
                    {p.done} de {c.lessons.length} conversas · {p.productions} produções
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-orange" style={{ width: `${(p.done / c.lessons.length) * 100}%` }} />
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-[1.6rem] font-semibold">{brl(c.price)}</span>
                <BtnLink href={s.purchases}>Comprar curso</BtnLink>
              </div>
            )}
          </div>
          <div className="grid content-start gap-3">
            <div className="rounded-tile bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-rose">Hoje</p>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-snow/85">{c.today}</p>
            </div>
            <div className="rounded-tile bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-orange">Depois do curso</p>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-snow/85">{c.after}</p>
            </div>
            <p className="text-[0.72rem] text-snow/50">Textos de apresentação ilustrativos.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader title="Conversas do curso" icon={Route} description="Cada aula é uma pergunta e retoma as anteriores." />
          <ol className="relative space-y-2">
            {c.lessons.map((lesson, i) => {
              const done = owned && i < p.done;
              const current = owned && i === p.done;
              const locked = !owned;
              const href = lesson.conversation && owned ? s.conversation(lesson.conversation) : undefined;
              const rowClass = cn(
                "flex items-center gap-4 rounded-tile border px-4 py-3.5 transition-colors",
                current ? "border-purple/30 bg-surface" : "border-hairline",
                href && "hover:border-purple/30 hover:bg-snow",
              );
              const inner = (
                <>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full",
                        done ? "bg-success-soft text-success" : current ? "bg-purple text-snow" : "bg-canvas text-muted",
                      )}
                    >
                      {done ? (
                        <CheckCircle2 aria-label="Concluída" className="size-[18px]" />
                      ) : locked ? (
                        <Lock aria-label="Bloqueada" className="size-4" />
                      ) : current ? (
                        <PlayCircle aria-label="Atual" className="size-[18px]" />
                      ) : (
                        <Circle aria-label="Próxima" className="size-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.72rem] font-semibold text-muted">Aula {i + 1}</span>
                      <span className={cn("block text-[0.94rem] font-semibold leading-snug", current ? "text-purple" : "text-midnight")}>
                        {lesson.question}
                      </span>
                      {i > 0 && i < c.lessons.length - 1 && (
                        <span className="mt-0.5 block text-[0.74rem] text-muted">Retoma a aula {i}</span>
                      )}
                    </span>
                    {lesson.practice && (
                      <Pill tone={i === 0 || i === c.lessons.length - 1 ? "orange" : "neutral"} className="hidden sm:inline-flex">
                        {lesson.practice}
                      </Pill>
                    )}
                </>
              );
              return (
                <li key={lesson.question}>
                  {href ? (
                    <Link href={href} className={rowClass}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={rowClass}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </Card>

        <aside className="space-y-6">
          <Card>
            <CardHeader title="Seu portfólio no curso" icon={FolderHeart} description="Do primeiro áudio à produção final." />
            <ul className="space-y-3">
              <PortfolioRow icon={Flag} title="Linha de base" text={owned ? "Gravada em 02/10" : "Na primeira aula"} done={owned} />
              <PortfolioRow icon={Mic} title="Produções escolhidas" text={owned ? `${p.productions} de até 3` : "Ao longo do curso"} done={owned && p.productions > 0} />
              <PortfolioRow icon={Target} title="Produção final" text="Na última aula, para comparar com o início" done={false} />
            </ul>
          </Card>

          {owned && (
            <Card>
              <CardHeader title="Produções recentes" />
              <ul className="space-y-3">
                {myProductions.map((x) => (
                  <li key={x.id} className="flex items-start gap-3">
                    <IconTile icon={x.kind === "Áudio" ? Mic : FolderHeart} size="sm" tone={x.kind === "Áudio" ? "orange" : "purple"} />
                    <div className="min-w-0">
                      <p className="text-[0.86rem] font-semibold text-midnight">{x.title}</p>
                      <p className="text-[0.74rem] text-muted">
                        {x.kind} · {x.detail} · {x.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <BtnLink href={s.journey} variant="soft" size="sm" className="mt-5 w-full">
                Ver meu percurso
              </BtnLink>
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
        <span className="block text-[0.88rem] font-semibold text-midnight">{title}</span>
        <span className="block text-[0.76rem] text-muted">{text}</span>
      </span>
      {done && <CheckCircle2 aria-label="Feito" className="size-4 text-success" />}
    </li>
  );
}
