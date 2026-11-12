"use client";

import { useRef, useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";
import { Tag } from "@/components/ui/primitives";
import { lofi } from "@/lib/lofi";
import { materiaisSection, type Material } from "@/features/marketing/content/materiais";

/** player do YouTube sem cookies de rastreio; começa tocando, com legenda em inglês */
const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&cc_load_policy=1&cc_lang_pref=en&hl=en&rel=0&playsinline=1`;

/**
 * Cartão de vídeo: miniatura do YouTube (por link, nada é baixado) e, ao clicar, um popup
 * (<dialog>) com o player. O iframe só existe com o popup aberto, então a página não carrega
 * o YouTube antes da hora e o vídeo para ao fechar. Fecha pelo X, pela tecla Esc ou clicando
 * fora. Enquanto o vídeo está aberto, a trilha lofi do site fica em silêncio.
 */
export function MaterialCard({ material }: { material: Material }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${material.youtubeId}`;

  const show = () => {
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    setOpen(true);
    lofi.duck(true);
  };
  const close = () => dialog.current?.close();
  // chamado por qualquer forma de fechar (X, Esc, clique fora)
  const onClose = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
    lofi.duck(false);
  };

  return (
    <>
      <article className="glass group relative flex h-full flex-col overflow-hidden rounded-card">
        <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
          {/* miniatura direto do YouTube */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${material.youtubeId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-midnight/55 via-midnight/10 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-orange text-midnight shadow-button transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 size-5 fill-current" aria-hidden />
            </span>
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-2.5 py-1 text-[0.68rem] font-bold text-white tabular-nums">
            {material.duration}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{material.category}</Tag>
            <span className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-orange-deep">
              {materiaisSection.language}
            </span>
          </div>
          <h3 lang="en" className="mt-4 text-[1.12rem] font-medium leading-snug">
            {material.title}
          </h3>
          <p className="mt-3 flex-1 text-[0.86rem] leading-[1.8] text-muted">{material.summary}</p>
          <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-purple">{material.source}</p>
        </div>
        {/* o cartão inteiro abre o vídeo */}
        <button
          type="button"
          onClick={show}
          aria-haspopup="dialog"
          aria-label={`Assistir: ${material.title} (${material.duration}, em inglês)`}
          className="absolute inset-0 cursor-pointer rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        />
      </article>

      <dialog
        ref={dialog}
        onClose={onClose}
        // clique no fundo escuro (fora do conteúdo) fecha
        onClick={(e) => e.target === dialog.current && close()}
        aria-label={material.title}
        className="m-auto w-[min(94vw,960px)] max-h-[92svh] overflow-y-auto rounded-panel bg-snow p-0 text-ink shadow-soft backdrop:bg-midnight/75 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-video bg-midnight">
          {open && (
            <iframe
              src={embedUrl(material.youtubeId)}
              title={material.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full border-0"
            />
          )}
        </div>

        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{material.category}</Tag>
              <span className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-orange-deep">
                {materiaisSection.language} · {material.duration}
              </span>
            </div>
            <h3 lang="en" className="mt-3 text-[1.3rem] font-medium leading-snug">
              {material.title}
            </h3>
            <p className="mt-2 max-w-2xl text-[0.88rem] leading-[1.8] text-muted">{material.summary}</p>
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-purple underline-offset-4 hover:underline"
            >
              {materiaisSection.watchOnYoutube}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar vídeo"
            className="glass order-first grid size-11 shrink-0 cursor-pointer place-items-center self-end rounded-full text-midnight transition-all duration-300 active:scale-90 sm:order-none sm:self-start"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </dialog>
    </>
  );
}
