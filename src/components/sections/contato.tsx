import { Mail, Mic } from "lucide-react";
import { ActionButton, Container, Eyebrow } from "@/components/ui/primitives";
import { contatoForm, contatoSection } from "@/content/contato";

const fieldClass =
  "mt-2 w-full rounded-full border border-line bg-white/75 px-5 py-3 text-[0.92rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-purple/50 focus:bg-white";
const labelClass = "text-[0.66rem] font-bold uppercase tracking-[0.2em] text-ink";

/**
 * "Fale com a Vanessa". O formulário ainda não envia nada: o botão "Enviar mensagem"
 * fica sem ação até a integração (e-mail, WhatsApp ou outro destino) ser definida.
 */
export function Contato() {
  const badgeIcons = [Mail, Mic];

  return (
    <section id="contato" className="bg-aura py-14 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div data-reveal className="max-lg:text-center">
          <Eyebrow className="max-lg:justify-center">{contatoSection.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-title font-medium">{contatoSection.title}</h2>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-[1.9] text-muted max-lg:mx-auto">{contatoSection.description}</p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 max-lg:justify-center">
            {contatoSection.badges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? Mail;
              return (
                <li key={badge} className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  <Icon className="size-4 text-orange" aria-hidden />
                  {badge}
                </li>
              );
            })}
          </ul>
        </div>

        <form data-reveal className="glass rounded-panel p-6 sm:p-9" noValidate aria-label="Formulário de contato">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>{contatoForm.nome.label}</span>
              <input type="text" name="nome" autoComplete="name" placeholder={contatoForm.nome.placeholder} className={fieldClass} />
            </label>
            <label className="block">
              <span className={labelClass}>{contatoForm.email.label}</span>
              <input type="email" name="email" autoComplete="email" placeholder={contatoForm.email.placeholder} className={fieldClass} />
            </label>
            <label className="block">
              <span className={labelClass}>{contatoForm.whatsapp.label}</span>
              <input type="tel" name="whatsapp" autoComplete="tel" placeholder={contatoForm.whatsapp.placeholder} className={fieldClass} />
            </label>
            <label className="block">
              <span className={labelClass}>{contatoForm.assunto.label}</span>
              <select name="assunto" defaultValue={contatoForm.assunto.options[0]} className={`${fieldClass} cursor-pointer appearance-none`}>
                {contatoForm.assunto.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className={labelClass}>{contatoForm.mensagem.label}</span>
              <textarea
                name="mensagem"
                rows={4}
                placeholder={contatoForm.mensagem.placeholder}
                className={`${fieldClass} resize-y rounded-[1.25rem]`}
              />
            </label>
          </div>
          <ActionButton size="lg" className="mt-7 w-full">
            {contatoSection.submit}
          </ActionButton>
        </form>
      </Container>
    </section>
  );
}
