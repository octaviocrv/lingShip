import type { Metadata } from "next";
import { situations, type SituationId } from "@/features/platform/content/catalog";
import { Catalog } from "@/features/platform/student/catalog";

export const metadata: Metadata = { title: "Conversas" };

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; situacao?: string }> }) {
  const { q, situacao } = await searchParams;
  const situation = situations.find((s) => s.id === situacao)?.id as SituationId | undefined;
  // key: a busca da barra superior reinicia o catálogo com o novo termo
  return <Catalog key={`${q ?? ""}-${situation ?? ""}`} initialQuery={q ?? ""} initialSituation={situation} />;
}
