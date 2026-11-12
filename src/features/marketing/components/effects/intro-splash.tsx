"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/config/site";
import { createIntroSound } from "./intro-sound";

/** "Olá" em vários idiomas: a língua como ponte (o tema da Lingship). */
const WORDS = ["Olá", "Hello", "Hola", "Bonjour", "Ciao", "Hello"];

type Sound = NonNullable<ReturnType<typeof createIntroSound>>;

/**
 * Abertura do site, com cara de aula: fundo grafite com as pautas de um caderno e a margem
 * laranja. As palavras de "olá" giram como um letreiro, o símbolo L" se monta (o quadrado
 * salta, o L sobe, as aspas caem como uma fala), o nome surge letra por letra com a tagline,
 * uma linha laranja de progresso corre embaixo e a cortina sobe em curva revelando o hero.
 *
 * Sons sincronizados com cada movimento (./intro-sound.ts). Como o navegador só libera áudio
 * depois de um gesto, o botão "Ativar som" (ou qualquer toque/tecla) liga o som, que segue no
 * ritmo do que ainda falta da animação.
 *
 * A animação é toda em CSS (app/globals.css, bloco "ABERTURA"), então começa antes do React
 * carregar. Só aparece quando o script do <head> marca o <html> com a classe "splash" (há JS e
 * não há "reduzir movimento"). Este componente trava a rolagem, oferece "Pular" e o som, e se remove.
 */
export function IntroSplash() {
  const [state, setState] = useState<"on" | "skip" | "done">("on");
  const [audio, setAudio] = useState<"off" | "on" | "muted">("off");
  const sound = useRef<Sound | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    window.scrollTo(0, 0);
    // sem a classe (menos movimento), o CSS já deixa a abertura escondida
    if (!html.classList.contains("splash")) return;

    sound.current = createIntroSound();
    // se o navegador já permitir áudio (visitas anteriores), toca direto
    sound.current?.start().then((ok) => ok && setAudio("on"));

    // qualquer toque ou tecla durante a abertura libera o som
    const unlock = () => {
      sound.current?.start().then((ok) => ok && setAudio((a) => (a === "off" ? "on" : a)));
    };
    window.addEventListener("pointerdown", unlock, { once: true });

    html.style.overflow = "hidden";
    const end = window.setTimeout(() => {
      html.style.overflow = "";
      setState("done");
    }, 3700);
    const onKey = (e: KeyboardEvent) => (e.key === "Escape" ? skip() : unlock());
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", unlock);
      html.style.overflow = "";
      sound.current?.close();
    };
  }, []);

  function skip() {
    const html = document.documentElement;
    html.classList.add("splash-skip");
    html.style.overflow = "";
    sound.current?.skip();
    setState("skip");
    window.setTimeout(() => setState("done"), 600);
  }

  async function toggleSound() {
    const s = sound.current;
    if (!s) return;
    if (audio === "off") {
      if (await s.start()) setAudio("on");
      return;
    }
    const mute = audio === "on";
    s.mute(mute);
    setAudio(mute ? "muted" : "on");
  }

  if (state === "done") return null;

  return (
    <div className={`splash-overlay${state === "skip" ? " is-skip" : ""}`} role="presentation">
      <div className="splash-content">
        <div className="splash-stage">
          {/* letreiro de "olá" */}
          <div className="splash-words" aria-hidden>
            <div className="splash-words-track">
              {WORDS.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          </div>

          {/* símbolo L" montando */}
          <svg viewBox="0 0 64 64" className="splash-mark" aria-hidden>
            <rect className="splash-mark-box" width="64" height="64" rx="18" />
            <text className="splash-mark-l" x="27" y="50" textAnchor="middle" fontSize="46" fontWeight="600">
              L
            </text>
            <text className="splash-mark-q" x="46" y="40" textAnchor="middle" fontSize="30" fontWeight="700">
              {"”"}
            </text>
          </svg>
        </div>

        <p className="splash-name" aria-label={siteConfig.name}>
          {siteConfig.name.split("").map((letter, i) => (
            <span key={i} aria-hidden style={{ animationDelay: `${1600 + i * 45}ms` }}>
              {letter}
            </span>
          ))}
        </p>
        <p className="splash-tagline">{siteConfig.tagline}</p>
      </div>

      <span className="splash-progress" aria-hidden />

      <button
        type="button"
        onClick={toggleSound}
        className="splash-sound-btn"
        aria-pressed={audio === "on"}
        aria-label={audio === "on" ? "Desligar som" : "Ativar som"}
      >
        {audio === "on" ? <Volume2 className="size-3.5" aria-hidden /> : <VolumeX className="size-3.5" aria-hidden />}
        {audio === "off" ? "Ativar som" : audio === "on" ? "Som" : "Sem som"}
      </button>

      <button type="button" onClick={skip} className="splash-skip-btn">
        Pular
      </button>
    </div>
  );
}
