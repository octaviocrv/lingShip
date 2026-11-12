import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { conversations, getConversation } from "@/features/platform/content/catalog";
import { ContentEditor } from "@/features/platform/teacher/editor";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return conversations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Editar · ${getConversation((await params).slug)?.question ?? "conversa"}` };
}

export default async function Page({ params }: Props) {
  const c = getConversation((await params).slug);
  if (!c) notFound();
  return <ContentEditor conversation={c} />;
}
