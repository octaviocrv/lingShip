const brlFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const brlShortFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const intFormat = new Intl.NumberFormat("pt-BR");

/** R$ 1.234,56 */
export const brl = (value: number) => brlFormat.format(value);
/** R$ 1.235 (sem centavos, para números grandes de painel) */
export const brlShort = (value: number) => brlShortFormat.format(value);
/** 1.234 */
export const int = (value: number) => intFormat.format(value);
/** +12,4% / -3,1% */
export const pct = (value: number) => `${value > 0 ? "+" : ""}${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
