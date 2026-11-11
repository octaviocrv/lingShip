"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { LinkButton } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Barra de ação flutuante, só no celular e no tablet (some no desktop). Aparece depois que o
 * hero sai da tela e se esconde quando o rodapé chega, para nunca cobrir os links dele.
 * Respeita a área segura do iPhone (barra de gestos).
 */
export function MobileDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let footerIn = false;
    const apply = () => setShow(pastHero && !footerIn);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.85;
      apply();
    };
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(([entry]) => {
      footerIn = entry.isIntersecting;
      apply();
    });
    if (footer) io.observe(footer);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0",
      )}
    >
      <div className="glass mx-auto flex max-w-md items-center gap-1.5 rounded-full p-1.5 shadow-[0_18px_50px_rgb(43_33_64/0.22)]">
        <LinkButton href="#materiais" variant="light" size="sm" tabIndex={show ? 0 : -1} className="h-11 flex-1 px-3">
          <BookOpen className="size-4" aria-hidden />
          Materiais grátis
        </LinkButton>
        <LinkButton href="#planos" size="sm" tabIndex={show ? 0 : -1} className="h-11 flex-1 px-3">
          Quero assinar
        </LinkButton>
      </div>
    </div>
  );
}
