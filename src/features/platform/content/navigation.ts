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

export type NavItem = { label: string; href: string; icon: LucideIcon; badge?: string; exact?: boolean };

const s = routes.platform.student;
const t = routes.platform.teacher;

export const studentNav: NavItem[] = [
  { label: "Início", href: s.home, icon: House, exact: true },
  { label: "Conversas", href: s.conversations, icon: MessagesSquare },
  { label: "Meus cursos", href: s.courses, icon: BookOpen },
  { label: "Meu percurso", href: s.journey, icon: Route },
  { label: "Mentoria", href: s.mentoring, icon: GraduationCap },
];

export const studentNavSecondary: NavItem[] = [
  { label: "Compras", href: s.purchases, icon: Receipt },
  { label: "Configurações", href: s.settings, icon: Settings },
];

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
