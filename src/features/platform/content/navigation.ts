import {
  BookOpen,
  CircleUserRound,
  Globe,
  GraduationCap,
  House,
  LayoutDashboard,
  Library,
  MessagesSquare,
  Receipt,
  Route,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";

export type NavItem = {
  label: string;
  /** rótulo curto da barra de abas do celular */
  short?: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  exact?: boolean;
};

const s = routes.platform.student;
const t = routes.platform.teacher;

/**
 * Aluno, em dois grupos:
 * - Estudar: onde o aluno aprende (continuar, cursos, conversas, o próprio percurso);
 * - Sua conta: oferta e administração (mentoria, compras, configurações).
 */
export const studentNav: NavItem[] = [
  { label: "Início", href: s.home, icon: House, exact: true },
  { label: "Meus cursos", short: "Cursos", href: s.courses, icon: BookOpen },
  { label: "Conversas", href: s.conversations, icon: MessagesSquare },
  { label: "Meu percurso", short: "Percurso", href: s.journey, icon: Route },
];

export const studentNavSecondary: NavItem[] = [
  { label: "Mentoria", href: s.mentoring, icon: GraduationCap },
  { label: "Compras", href: s.purchases, icon: Receipt },
  { label: "Configurações", href: s.settings, icon: Settings },
];

/** Rótulos dos grupos do menu do aluno (a professora não usa rótulos). */
export const studentNavLabels = { nav: "Estudar", secondary: "Sua conta" } as const;

export const teacherNav: NavItem[] = [
  { label: "Visão geral", href: t.home, icon: LayoutDashboard, exact: true },
  { label: "Conteúdos", href: t.contents, icon: Library },
  { label: "Cursos", href: t.courses, icon: BookOpen },
  { label: "Alunos e vendas", href: t.students, icon: Users },
  { label: "Mentoria", href: t.mentoring, icon: GraduationCap, badge: "3" },
];

export const teacherNavSecondary: NavItem[] = [
  { label: "Ver o site", href: routes.home, icon: Globe },
  { label: "Ver como aluno", href: s.home, icon: CircleUserRound },
];
