import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/features/platform/content/catalog";
import { CoursePage } from "@/features/platform/student/courses";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.filter((c) => c.status === "publicado").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getCourse((await params).slug)?.title ?? "Curso" };
}

export default async function Page({ params }: Props) {
  const course = getCourse((await params).slug);
  if (!course || course.status !== "publicado") notFound();
  return <CoursePage course={course} />;
}
