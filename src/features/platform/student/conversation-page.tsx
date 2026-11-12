import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Eye,
  HeartHandshake,
  Lightbulb,
  Sparkles,
  Telescope,
} from "lucide-react";
import { routes } from "@/config/routes";
import { brl } from "@/lib/format";
import { cn } from "@/lib/cn";
import {
  courses,
  getConversation,
  illustrativeBody,
  publishedConversations,
  seriesTitle,
  situationLabel,
  type Conversation,
} from "../content/catalog";
import { student } from "../content/student";
import { AccessPill, ConversationCard, formatIcon } from "../components/conversation-card";
import { SaveButton } from "../components/save-button";
import { Btn, BtnLink, Card, CardHeader, IconTile, Illustrative, Pill } from "../components/ui";
import { PracticeForm } from "./practice-form";
import { VideoPlayer } from "./components/video-player";

const s = routes.platform.student;

export function ConversationPage({ conversation: c }: { conversation: Conversation }) {
  const body = illustrativeBody(c);
  const locked = c.access.kind === "avulso" && !student.purchased.includes(c.slug);
  const related = c.related.map(getConversation).filter((r): r is Conversation => !!r && r.status === "publicado").slice(0, 3);
  const inSeries = c.series ? publishedConversations.filter((x) => x.series === c.series) : [];
  const inCourse = courses.find((course) => course.status === "publicado" && course.lessons.some((l) => l.conversation === c.slug));
  const FormatIcon = formatIcon[c.format];

  return (
    <div>
      <Link href={s.conversations} className="mb-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple hover:text-purple-deep">
        <ArrowLeft aria-hidden className="size-4" />
        Conversas
      </Link>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          {/* Pergunta-título + vídeo */}
          <Card className="p-0 lg:p-0">
            <div className="p-6 pb-5 lg:p-8 lg:pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <AccessPill access={c.access} />
                <Pill>{situationLabel(c.situations[0])}</Pill>
                {c.series && <Pill tone="purple">Série · {seriesTitle(c.series)}</Pill>}
              </div>
              <h1 className="mt-4 font-serif text-[clamp(1.7rem,1.2rem+1.5vw,2.5rem)] font-semibold leading-[1.15] text-midnight">
                {c.question}
              </h1>
              <p className="mt-3 text-[1rem] italic text-muted">{c.hook}</p>
            </div>

            <VideoPlayer
              poster={c.cover}
              icon={FormatIcon}
              label={`${c.format} · ${c.minutes} min`}
              locked={locked ? `Conversa avulsa · ${brl((c.access as { price: number }).price)}` : undefined}
              className="mx-3 mb-3 lg:mx-4 lg:mb-4"
            />
          </Card>

          <Block icon={Telescope} title="A cena">
            <Illustrative>{body.scene}</Illustrative>
          </Block>

          <div className="grid gap-6 lg:grid-cols-2">
            <Block icon={Lightbulb} title="Por que isso pode acontecer?">
              <Illustrative>{body.why}</Illustrative>
            </Block>
            <Block icon={HeartHandshake} title="Antes de tudo">
              <Illustrative>{body.welcome}</Illustrative>
            </Block>
          </div>

          <Block icon={Sparkles} title="Como a Vanessa conduz">
            <ol className="grid gap-3 md:grid-cols-3">
              {body.steps.map((step, i) => (
                <li key={step.title} className="rounded-tile border border-dashed border-purple/25 bg-surface/40 p-4">
                  <span className="grid size-8 place-items-center rounded-full bg-purple text-[0.8rem] font-bold text-snow">{i + 1}</span>
                  <p className="mt-3 text-[0.9rem] font-semibold text-midnight">{step.title}</p>
                  <p className="mt-1 text-[0.84rem] leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[0.72rem] text-muted">Passos ilustrativos: a estratégia real é escrita pela professora.</p>
          </Block>

          <Block icon={BookOpen} title="Exemplos em outras situações">
            <div className="grid gap-3 md:grid-cols-3">
              {body.examples.map((ex) => (
                <div key={ex.context} className="rounded-tile bg-canvas p-4">
                  <Pill tone="purple">{ex.context}</Pill>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-ink">{ex.text}</p>
                </div>
              ))}
            </div>
          </Block>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Card>
              <CardHeader title="Sua experiência" icon={Sparkles} description="Teste do seu jeito e, se quiser, registre como foi." />
              <Illustrative className="mb-4">{body.experience}</Illustrative>
              <PracticeForm />
            </Card>
            <Card>
              <CardHeader title="O que observar" icon={Eye} description="Critérios além de acertei ou errei." />
              <ul className="space-y-3">
                {body.observe.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.88rem] leading-relaxed text-ink">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Continue por aqui: duas ou três perguntas, sem rolagem infinita */}
          {related.length > 0 && (
            <section aria-labelledby="continue">
              <h2 id="continue" className="mb-4 font-sans text-[1rem] font-semibold text-midnight">
                Continue por aqui
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <ConversationCard key={r.slug} conversation={r} compact saved={student.saved.includes(r.slug)} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Coluna lateral */}
        <aside className="space-y-6 xl:sticky xl:top-[calc(var(--demo-bar-h,0px)+1.5rem)] xl:self-start">
          <Card>
            {locked ? (
              <>
                <p className="text-[0.8rem] text-muted">Conversa avulsa</p>
                <p className="mt-1 text-[1.9rem] font-semibold text-midnight">{brl((c.access as { price: number }).price)}</p>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">Acesso para sempre, com vídeo, prática e material de apoio.</p>
                <Btn className="mt-5 w-full">Comprar conversa</Btn>
                <p className="mt-3 text-center text-[0.74rem] text-muted">Pix ou cartão · confirmação imediata</p>
              </>
            ) : (
              <>
                <p className="flex items-center gap-2 text-[0.82rem] text-muted">
                  <Clock aria-hidden className="size-4" />
                  {c.minutes} minutos de conversa + prática
                </p>
                <div className="mt-4 grid gap-2.5">
                  <SaveButton variant="button" initial={student.saved.includes(c.slug)} className="w-full" />
                  <BtnLink href="#pratica" variant="soft" className="w-full">
                    Registrar minha produção
                  </BtnLink>
                </div>
              </>
            )}
          </Card>

          {inSeries.length > 1 && (
            <Card>
              <CardHeader title={`Série · ${seriesTitle(c.series)}`} />
              <ol className="space-y-1">
                {inSeries.map((x, i) => {
                  const current = x.slug === c.slug;
                  const seen = student.watched.includes(x.slug);
                  return (
                    <li key={x.slug}>
                      <Link
                        href={s.conversation(x.slug)}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex items-start gap-3 rounded-tile px-3 py-2.5 text-[0.84rem] transition-colors",
                          current ? "bg-surface font-semibold text-purple" : "text-ink hover:bg-canvas",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[0.66rem] font-bold",
                            seen ? "bg-success-soft text-success" : current ? "bg-purple text-snow" : "bg-canvas text-muted",
                          )}
                        >
                          {seen ? "✓" : i + 1}
                        </span>
                        <span className="leading-snug">{x.question}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </Card>
          )}

          {inCourse && (
            <Card className="bg-lilac shadow-none">
              <IconTile icon={BookOpen} tone="dark" />
              <p className="mt-4 text-[0.78rem] font-semibold text-purple">Esta conversa faz parte do curso</p>
              <p className="mt-1 font-serif text-[1.1rem] font-semibold leading-snug text-midnight">{inCourse.title}</p>
              {student.courses.includes(inCourse.slug) ? (
                <BtnLink
                  href={s.lesson(inCourse.slug, inCourse.lessons.findIndex((l) => l.conversation === c.slug) + 1)}
                  variant="dark"
                  size="sm"
                  className="mt-4"
                >
                  Abrir como aula {inCourse.lessons.findIndex((l) => l.conversation === c.slug) + 1} do curso
                </BtnLink>
              ) : (
                <BtnLink href={s.course(inCourse.slug)} variant="dark" size="sm" className="mt-4">
                  Ver o curso
                </BtnLink>
              )}
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}

function Block({ icon, title, children }: { icon: typeof Eye; title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} icon={icon} className="mb-4" />
      {children}
    </Card>
  );
}
