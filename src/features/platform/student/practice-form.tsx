"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mic, Paperclip } from "lucide-react";
import { Btn } from "../components/ui";

/** "Sua experiência": registro opcional da produção. No protótipo nada é enviado. */
export function PracticeForm() {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-tile bg-success-soft px-4 py-4 text-[0.88rem] text-ink">
        <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
        <p>
          <span className="font-semibold text-midnight">Produção registrada no seu percurso.</span> Ela fica visível só para você
          (e para a Vanessa, se você estiver na mentoria). <span className="text-muted">Demonstração: nada foi enviado.</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="pratica" className="sr-only">
        Sua produção
      </label>
      <textarea
        id="pratica"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva aqui como foi, ou grave um áudio. Não precisa estar perfeito."
        className="w-full resize-none rounded-tile border border-hairline bg-snow/60 px-4 py-3 text-[0.9rem] text-ink outline-none transition focus:border-purple/40 focus:bg-card focus:shadow-[0_0_0_4px_rgb(109_63_192/0.1)]"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <Btn type="button" variant="soft" size="sm">
          <Mic aria-hidden />
          Gravar áudio
        </Btn>
        <Btn type="button" variant="ghost" size="sm">
          <Paperclip aria-hidden />
          Anexar
        </Btn>
        <Btn type="submit" size="sm" className="ml-auto">
          Registrar no meu percurso
        </Btn>
      </div>
    </form>
  );
}
