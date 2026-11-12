import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/features/platform/content/catalog";
import { CourseBuilder } from "@/features/platform/teacher/course-builder";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Curso · ${getCourse((await params).slug)?.title ?? ""}` };
}

export default async function Page({ params }: Props) {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  return <CourseBuilder course={course} />;
}
