import Image from "next/image";
import { Captions, Gauge, Lock, Play, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Player do protótipo (só a capa e os controles visuais; não há vídeo real).
 * Usado na página da conversa e na aula do curso.
 */
export function VideoPlayer({
  poster,
  label,
  icon: Icon,
  locked,
  className,
}: {
  poster: string;
  /** texto do canto inferior (ex.: "Vídeo · 12 min") */
  label: string;
  icon: LucideIcon;
  /** texto do bloqueio (ex.: "Conversa avulsa · R$ 29,90"); sem ele, mostra o play */
  locked?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-[calc(var(--radius-box)-0.5rem)] bg-midnight", className)}>
      <Image src={poster} alt="" fill priority sizes="(min-width: 1280px) 60vw, 95vw" className={cn("object-cover", locked && "opacity-60 blur-[2px]")} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(21_13_44/0.65))]" />
      <div className="absolute inset-0 grid place-items-center">
        {locked ? (
          <div className="flex flex-col items-center text-center text-snow">
            <span className="grid size-16 place-items-center rounded-full bg-card/20 backdrop-blur">
              <Lock aria-hidden className="size-7" />
            </span>
            <p className="mt-3 text-[0.95rem] font-semibold">{locked}</p>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Reproduzir (demonstração)"
            className="grid size-16 cursor-pointer place-items-center rounded-full bg-snow/95 text-purple shadow-[0_12px_40px_rgb(0_0_0/0.3)] transition hover:scale-105 sm:size-18"
          >
            <Play aria-hidden className="ml-1 size-7 fill-current" />
          </button>
        )}
      </div>
      <div className="absolute inset-x-4 bottom-3.5 flex items-center gap-2 text-[0.74rem] font-medium text-snow/90 lg:inset-x-5">
        <span className="inline-flex items-center gap-1.5">
          <Icon aria-hidden className="size-3.5" />
          {label}
        </span>
        <span className="ml-auto flex gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 backdrop-blur">
            <Captions aria-hidden className="size-3.5" />
            <span className="hidden sm:inline">Legenda revisada</span>
          </span>
          <span className="hidden items-center gap-1 rounded-full bg-black/30 px-2 py-1 backdrop-blur sm:inline-flex">
            <Gauge aria-hidden className="size-3.5" />
            1x
          </span>
        </span>
      </div>
    </div>
  );
}
