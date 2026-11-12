import type { Metadata } from "next";
import { Contents } from "@/features/platform/teacher/contents";

export const metadata: Metadata = { title: "Conteúdos" };

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <Contents key={q ?? ""} initialQuery={q ?? ""} />;
}
