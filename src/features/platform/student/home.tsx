import { ArrowRight, CalendarDays, CalendarOff, ClipboardList, FileText, Layers3, Megaphone, Route, Sparkles, UserRound, UsersRound, Video, Wrench } from "lucide-react";
import { routes } from "@/config/routes";
import { announcements } from "../content/announcements";
import { student } from "../content/student";
import { BtnLink, Card, IconTile, Pill } from "../components/ui";

const s = routes.platform.student;

/**
 * Início de primeira entrada. A home apresenta caminhos e estados vazios, sem inventar
 * progresso, aulas concluídas ou compromissos para uma aluna que acabou de entrar.
 */
export function StudentHome() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <WelcomeHero />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
        <div className="min-w-0 space-y-10">
          <StudentSpace />
          <Announcements />
        </div>

        <aside className="space-y-5" aria-label="Agenda e atividades">
          <EmptyStatus icon={CalendarDays} title="Próxima aula" message="Nenhuma aula agendada" />
          <EmptyStatus icon={ClipboardList} title="Atividades" message="Nenhuma atividade disponível no momento" />
          <EmptyStatus icon={UsersRound} title="Encontros" message="Nenhum encontro programado" />
        </aside>
      </div>
    </div>
  );
}

function Announcements() {
  const meta = {
    calendario: { icon: CalendarOff, iconTone: "orange", pillTone: "orange", label: "Calendário" },
    ferias: { icon: CalendarDays, iconTone: "purple", pillTone: "purple", label: "Férias" },
    plataforma: { icon: Wrench, iconTone: "success", pillTone: "success", label: "Plataforma" },
    pessoal: { icon: UserRound, iconTone: "coral", pillTone: "neutral", label: "Para você" },
  } as const;

  return (
    <section aria-labelledby="recados">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-purple">Acompanhe por aqui</p>
          <SectionTitle id="recados">Quadro de recados</SectionTitle>
        </div>
        <Pill tone="purple" icon={Megaphone}>{announcements.length} avisos</Pill>
      </div>
      <Card className="overflow-hidden p-0">
        <ul className="divide-y divide-hairline">
          {announcements.map((announcement) => {
            const item = meta[announcement.kind];
            const Icon = item.icon;
            return (
              <li key={announcement.id} className="flex gap-4 px-5 py-5 sm:px-6">
                <IconTile icon={Icon} tone={item.iconTone} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><Pill tone={item.pillTone}>{item.label}</Pill><span className="text-[0.72rem] text-muted">{announcement.date}</span></div>
                  <h3 className="mt-2 text-[0.94rem] font-semibold leading-snug text-midnight">{announcement.title}</h3>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{announcement.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </section>
  );
}

function WelcomeHero() {
  return (
    <section
      aria-labelledby="boas-vindas"
      className="relative overflow-hidden rounded-box bg-[linear-gradient(120deg,var(--color-lilac)_0%,var(--color-blush)_100%)] p-6 sm:p-8 lg:p-10"
    >
      <span aria-hidden className="pointer-events-none absolute -right-3 -top-12 font-logo text-[13rem] leading-none text-purple/10">
        ”
      </span>
      <div className="relative max-w-2xl">
        <Pill tone="solid" icon={Sparkles}>
          Seu acesso está ativo
        </Pill>
        <p className="mt-6 text-[0.95rem] text-ink">Olá, {student.firstName}.</p>
        <h1 id="boas-vindas" className="mt-2 font-serif text-[clamp(2rem,1.3rem+2vw,3.25rem)] font-semibold leading-[1.06] text-midnight">
          Que bom ter você aqui.
        </h1>
        <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-muted sm:text-[1.05rem]">
          Aqui você encontra aulas, materiais e o que for construindo ao longo do caminho. Comece por onde fizer sentido para você.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <BtnLink href={s.conversations} variant="dark">
            Começar pelas conversas
            <ArrowRight aria-hidden />
          </BtnLink>
          <BtnLink href={s.courses} variant="secondary" className="border-transparent bg-white/70">
            Ver cursos e aulas
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="flex items-center gap-4 font-serif text-[clamp(1.55rem,1.2rem+1vw,2.15rem)] font-semibold text-midnight">
      <span aria-hidden className="h-1 w-10 rounded-full bg-orange" />
      {children}
    </h2>
  );
}

function StudentSpace() {
  const destinations = [
    { icon: Video, title: "Minhas aulas", description: "Aulas e gravações", href: s.classes },
    { icon: FileText, title: "Materiais", description: "Arquivos, textos e links", href: s.materials },
    { icon: Layers3, title: "Minhas revisões", description: "Vocabulário e flashcards", href: s.conversations },
    { icon: Route, title: "Meu percurso", description: "Sua evolução", href: s.journey },
  ];

  return (
    <section aria-labelledby="seu-espaco">
      <SectionTitle id="seu-espaco">Seu espaço</SectionTitle>
      <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
        Suas aulas, materiais e produções vão aparecer aqui conforme você usar a plataforma.
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {destinations.map(({ icon, title, description, href }) => (
          <li key={title}>
            <BtnLink
              href={href}
              variant="secondary"
              className="group h-auto w-full justify-start whitespace-normal rounded-box px-5 py-5 text-left hover:border-purple/30 hover:bg-snow"
            >
              <IconTile icon={icon} tone="purple" className="group-hover:bg-lilac" />
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-[1.2rem] font-semibold leading-tight text-midnight">{title}</span>
                <span className="mt-1 block text-[0.84rem] font-normal text-muted">{description}</span>
              </span>
              <ArrowRight aria-hidden className="text-orange transition-transform group-hover:translate-x-1" />
            </BtnLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyStatus({ icon, title, message }: { icon: typeof CalendarDays; title: string; message: string }) {
  return (
    <Card className="min-h-52 text-center sm:p-7">
      <h2 className="text-left font-serif text-[1.5rem] font-semibold text-midnight">{title}</h2>
      <div className="flex min-h-32 flex-col items-center justify-center px-3 pt-2">
        <IconTile icon={icon} size="lg" tone="purple" />
        <p className="mt-4 max-w-56 text-[0.9rem] leading-relaxed text-muted">{message}</p>
      </div>
    </Card>
  );
}
