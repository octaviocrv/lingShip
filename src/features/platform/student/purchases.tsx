import { CheckCircle2, CreditCard, Download, LifeBuoy, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { brl } from "@/lib/format";
import { purchases, subscription } from "../content/student";
import { Btn, Card, CardHeader, IconTile, PageHeader, Pill, Table, Td, Th } from "../components/ui";

export function Purchases() {
  return (
    <>
      <PageHeader title="Compras" description="Sua assinatura, seus pedidos e recibos, num lugar só." />

      <div className="mb-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="bg-lilac shadow-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone="success" icon={CheckCircle2}>
                Ativa
              </Pill>
              <p className="mt-4 text-[0.8rem] text-muted">Assinatura</p>
              <p className="font-serif text-[1.4rem] font-semibold text-midnight">{subscription.name}</p>
            </div>
            <IconTile icon={Sparkles} tone="dark" size="lg" />
          </div>
          <p className="mt-3 text-[0.9rem] text-ink">
            <span className="text-[1.25rem] font-semibold text-midnight">{brl(subscription.price)}</span> por mês · renova em {subscription.renews}
          </p>
          <ul className="mt-4 space-y-1.5">
            {subscription.includes.map((x) => (
              <li key={x} className="flex items-center gap-2 text-[0.84rem] text-ink">
                <CheckCircle2 aria-hidden className="size-4 text-purple" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Btn variant="dark" size="sm">
              Gerenciar assinatura
            </Btn>
          </div>
        </Card>

        <Card>
          <CardHeader title="Forma de pagamento" icon={CreditCard} />
          <div className="rounded-tile bg-[linear-gradient(135deg,var(--color-midnight),var(--color-purple-deep))] p-5 text-snow">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-snow/60">Cartão de crédito</p>
            <p className="mt-6 font-mono text-[1rem] tracking-[0.2em]">•••• 4821</p>
            <p className="mt-1 text-[0.76rem] text-snow/60">Validade 08/29 · fictício</p>
          </div>
          <Btn variant="secondary" size="sm" className="mt-4 w-full">
            Trocar cartão
          </Btn>
        </Card>

        <Card>
          <CardHeader title="Precisa de ajuda?" icon={LifeBuoy} />
          <p className="text-[0.88rem] leading-relaxed text-ink">
            Dúvidas sobre acesso, pagamento ou cancelamento? Respondemos em até 2 dias úteis.
          </p>
          <p className="mt-3 text-[0.84rem] font-semibold text-purple">{siteConfig.email}</p>
          <Btn variant="soft" size="sm" className="mt-5 w-full">
            Abrir pedido de suporte
          </Btn>
        </Card>
      </div>

      <Card>
        <CardHeader title="Histórico de pedidos" />
        <Table>
          <thead>
            <tr>
              <Th>Pedido</Th>
              <Th>Data</Th>
              <Th>Item</Th>
              <Th>Pagamento</Th>
              <Th className="text-right">Valor</Th>
              <Th>Status</Th>
              <Th>
                <span className="sr-only">Recibo</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-snow/60">
                <Td className="font-medium text-midnight">{p.id}</Td>
                <Td className="text-muted">{p.date}</Td>
                <Td>
                  <span className="font-medium text-midnight">{p.item}</span>
                  <span className="block text-[0.74rem] text-muted">{p.kind}</span>
                </Td>
                <Td className="text-muted">{p.method}</Td>
                <Td className="text-right font-semibold tabular-nums text-midnight">{brl(p.value)}</Td>
                <Td>
                  <Pill tone="success" icon={CheckCircle2}>
                    Pago
                  </Pill>
                </Td>
                <Td className="text-right">
                  <button type="button" className="inline-flex cursor-pointer items-center gap-1.5 text-[0.8rem] font-semibold text-purple hover:underline">
                    <Download aria-hidden className="size-3.5" />
                    Recibo
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
