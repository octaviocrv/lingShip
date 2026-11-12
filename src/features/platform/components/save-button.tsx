"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/cn";

/** Salvar conversa. No protótipo o estado vive só na tela (não é gravado). */
export function SaveButton({
  initial = false,
  variant = "icon",
  className,
}: {
  initial?: boolean;
  variant?: "icon" | "button";
  className?: string;
}) {
  const [saved, setSaved] = useState(initial);
  const label = saved ? "Salva" : "Salvar";

  if (variant === "button") {
    return (
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => setSaved((v) => !v)}
        className={cn(
          "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border px-5 text-[0.86rem] font-semibold transition-colors",
          saved ? "border-purple/30 bg-surface text-purple" : "border-hairline bg-card text-midnight hover:border-purple/30",
          className,
        )}
      >
        <Bookmark aria-hidden className={cn("size-4", saved && "fill-current")} />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remover dos salvos" : "Salvar conversa"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved((v) => !v);
      }}
      className={cn(
        "grid size-9 cursor-pointer place-items-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-colors",
        saved ? "text-purple" : "text-midnight hover:text-purple",
        className,
      )}
    >
      <Bookmark aria-hidden className={cn("size-4", saved && "fill-current")} />
    </button>
  );
}
