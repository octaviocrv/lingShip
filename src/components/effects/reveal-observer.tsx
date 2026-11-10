"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-in]), [data-reveal-group] > :not([data-in])";

/**
 * Um único IntersectionObserver para a página inteira (scroll reveal).
 * Marca com [data-in] cada [data-reveal] e cada filho de [data-reveal-group]
 * quando entra na tela; o CSS (app/globals.css) faz a transição.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
    const show = (el: Element) => el.setAttribute("data-in", "");

    if (!("IntersectionObserver" in window)) {
      elements.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
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
