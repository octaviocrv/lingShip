import Image from "next/image";
import Link from "next/link";
import { Clock, FileText, Headphones, Lock, PlayCircle } from "lucide-react";
import { routes } from "@/config/routes";
import { brl } from "@/lib/format";
import { cn } from "@/lib/cn";
import { situationLabel, type Access, type Conversation } from "../content/catalog";
import { Pill } from "./ui";
import { SaveButton } from "./save-button";

export const formatIcon = { Vídeo: PlayCircle, Áudio: Headphones, Ficha: FileText } as const;

export function AccessPill({ access, owned }: { access: Access; owned?: boolean }) {
  if (access.kind === "gratuito") return <Pill tone="success">Gratuita</Pill>;
  if (access.kind === "assinatura") return <Pill tone="purple">Na assinatura</Pill>;
  if (owned) return <Pill tone="success">Comprada</Pill>;
  return (
    <Pill tone="orange" icon={Lock}>
      {brl(access.price)}
    </Pill>
  );
}

/** Card de conversa: a pergunta é o título; a situação vem como contexto, nunca "matéria". */
export function ConversationCard({
  conversation: c,
  saved,
  compact,
  className,
}: {
  conversation: Conversation;
  saved?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const FormatIcon = formatIcon[c.format];
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-box bg-card shadow-card transition-[box-shadow,translate] duration-300 focus-within:shadow-card-hover hover:-translate-y-0.5 hover:shadow-card-hover",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", compact ? "aspect-[16/9]" : "aspect-[16/10]")}>
        <Image
          src={c.cover}
          alt=""
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <AccessPill access={c.access} />
          <SaveButton initial={saved} className="relative z-10" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 lg:p-5">
        <p className="text-[0.72rem] font-semibold text-purple">{situationLabel(c.situations[0])}</p>
        <h3 className={cn("mt-1.5 font-serif font-semibold leading-snug text-midnight", compact ? "text-[1rem]" : "text-[1.08rem]")}>
          {/* link esticado: o card inteiro é clicável, sem botão dentro de link */}
          <Link
            href={routes.platform.student.conversation(c.slug)}
            className="outline-none after:absolute after:inset-0 after:rounded-box focus-visible:after:outline-2 focus-visible:after:outline-purple"
          >
            {c.question}
          </Link>
        </h3>
        {!compact && <p className="mt-2 line-clamp-2 text-[0.84rem] leading-relaxed text-muted">{c.hook}</p>}
        <p className="mt-auto flex items-center gap-3 pt-4 text-[0.76rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <FormatIcon aria-hidden className="size-3.5" />
            {c.format}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5" />
            {c.minutes} min
          </span>
        </p>
      </div>
    </article>
  );
}
