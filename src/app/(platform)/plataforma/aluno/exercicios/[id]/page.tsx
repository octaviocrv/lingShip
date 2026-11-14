import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { studentExercises } from "@/features/platform/content/learning-items";
import { ExerciseDetail } from "@/features/platform/student/exercises";

export const metadata: Metadata = { title: "Exercício" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = studentExercises.find((item) => item.id === id);
  if (!exercise) notFound();
  return <ExerciseDetail exercise={exercise} />;
}
