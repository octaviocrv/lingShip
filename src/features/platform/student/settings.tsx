"use client";

import { useState, type ReactNode } from "react";
import { Bell, CheckCircle2, Download, Globe2, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { student } from "../content/student";
import { Avatar, Btn, Card, CardHeader, PageHeader } from "../components/ui";

const inputClass =
  "h-12 w-full rounded-tile border border-hairline bg-snow/60 px-4 text-[0.9rem] text-ink outline-none transition focus:border-purple/40 focus:bg-card focus:shadow-[0_0_0_4px_rgb(109_63_192/0.1)]";

const uses = ["Conversas do dia a dia", "Trabalho", "Viagens", "Leitura", "Estudos", "Filmes e séries"];

export function Settings() {
  const [saved, setSaved] = useState(false);
  const [chosen, setChosen] = useState<string[]>(["Conversas do dia a dia", "Trabalho"]);
  const [notify, setNotify] = useState({ series: true, live: true, support: true, news: false });

  return (
    <>
      <PageHeader
        title="Configurações"
        description="Seus dados, preferências de estudo, avisos e privacidade."
        actions={
          <Btn onClick={() => setSaved(true)}>
            {saved ? (
              <>
                <CheckCircle2 aria-hidden />
                Salvo (demonstração)
              </>
            ) : (
              "Salvar alterações"
            )}
          </Btn>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Perfil" icon={UserRound} />
          <div className="mb-6 flex items-center gap-4">
            <Avatar initials={student.initials} size="lg" />
            <div>
              <p className="font-semibold text-midnight">{student.name}</p>
              <p className="text-[0.8rem] text-muted">Aluna desde {student.since}</p>
            </div>
            <Btn variant="secondary" size="sm" className="ml-auto">
              Trocar foto
            </Btn>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Labeled label="Nome" id="nome">
              <input id="nome" defaultValue={student.name} className={inputClass} />
            </Labeled>
            <Labeled label="E-mail" id="email">
              <input id="email" type="email" defaultValue={student.email} className={inputClass} />
            </Labeled>
            <Labeled label="WhatsApp" id="tel">
              <input id="tel" defaultValue={student.phone} className={inputClass} />
            </Labeled>
            <Labeled label="Senha" id="senha">
              <input id="senha" type="password" defaultValue="demonstracao" className={inputClass} />
            </Labeled>
          </div>
        </Card>

        <Card>
          <CardHeader title="Para que você usa inglês?" icon={Globe2} description="Ajuda a sugerir conversas mais próximas da sua vida." />
          <div className="flex flex-wrap gap-2">
            {uses.map((u) => {
              const on = chosen.includes(u);
              return (
                <button
                  key={u}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setChosen((prev) => (on ? prev.filter((x) => x !== u) : [...prev, u]))}
                  className={cn(
                    "h-10 cursor-pointer rounded-full border px-4 text-[0.84rem] font-medium transition-colors",
                    on ? "border-purple bg-surface text-purple" : "border-hairline text-ink hover:border-purple/30",
                  )}
                >
                  {u}
                </button>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Labeled label="Legendas dos vídeos" id="legenda">
              <select id="legenda" className={inputClass} defaultValue="en">
                <option value="en">Em inglês</option>
                <option value="pt">Em português</option>
                <option value="off">Desligadas</option>
              </select>
            </Labeled>
            <Labeled label="Velocidade padrão" id="vel">
              <select id="vel" className={inputClass} defaultValue="1">
                <option value="0.75">0,75x</option>
                <option value="1">1x</option>
                <option value="1.25">1,25x</option>
              </select>
            </Labeled>
          </div>
        </Card>

        <Card>
          <CardHeader title="Avisos" icon={Bell} />
          <ul className="divide-y divide-hairline">
            <Toggle label="Nova conversa numa série que eu acompanho" on={notify.series} onChange={(v) => setNotify({ ...notify, series: v })} />
            <Toggle label="Lembrete do encontro ao vivo" on={notify.live} onChange={(v) => setNotify({ ...notify, live: v })} />
            <Toggle label="Resposta do suporte" on={notify.support} onChange={(v) => setNotify({ ...notify, support: v })} />
            <Toggle label="Novidades e lançamentos" on={notify.news} onChange={(v) => setNotify({ ...notify, news: v })} />
          </ul>
        </Card>

        <Card>
          <CardHeader title="Privacidade e dados" icon={ShieldCheck} />
          <p className="text-[0.88rem] leading-relaxed text-ink">
            Suas produções e anotações são visíveis só para você (e para a Vanessa, se você estiver na mentoria). Você pode baixar
            ou pedir a exclusão dos seus dados quando quiser.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Btn variant="secondary" size="sm">
              <Download aria-hidden />
              Baixar meus dados
            </Btn>
            <Btn variant="ghost" size="sm" className="text-coral-deep hover:bg-coral/10">
              <Trash2 aria-hidden />
              Pedir exclusão da conta
            </Btn>
          </div>
        </Card>
      </div>
    </>
  );
}

function Labeled({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.8rem] font-semibold text-midnight">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3.5">
      <span className="text-[0.9rem] text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => onChange(!on)}
        className={cn("relative h-6 w-10 shrink-0 cursor-pointer rounded-full transition-colors", on ? "bg-purple" : "bg-hairline")}
      >
        <span className={cn("absolute left-1 top-1 size-4 rounded-full bg-card shadow transition-transform", on && "translate-x-4")} />
      </button>
    </li>
  );
}
