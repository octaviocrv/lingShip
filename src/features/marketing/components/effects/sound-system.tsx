"use client";

import { useEffect, useState } from "react";
import { VolumeX } from "lucide-react";
import { lofi } from "@/lib/lofi";
import { cn } from "@/lib/cn";

const PREF = "lingship-som"; // "off" quando a pessoa desligou o som

function readPref() {
  try {
    return window.localStorage.getItem(PREF);
  } catch {
    return null;
  }
}
function writePref(v: "on" | "off") {
  try {
    window.localStorage.setItem(PREF, v);
  } catch {}
}

/**
 * Som do site: a trilha lofi começa no primeiro toque/clique/tecla (os navegadores não deixam
 * tocar antes disso), com fade-in; se for durante a abertura, espera ela terminar. Depois:
 * "tic" macio ao clicar em botões e links e um sininho quando cada seção aparece.
 * Botão fixo para ligar/desligar (a escolha fica salva neste navegador).
 */
export function SoundSystem() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // primeiro gesto que o navegador aceita: liga a música (se a pessoa não tiver desligado antes).
    // Tenta em todo gesto até dar certo: no celular o "encostar o dedo" não libera áudio, só o
    // "soltar" (touchend/click); por isso não dá para desistir na primeira tentativa.
    const GESTURES = ["pointerdown", "pointerup", "touchend", "click", "keydown"] as const;
    const stopListening = () => GESTURES.forEach((ev) => window.removeEventListener(ev, first, true));
    const first = (e: Event) => {
      // o botão de som cuida de si mesmo (senão o 1º clique nele ligaria e já desligaria)
      if ((e.target as Element | null)?.closest?.("[data-sound-toggle]")) return;
      if (readPref() === "off" || lofi.playing) {
        stopListening();
        return;
      }
      const splashLeft = document.documentElement.classList.contains("splash")
        ? Math.max(0, 3.6 - performance.now() / 1000)
        : 0;
      lofi.start(splashLeft).then((ok) => {
        if (!ok) return;
        setOn(true);
        stopListening();
      });
    };
    GESTURES.forEach((ev) => window.addEventListener(ev, first, { capture: true, passive: true }));

    // clique em botões e links
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button, summary, [role='tab']");
      // elementos com som próprio (ex.: a ficha de vocabulário, que faz barulho de papel) ficam de fora
      if (el && !el.hasAttribute("data-own-sound")) lofi.click();
    };
    document.addEventListener("click", onClick, true);

    // sininho quando cada seção entra na tela (uma vez por seção)
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, footer"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          if (performance.now() > 4000) lofi.chime(sections.indexOf(entry.target as HTMLElement));
        }
      },
      { threshold: 0.3 },
    );
    sections.slice(1).forEach((s) => io.observe(s)); // o hero não toca

    return () => {
      stopListening();
      document.removeEventListener("click", onClick, true);
      io.disconnect();
    };
  }, []);

  async function toggle() {
    if (lofi.playing) {
      lofi.stop();
      writePref("off");
      setOn(false);
    } else {
      writePref("on");
      setOn(await lofi.start());
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-sound-toggle
      aria-pressed={on}
      aria-label={on ? "Desligar música" : "Ligar música"}
      title={on ? "Desligar música" : "Ligar música"}
      className={cn(
        "glass fixed z-30 grid size-12 cursor-pointer place-items-center rounded-full text-midnight transition-all duration-300 active:scale-90",
        // celular: à direita, acima da barra de ação; desktop: canto inferior esquerdo
        "bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-3 lg:bottom-6 lg:left-6 lg:right-auto",
      )}
    >
      {on ? (
        <span aria-hidden className="flex h-4 items-end gap-[3px]">
          {[0, 0.3, 0.15, 0.45].map((d, i) => (
            <span
              key={i}
              className="block h-full w-[3px] origin-bottom animate-[eq_1.1s_ease-in-out_infinite] rounded-full bg-orange"
              style={{ animationDelay: `${-d}s` }}
            />
          ))}
        </span>
      ) : (
        <VolumeX className="size-5 text-muted" aria-hidden />
      )}
    </button>
  );
}
