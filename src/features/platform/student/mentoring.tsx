"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { BookOpen, CheckCircle2, GraduationCap, Upload } from "lucide-react";
import { brl } from "@/lib/format";
import { offers } from "../content/catalog";
import { mentoringCompare, mentoringSteps } from "../content/student";
import { Btn, Card, CardHeader, IconTile, Pill } from "../components/ui";

const fieldClass =
  "w-full rounded-tile border border-hairline bg-snow/60 px-4 py-3 text-[0.9rem] text-ink outline-none transition focus:border-purple/40 focus:bg-card focus:shadow-[0_0_0_4px_rgb(109_63_192/0.1)]";

/** Mentoria do lado do aluno: diferença em relação ao curso, como funciona e candidatura. */
export function StudentMentoring() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-box bg-midnight text-snow shadow-card">
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="relative z-10 p-7 lg:p-10">
            <Pill tone="solid">
              Próximo ciclo · janeiro
            </Pill>
            <h1 className="mt-4 font-serif text-[clamp(1.8rem,1.3rem+1.6vw,2.7rem)] font-semibold leading-[1.12] text-snow">
              Mentoria individual
            </h1>
            <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-snow/75">
              Um espaço limitado para a Vanessa observar a sua produção, entender sua situação e ajustar a estratégia com você.
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[1.7rem] font-semibold">{brl(offers.mentoring.price)}</span>
              <span className="text-[0.82rem] text-snow/60">valor do protótipo, ilustrativo</span>
            </div>
            <a href="#candidatura" className="mt-6 inline-flex h-11 items-center rounded-full bg-orange px-5 text-[0.86rem] font-semibold text-midnight transition hover:bg-orange-hover">
              Quero me candidatar
            </a>
          </div>
          <div className="relative min-h-64">
            <Image src="/images/platform/vanessa-aula.webp" alt="Vanessa Mendes em sala de aula" fill sizes="40vw" className="object-cover object-[50%_30%]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(43_33_64)_0%,transparent_45%)] max-lg:bg-[linear-gradient(0deg,rgb(43_33_64)_0%,transparent_45%)]" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Curso" icon={BookOpen} />
          <ul className="space-y-3">
            {mentoringCompare.course.map((x) => (
              <li key={x} className="flex gap-3 text-[0.9rem] text-ink">
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />
                {x}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="ring-2 ring-purple/20">
          <CardHeader title="Mentoria" icon={GraduationCap} />
          <ul className="space-y-3">
            {mentoringCompare.mentoring.map((x) => (
              <li key={x} className="flex gap-3 text-[0.9rem] text-ink">
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-purple" />
                {x}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader title="Como funciona" />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {mentoringSteps.map((step, i) => (
            <li key={step.title} className="rounded-tile bg-canvas p-5">
              <span className="font-serif text-[1.6rem] font-semibold text-orange">0{i + 1}</span>
              <p className="mt-2 text-[0.95rem] font-semibold text-midnight">{step.title}</p>
              <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="scroll-mt-24" as="section">
        <div id="candidatura" className="scroll-mt-28" />
        <CardHeader
          title="Candidatura"
          description="Conte um pouco sobre você. A Vanessa lê cada candidatura e responde por e-mail."
        />
        {sent ? (
          <div role="status" className="flex items-start gap-3 rounded-tile bg-success-soft p-5">
            <IconTile icon={CheckCircle2} tone="success" />
            <div>
              <p className="font-semibold text-midnight">Candidatura enviada.</p>
              <p className="mt-1 text-[0.88rem] text-ink">
                Você recebe a resposta em até 5 dias úteis. <span className="text-muted">Demonstração: nada foi enviado.</span>
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-2">
            <Field label="Qual é o seu objetivo com o inglês agora?" id="objetivo">
              <textarea id="objetivo" rows={3} className={fieldClass} placeholder="Ex.: conduzir reuniões com o time de fora" />
            </Field>
            <Field label="Em que situação a dificuldade aparece?" id="situacao">
              <textarea id="situacao" rows={3} className={fieldClass} placeholder="Ex.: quando preciso apresentar resultados" />
            </Field>
            <Field label="Como foi o seu caminho com o inglês até aqui?" id="historico">
              <textarea id="historico" rows={3} className={fieldClass} />
            </Field>
            <Field label="O que você espera da mentoria?" id="expectativa">
              <textarea id="expectativa" rows={3} className={fieldClass} />
            </Field>
            <div className="lg:col-span-2">
              <p className="mb-2 text-[0.86rem] font-semibold text-midnight">Produção inicial</p>
              <div className="flex flex-col items-center justify-center rounded-tile border-2 border-dashed border-purple/20 bg-surface/40 px-6 py-8 text-center">
                <Upload aria-hidden className="size-6 text-purple" />
                <p className="mt-2 text-[0.9rem] font-semibold text-midnight">Envie um áudio de até 3 minutos ou um texto</p>
                <p className="mt-1 text-[0.78rem] text-muted">Fale sobre você, do seu jeito. Não precisa estar perfeito.</p>
              </div>
            </div>
            <label className="flex items-start gap-3 text-[0.84rem] text-ink lg:col-span-2">
              <input type="checkbox" required className="mt-0.5 size-4 accent-purple" />
              Concordo que minhas respostas e produções sejam usadas só para avaliar a candidatura.
            </label>
            <div className="lg:col-span-2">
              <Btn type="submit">Enviar candidatura</Btn>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.86rem] font-semibold text-midnight">
        {label}
      </label>
      {children}
    </div>
  );
}
