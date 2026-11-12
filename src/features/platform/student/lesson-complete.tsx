"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

/** Marcar aula como concluída. No protótipo o estado vive só na tela. */
export function LessonComplete({ initial }: { initial: boolean }) {
  const [done, setDone] = useState(initial);
  return (
    <button
      type="button"
      aria-pressed={done}
      onClick={() => setDone((v) => !v)}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-[0.86rem] font-semibold transition-colors",
        done ? "bg-success-soft text-success" : "border border-hairline bg-card text-midnight hover:border-purple/30",
      )}
    >
      {done ? <CheckCircle2 aria-hidden className="size-4" /> : <Check aria-hidden className="size-4" />}
      {done ? "Aula concluída" : "Marcar como concluída"}
    </button>
  );
}
