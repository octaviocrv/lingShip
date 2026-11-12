"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, ImagePlus, Link2, Plus, Tags, UploadCloud, X } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import {
  editorialStatuses,
  getConversation,
  illustrativeBody,
  publishedConversations,
  series,
  situations,
  type Autonomy,
  type Conversation,
  type EditorialStatus,
  type SituationId,
} from "../content/catalog";
import { Btn, Card, CardHeader, Pill } from "../components/ui";

const input =
  "w-full rounded-tile border border-hairline bg-snow/60 px-4 text-[0.9rem] text-ink outline-none transition placeholder:text-muted/70 focus:border-purple/40 focus:bg-card focus:shadow-[0_0_0_4px_rgb(109_63_192/0.1)]";

const autonomyLevels: Autonomy[] = ["Conhecer", "Testar", "Variar", "Transferir"];

/**
 * Editor de conversa. Os campos seguem o modelo de material (seção VI) e as etiquetas
 * internas do acervo (seção IX). Nada é gravado: "Salvar" e "Publicar" só mostram o aviso.
 */
export function ContentEditor({ conversation, initialQuestion = "" }: { conversation?: Conversation; initialQuestion?: string }) {
  const body = conversation ? illustrativeBody(conversation) : undefined;
  const [status, setStatus] = useState<EditorialStatus>(conversation?.status ?? "ideia");
  const [access, setAccess] = useState(conversation?.access.kind ?? "assinatura");
  const [sits, setSits] = useState<SituationId[]>(conversation?.situations ?? []);
  const [autonomy, setAutonomy] = useState<Autonomy>(conversation?.internal.autonomy ?? "Conhecer");
  const [strategies, setStrategies] = useState<string[]>(conversation?.internal.strategies ?? []);
  const [related, setRelated] = useState<string[]>(conversation?.related ?? []);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  };

  const relatedOptions = publishedConversations.filter((c) => c.slug !== conversation?.slug && !related.includes(c.slug));

  return (
    <div>
      <Link href={routes.platform.teacher.contents} className="mb-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-purple hover:text-purple-deep">
        <ArrowLeft aria-hidden className="size-4" />
        Conteúdos
      </Link>

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[0.78rem] font-semibold text-purple">{conversation ? "Editar conversa" : "Nova conversa"}</p>
          <h1 className="font-serif text-[clamp(1.5rem,1.15rem+1vw,2rem)] font-semibold leading-tight text-midnight">
            {conversation?.question ?? (initialQuestion ? `“${initialQuestion}”` : "Comece pela pergunta do aluno")}
          </h1>
        </div>
        <div className="flex gap-2.5">
          {conversation?.status === "publicado" && (
            <Link
              href={routes.platform.student.conversation(conversation.slug)}
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.86rem] font-semibold text-purple hover:bg-surface"
            >
              <Eye aria-hidden className="size-4" />
              Ver como aluno
            </Link>
          )}
          <Btn variant="secondary" onClick={() => notify("Rascunho salvo (demonstração).")}>
            Salvar rascunho
          </Btn>
          <Btn
            onClick={() => {
              setStatus("publicado");
              notify("Conversa publicada (demonstração). Ela já apareceria no catálogo dos alunos.");
            }}
          >
            Publicar
          </Btn>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader title="Pergunta e cena" description="Use as palavras que o aluno usaria para descrever a situação." />
            <div className="space-y-4">
              <Field label="Pergunta-título" id="pergunta">
                <input id="pergunta" className={cn(input, "h-12")} defaultValue={conversation?.question ?? initialQuestion} placeholder="Ex.: Como sair do “good” e do “very well”?" />
              </Field>
              <Field label="Frase de reconhecimento" id="gancho" hint="Aparece no card do catálogo.">
                <input id="gancho" className={cn(input, "h-12")} defaultValue={conversation?.hook} placeholder="Ex.: Você quer contar como foi e só sai “it was good”." />
              </Field>
              <Field label="Cena breve" id="cena">
                <textarea id="cena" rows={3} className={cn(input, "resize-none py-3")} defaultValue={body?.scene} placeholder="Onde a dificuldade aparece?" />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Vídeo da conversa" description="Até 15 minutos. A legenda revisada entra junto." />
            {conversation ? (
              <div className="flex flex-wrap items-center gap-4 rounded-tile bg-canvas p-3">
                <span className="relative aspect-video w-40 overflow-hidden rounded-[0.6rem]">
                  <Image src="/images/platform/vanessa-video.webp" alt="" fill sizes="160px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.9rem] font-semibold text-midnight">conversa-{conversation.slug}.mp4</p>
                  <p className="text-[0.78rem] text-muted">{conversation.minutes} min · 1080p</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Pill tone="success" icon={CheckCircle2}>
                      Legenda revisada
                    </Pill>
                    <Pill>Capa definida</Pill>
                  </div>
                </div>
                <Btn variant="secondary" size="sm">
                  Substituir
                </Btn>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-tile border-2 border-dashed border-purple/20 bg-surface/40 px-6 py-10 text-center">
                <UploadCloud aria-hidden className="size-8 text-purple" />
                <p className="mt-3 text-[0.95rem] font-semibold text-midnight">Arraste o vídeo ou clique para enviar</p>
                <p className="mt-1 text-[0.8rem] text-muted">MP4 ou MOV · a legenda automática é gerada para você revisar</p>
              </div>
            )}
          </Card>

          <Card>
            <CardHeader title="Processo e acolhimento" />
            <div className="space-y-4">
              <Field label="Por que isso pode acontecer?" id="porque">
                <textarea id="porque" rows={3} className={cn(input, "resize-none py-3")} defaultValue={body?.why} />
              </Field>
              <Field label="Acolhimento" id="acolhimento">
                <textarea id="acolhimento" rows={2} className={cn(input, "resize-none py-3")} defaultValue={body?.welcome} />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Como você conduz" description="O passo a passo da estratégia." action={<Btn variant="soft" size="sm"><Plus aria-hidden />Passo</Btn>} />
            <ol className="space-y-3">
              {(body?.steps ?? [{ title: "", text: "" }, { title: "", text: "" }]).map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2.5 grid size-7 shrink-0 place-items-center rounded-full bg-purple text-[0.74rem] font-bold text-snow">{i + 1}</span>
                  <div className="grid flex-1 gap-2">
                    <input aria-label={`Título do passo ${i + 1}`} className={cn(input, "h-11")} defaultValue={step.title} placeholder="Título do passo" />
                    <textarea aria-label={`Texto do passo ${i + 1}`} rows={2} className={cn(input, "resize-none py-2.5")} defaultValue={step.text} placeholder="Como conduzir" />
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <CardHeader title="Prática e observação" />
            <div className="space-y-4">
              <Field label="Sua experiência (convite à prática)" id="experiencia">
                <textarea id="experiencia" rows={2} className={cn(input, "resize-none py-3")} defaultValue={body?.experience} />
              </Field>
              <Field label="O que observar" id="observar" hint="Um critério por linha.">
                <textarea id="observar" rows={3} className={cn(input, "resize-none py-3")} defaultValue={body?.observe.join("\n")} />
              </Field>
            </div>
          </Card>
        </div>

        {/* Coluna lateral */}
        <aside className="space-y-6 xl:sticky xl:top-[calc(var(--demo-bar-h,0px)+1.5rem)] xl:self-start">
          <Card>
            <CardHeader title="Publicação" />
            <Field label="Status" id="status">
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as EditorialStatus)} className={cn(input, "h-11")}>
                {editorialStatuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <p className="mb-2 mt-4 text-[0.8rem] font-semibold text-midnight">Acesso</p>
            <div className="grid grid-cols-3 gap-1.5 rounded-tile bg-canvas p-1">
              {(["gratuito", "assinatura", "avulso"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={access === a}
                  onClick={() => setAccess(a)}
                  className={cn(
                    "h-9 cursor-pointer rounded-[0.6rem] text-[0.78rem] font-semibold capitalize transition",
                    access === a ? "bg-card text-purple shadow-sm" : "text-muted hover:text-ink",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
            {access === "avulso" && (
              <Field label="Preço" id="preco" className="mt-4">
                <input id="preco" className={cn(input, "h-11")} defaultValue="R$ 29,90" />
              </Field>
            )}
            <Field label="Série" id="serie" className="mt-4">
              <select id="serie" defaultValue={conversation?.series ?? ""} className={cn(input, "h-11")}>
                <option value="">Avulsa (sem série)</option>
                {series.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>
            <button type="button" className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-tile border border-dashed border-hairline px-4 py-3 text-left text-[0.84rem] text-ink transition hover:border-purple/30">
              <ImagePlus aria-hidden className="size-4 text-purple" />
              {conversation ? "Trocar capa" : "Enviar capa"}
            </button>
          </Card>

          <Card>
            <CardHeader
              title="Organização interna"
              icon={Tags}
              description={
                <span className="inline-flex items-center gap-1.5">
                  <EyeOff aria-hidden className="size-3.5" />
                  Etiquetas para a busca. O aluno não vê.
                </span>
              }
            />
            <p className="mb-2 text-[0.8rem] font-semibold text-midnight">Situação</p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {situations.map((s) => {
                const on = sits.includes(s.id);
                return (
                  <Chip key={s.id} on={on} onClick={() => setSits((p) => (on ? p.filter((x) => x !== s.id) : [...p, s.id]))}>
                    {s.label}
                  </Chip>
                );
              })}
            </div>
            <Field label="Dificuldade percebida" id="dificuldade">
              <input id="dificuldade" className={cn(input, "h-11")} defaultValue={conversation?.internal.difficulty} />
            </Field>
            <Field label="Transformação" id="transformacao" className="mt-3">
              <input id="transformacao" className={cn(input, "h-11")} defaultValue={conversation?.internal.transformation} />
            </Field>
            <p className="mb-2 mt-4 text-[0.8rem] font-semibold text-midnight">Estratégias usadas</p>
            <div className="flex flex-wrap gap-1.5">
              {strategies.map((s) => (
                <Chip key={s} on onClick={() => setStrategies((p) => p.filter((x) => x !== s))} removable>
                  {s}
                </Chip>
              ))}
              {["Perguntas sensoriais", "Camadas", "Comparação", "Reconto", "Paráfrase"]
                .filter((s) => !strategies.includes(s))
                .slice(0, 2)
                .map((s) => (
                  <Chip key={s} on={false} onClick={() => setStrategies((p) => [...p, s])}>
                    + {s}
                  </Chip>
                ))}
            </div>
            <p className="mb-2 mt-4 text-[0.8rem] font-semibold text-midnight">Nível de autonomia</p>
            <div className="grid grid-cols-4 gap-1 rounded-tile bg-canvas p-1">
              {autonomyLevels.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={autonomy === a}
                  onClick={() => setAutonomy(a)}
                  className={cn(
                    "h-9 cursor-pointer rounded-[0.6rem] text-[0.72rem] font-semibold transition",
                    autonomy === a ? "bg-card text-purple shadow-sm" : "text-muted hover:text-ink",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Conversas relacionadas" icon={Link2} description="Aparecem em “Continue por aqui”." />
            <ul className="space-y-2">
              {related.map((slug) => {
                const r = getConversation(slug);
                if (!r) return null;
                return (
                  <li key={slug} className="flex items-center gap-2 rounded-tile bg-canvas py-2 pl-3.5 pr-1.5 text-[0.82rem] text-midnight">
                    <span className="min-w-0 flex-1 truncate">{r.question}</span>
                    <button
                      type="button"
                      aria-label={`Remover ${r.question}`}
                      onClick={() => setRelated((p) => p.filter((x) => x !== slug))}
                      className="grid size-7 cursor-pointer place-items-center rounded-full text-muted hover:bg-card hover:text-coral-deep"
                    >
                      <X aria-hidden className="size-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
            {relatedOptions.length > 0 && related.length < 3 && (
              <select
                aria-label="Adicionar conversa relacionada"
                value=""
                onChange={(e) => e.target.value && setRelated((p) => [...p, e.target.value])}
                className={cn(input, "mt-3 h-11")}
              >
                <option value="">+ Adicionar conversa</option>
                {relatedOptions.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.question}
                  </option>
                ))}
              </select>
            )}
          </Card>
        </aside>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {toast && (
          <p className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-midnight px-5 py-3 text-[0.86rem] font-medium text-snow shadow-card-hover">
            <CheckCircle2 aria-hidden className="size-4 text-orange" />
            {toast}
          </p>
        )}
      </div>
    </div>
  );
}

function Field({ label, id, hint, className, children }: { label: string; id: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.8rem] font-semibold text-midnight">
        {label}
        {hint && <span className="text-[0.72rem] font-normal text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Chip({ on, onClick, removable, children }: { on: boolean; onClick: () => void; removable?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center gap-1 rounded-full border px-3 text-[0.76rem] font-medium transition-colors",
        on ? "border-purple/30 bg-surface text-purple" : "border-hairline text-muted hover:border-purple/30 hover:text-ink",
      )}
    >
      {children}
      {removable && <X aria-hidden className="size-3" />}
    </button>
  );
}
