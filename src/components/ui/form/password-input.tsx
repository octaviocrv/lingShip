"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { TextInput, type TextInputProps } from "./text-field";

/** Campo de senha com cadeado à esquerda e botão de mostrar/ocultar à direita. */
export function PasswordInput(props: Omit<TextInputProps, "type" | "icon" | "trailing">) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? Eye : EyeOff;

  return (
    <TextInput
      {...props}
      type={visible ? "text" : "password"}
      icon={LockKeyhole}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          className="grid shrink-0 cursor-pointer place-items-center rounded-full text-midnight/85 transition-colors hover:text-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
        >
          <Icon aria-hidden strokeWidth={1.7} className="size-[var(--field-icon,1.25rem)]" />
        </button>
      }
    />
  );
}
