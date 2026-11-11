"use client";

import { useEffect } from "react";

const SELECTOR =
  "[data-reveal]:not([data-in]), [data-reveal-group] > :not([data-in]), [data-txt]:not([data-in]), [data-words]:not([data-in])";

/** Textos que ganham o efeito de ir surgindo (a primeira dobra, #inicio, tem a própria animação). */
const TEXT_SELECTOR =
  "main :is(p, h4, li, blockquote, figcaption, summary), footer :is(p, li), main :is(h2, h3), footer h2";
const SKIP = "#inicio, [data-no-txt], nav, button, a";

/** Títulos só com texto: cada palavra vira uma máscara com a palavra subindo de dentro dela. */
function splitWords(el: HTMLElement) {
  if (Array.from(el.childNodes).some((n) => n.nodeType !== Node.TEXT_NODE)) return false;
  const text = el.textContent ?? "";
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return false;
  el.setAttribute("aria-label", text.trim());
  el.textContent = "";
  words.forEach((word, i) => {
    const mask = document.createElement("span");
    mask.className = "w";
    mask.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "wi";
    inner.style.setProperty("--i", String(i));
    inner.textContent = word;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.setAttribute("data-words", "");
  return true;
}

/** Marca os textos da página para o efeito. Idempotente (o modo estrito do React roda o efeito 2x). */
function tagTexts() {
  document.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
    if (el.hasAttribute("data-txt") || el.hasAttribute("data-words")) return;
    if (el.closest(SKIP) || el.matches("[data-reveal]")) return;
    if (el.parentElement?.hasAttribute("data-reveal-group")) return; // o próprio card já entra em cascata
    if (el.matches("li") && el.querySelector("p, ul, ol, li")) return;
    if (el.matches("h2, h3") && splitWords(el)) return;
    el.setAttribute("data-txt", "");
  });
}

/**
 * Um único IntersectionObserver para a página inteira (scroll reveal).
 * Marca com [data-in] cada [data-reveal], cada filho de [data-reveal-group] e cada texto
 * (parágrafos, itens, títulos por palavra) quando entra na tela; o CSS (app/globals.css) faz a transição.
 */
export function RevealObserver() {
  useEffect(() => {
    tagTexts();
    const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
    const show = (el: Element, delay = 0) => {
      if (delay) (el as HTMLElement).style.setProperty("--txt-delay", `${delay}ms`);
      el.setAttribute("data-in", "");
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // os textos que entram juntos surgem em cascata (um pouco depois do anterior)
        let n = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const isText = el.hasAttribute("data-txt") || el.hasAttribute("data-words");
          show(el, isText ? Math.min(n++ * 110, 660) : 0);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 60% -10% 60%", threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));

    // Se o usuário pular direto para o fim (âncora, tecla End), nada fica escondido acima.
    const revealPassed = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          show(el);
          observer.unobserve(el);
        }
      });
    };
    window.addEventListener("scrollend", revealPassed, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", revealPassed);
    };
  }, []);

  return null;
}
