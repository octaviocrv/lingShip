import type { Metadata } from "next";
import { ContentEditor } from "@/features/platform/teacher/editor";

export const metadata: Metadata = { title: "Nova conversa" };

/** `?pergunta=` vem do card "O que seus alunos procuraram" da visão geral. */
export default async function Page({ searchParams }: { searchParams: Promise<{ pergunta?: string }> }) {
  const { pergunta } = await searchParams;
  return <ContentEditor key={pergunta ?? ""} initialQuestion={pergunta ?? ""} />;
}
