"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Download, Plus, Receipt, RotateCcw, Search, Ticket, TrendingUp, Users, Wallet } from "lucide-react";
import { brl, brlShort } from "@/lib/format";
import { cn } from "@/lib/cn";
import { coupons as initialCoupons, orders, students } from "../content/teacher";
import { Avatar, Btn, Card, IconTile, PageHeader, Pill, Table, Td, Th } from "../components/ui";

const tabs = [
  { id: "alunos", label: "Alunos", icon: Users },
  { id: "pedidos", label: "Pedidos", icon: Receipt },
  { id: "cupons", label: "Cupons", icon: Ticket },
] as const;

type Tab = (typeof tabs)[number]["id"];

/** Gera e baixa um CSV dos alunos (dados fictícios): mostra a portabilidade da seção X. */
function exportStudents() {
  const header = ["Nome", "E-mail", "Plano", "Cursos", "Produções", "Última atividade", "Status"];
  const lines = students.map((s) => [s.name, s.email, s.plan, s.courses, s.productions, s.lastSeen, s.status].join(";"));
  const blob = new Blob([`﻿${[header.join(";"), ...lines].join("\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "alunos-lingship-demonstracao.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function StudentsAndSales() {
  const [tab, setTab] = useState<Tab>("alunos");
  const [query, setQuery] = useState("");
  const [coupons, setCoupons] = useState(initialCoupons);

  const paid = orders.filter((o) => o.status === "pago");
  const revenue = paid.reduce((a, o) => a + o.value, 0);

  const filtered = students.filter((s) => !query || `${s.name} ${s.email}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Alunos e vendas"
        description="Quem estuda com você, o que comprou e como está o caixa. Seus dados, exportáveis quando quiser."
        actions={
          <Btn variant="secondary" onClick={exportStudents}>
            <Download aria-hidden />
            Exportar alunos (CSV)
          </Btn>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Mini icon={Users} tone="purple" label="Alunos ativos" value={String(students.filter((s) => s.status === "ativo").length * 39)} />
        <Mini icon={Wallet} tone="success" label="Receita da semana" value={brlShort(revenue)} />
        <Mini icon={TrendingUp} tone="orange" label="Ticket médio" value={brl(revenue / paid.length)} />
        <Mini icon={RotateCcw} tone="coral" label="Reembolsos no mês" value="1" />
      </div>

      <Card>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Seções" className="inline-flex rounded-full bg-canvas p-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.82rem] font-semibold transition-colors",
                    tab === t.id ? "bg-card text-purple shadow-sm" : "text-muted hover:text-ink",
                  )}
                >
                  <Icon aria-hidden className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
          {tab === "alunos" && (
            <label className="flex h-10 w-full max-w-xs items-center gap-2.5 rounded-full border border-hairline bg-snow/60 px-4 focus-within:border-purple/40">
              <Search aria-hidden className="size-4 text-muted" />
              <span className="sr-only">Buscar aluno</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome ou e-mail"
                className="h-full min-w-0 flex-1 bg-transparent text-[0.86rem] outline-none placeholder:text-muted/80"
              />
            </label>
          )}
          {tab === "cupons" && (
            <Btn
              size="sm"
              onClick={() =>
                setCoupons((prev) => [
                  { code: `NOVO${prev.length + 1}`, discount: "10%", applies: "Assinatura", uses: 0, until: "31/01/2027", active: true },
                  ...prev,
                ])
              }
            >
              <Plus aria-hidden />
              Criar cupom
            </Btn>
          )}
        </div>

        {tab === "alunos" && (
          <Table>
            <thead>
              <tr>
                <Th>Aluno</Th>
                <Th>Plano</Th>
                <Th className="text-right">Cursos</Th>
                <Th className="text-right">Produções</Th>
                <Th>Última atividade</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.email} className="transition-colors hover:bg-snow/60">
                  <Td>
                    <span className="flex items-center gap-3">
                      <Avatar initials={s.initials} size="sm" />
                      <span>
                        <span className="block font-semibold text-midnight">{s.name}</span>
                        <span className="block text-[0.74rem] text-muted">{s.email}</span>
                      </span>
                    </span>
                  </Td>
                  <Td>
                    <Pill tone={s.plan === "Mentoria" ? "orange" : s.plan === "Assinatura" ? "purple" : "neutral"}>{s.plan}</Pill>
                  </Td>
                  <Td className="text-right tabular-nums">{s.courses}</Td>
                  <Td className="text-right tabular-nums">{s.productions}</Td>
                  <Td className="text-muted">{s.lastSeen}</Td>
                  <Td>
                    {s.status === "ativo" ? (
                      <Pill tone="success" icon={CheckCircle2}>
                        Ativo
                      </Pill>
                    ) : (
                      <Pill icon={Clock}>Inativo</Pill>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {tab === "pedidos" && (
          <Table>
            <thead>
              <tr>
                <Th>Pedido</Th>
                <Th>Aluno</Th>
                <Th>Item</Th>
                <Th>Pagamento</Th>
                <Th>Data</Th>
                <Th className="text-right">Valor</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-snow/60">
                  <Td className="font-medium text-midnight">{o.id}</Td>
                  <Td>{o.name}</Td>
                  <Td className="max-w-[280px] truncate">{o.item}</Td>
                  <Td className="text-muted">{o.method}</Td>
                  <Td className="text-muted">{o.date}</Td>
                  <Td className="text-right font-semibold tabular-nums text-midnight">{brl(o.value)}</Td>
                  <Td>
                    {o.status === "pago" ? (
                      <Pill tone="success" icon={CheckCircle2}>
                        Pago
                      </Pill>
                    ) : o.status === "pendente" ? (
                      <Pill tone="warning" icon={Clock}>
                        Pendente
                      </Pill>
                    ) : (
                      <Pill icon={RotateCcw}>Reembolsado</Pill>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {tab === "cupons" && (
          <Table>
            <thead>
              <tr>
                <Th>Código</Th>
                <Th>Desconto</Th>
                <Th>Vale para</Th>
                <Th className="text-right">Usos</Th>
                <Th>Validade</Th>
                <Th>Ativo</Th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr key={c.code} className="transition-colors hover:bg-snow/60">
                  <Td>
                    <span className="rounded-md bg-canvas px-2 py-1 font-mono text-[0.8rem] font-semibold text-midnight">{c.code}</span>
                  </Td>
                  <Td className="font-semibold text-midnight">{c.discount}</Td>
                  <Td>{c.applies}</Td>
                  <Td className="text-right tabular-nums">{c.uses}</Td>
                  <Td className="text-muted">{c.until}</Td>
                  <Td>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={c.active}
                      aria-label={`Cupom ${c.code} ativo`}
                      onClick={() => setCoupons((prev) => prev.map((x, k) => (k === i ? { ...x, active: !x.active } : x)))}
                      className={cn("relative h-6 w-10 cursor-pointer rounded-full transition-colors", c.active ? "bg-purple" : "bg-hairline")}
                    >
                      <span className={cn("absolute left-1 top-1 size-4 rounded-full bg-card shadow transition-transform", c.active && "translate-x-4")} />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}

function Mini({ icon, tone, label, value }: { icon: typeof Users; tone: "purple" | "success" | "orange" | "coral"; label: string; value: string }) {
  return (
    <Card as="div" className="flex items-center gap-4 lg:p-5">
      <IconTile icon={icon} tone={tone} size="lg" />
      <div>
        <p className="text-[0.8rem] text-muted">{label}</p>
        <p className="text-[1.4rem] font-semibold tabular-nums text-midnight">{value}</p>
      </div>
    </Card>
  );
}
