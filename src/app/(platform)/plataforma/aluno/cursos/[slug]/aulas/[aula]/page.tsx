import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { courses, getCourse } from "@/features/platform/content/catalog";
import { student } from "@/features/platform/content/student";
import { LessonPage } from "@/features/platform/student/lesson";

type Props = { params: Promise<{ slug: string; aula: string }> };

export function generateStaticParams() {
  return courses
    .filter((c) => c.status === "publicado")
    .flatMap((c) => c.lessons.map((_, i) => ({ slug: c.slug, aula: String(i + 1) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, aula } = await params;
  const lesson = getCourse(slug)?.lessons[Number(aula) - 1];
  return { title: lesson ? `Aula ${aula} · ${lesson.question}` : "Aula" };
}

export default async function Page({ params }: Props) {
  const { slug, aula } = await params;
  const course = getCourse(slug);
  const number = Number(aula);
  if (!course || course.status !== "publicado" || !Number.isInteger(number) || !course.lessons[number - 1]) notFound();
  // aula de curso que a aluna não tem: volta para a página do curso (onde está a compra)
  if (!student.courses.includes(slug)) redirect(routes.platform.student.course(slug));
  return <LessonPage course={course} number={number} />;
}
