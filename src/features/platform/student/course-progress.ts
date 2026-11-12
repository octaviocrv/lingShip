import { courses, getCourse, lessonMinutes, type Course, type CourseLesson } from "../content/catalog";
import { student } from "../content/student";

/**
 * Estado do curso para a aluna da demonstração. Um só cálculo usado pela home, pela lista de
 * cursos, pela página do curso e pela aula, para os números nunca divergirem.
 *
 * Não há bloqueio: o método não impõe ordem única. "next" é só a aula recomendada.
 */

export type LessonState = "concluida" | "proxima" | "pendente";

export type LessonView = CourseLesson & {
  /** posição na sequência do curso (0, 1, 2...) */
  index: number;
  /** número exibido ("Aula 4") */
  number: number;
  minutes: number;
  state: LessonState;
};

export type ModuleView = {
  number: number;
  title: string;
  summary: string;
  lessons: LessonView[];
  done: number;
  total: number;
  minutes: number;
  hasNext: boolean;
};

export type CourseView = {
  course: Course;
  owned: boolean;
  modules: ModuleView[];
  done: number;
  total: number;
  percent: number;
  minutes: number;
  next: LessonView | undefined;
  nextModule: ModuleView | undefined;
  reflections: number;
  productions: number;
  lastSeen?: string;
};

export function courseView(course: Course): CourseView {
  const owned = student.courses.includes(course.slug);
  const progress = student.courseProgress[course.slug];
  const completed = new Set(owned ? (progress?.completed ?? []) : []);
  const nextIndex = owned ? progress?.next : undefined;

  let index = 0;
  const modules: ModuleView[] = course.modules.map((m, mi) => {
    const lessons = m.lessons.map((lesson) => {
      const i = index++;
      const state: LessonState = completed.has(i) ? "concluida" : i === nextIndex ? "proxima" : "pendente";
      return { ...lesson, index: i, number: i + 1, minutes: lessonMinutes(lesson), state };
    });
    return {
      number: mi + 1,
      title: m.title,
      summary: m.summary,
      lessons,
      done: lessons.filter((l) => l.state === "concluida").length,
      total: lessons.length,
      minutes: lessons.reduce((a, l) => a + l.minutes, 0),
      hasNext: lessons.some((l) => l.state === "proxima"),
    };
  });

  const all = modules.flatMap((m) => m.lessons);
  const done = all.filter((l) => l.state === "concluida").length;
  return {
    course,
    owned,
    modules,
    done,
    total: all.length,
    percent: Math.round((done / all.length) * 100),
    minutes: all.reduce((a, l) => a + l.minutes, 0),
    next: all.find((l) => l.state === "proxima"),
    nextModule: modules.find((m) => m.hasNext),
    reflections: owned ? (progress?.reflections ?? 0) : 0,
    productions: owned ? (progress?.productions ?? 0) : 0,
    lastSeen: owned ? progress?.lastSeen : undefined,
  };
}

/** Cursos da aluna, na ordem em que ela estudou por último. */
export const myCourses = () =>
  student.courses.map((slug) => getCourse(slug)).filter((c): c is Course => !!c).map(courseView);

/** Cursos publicados que ela ainda não tem. */
export const otherCourses = () =>
  courses.filter((c) => c.status === "publicado" && !student.courses.includes(c.slug)).map(courseView);

/** "1h 20min" / "45 min" */
export function duration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h${m ? ` ${String(m).padStart(2, "0")}min` : ""}` : `${m} min`;
}
