import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConversation, publishedConversations } from "@/features/platform/content/catalog";
import { ConversationPage } from "@/features/platform/student/conversation-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedConversations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getConversation((await params).slug);
  return { title: c?.question ?? "Conversa" };
}

export default async function Page({ params }: Props) {
  const c = getConversation((await params).slug);
  if (!c || c.status !== "publicado") notFound();
  return <ConversationPage conversation={c} />;
}
