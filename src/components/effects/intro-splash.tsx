"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

/** "Olá" em vários idiomas: a língua como ponte (o tema da Lingship). */
const WORDS = ["Olá", "Hello", "Hola", "Bonjour", "Ciao", "Hello"];

/**
 * Abertura do site, com cara de aula: fundo grafite com as pautas de um caderno e a margem
 * laranja. As palavras de "olá" giram como um letreiro, o símbolo L" se monta (o quadrado
 * salta, o L sobe, as aspas caem como uma fala), o nome surge letra por letra com a tagline,
 * uma linha laranja de progresso corre embaixo e a cortina sobe em curva revelando o hero.
 *
 * A animação é toda em CSS (app/globals.css, bloco "ABERTURA"), então começa antes do React
 * carregar. Só aparece quando o script do <head> marca o <html> com a classe "splash" (há JS e
 * não há "reduzir movimento"). Este componente só trava a rolagem, oferece "Pular" e se remove.
 */
export function IntroSplash() {
  const [state, setState] = useState<"on" | "skip" | "done">("on");

  useEffect(() => {
    const html = document.documentElement;
    window.scrollTo(0, 0);
    // sem a classe (menos movimento), o CSS já deixa a abertura escondida
    if (!html.classList.contains("splash")) return;
    html.style.overflow = "hidden";
    const end = window.setTimeout(() => {
      html.style.overflow = "";
      setState("done");
    }, 3700);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = "";
    };
  }, []);

  function skip() {
    const html = document.documentElement;
    html.classList.add("splash-skip");
    html.style.overflow = "";
    setState("skip");
    window.setTimeout(() => setState("done"), 600);
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

      <button type="button" onClick={skip} className="splash-skip-btn">
        Pular
      </button>
    </div>
  );
}
