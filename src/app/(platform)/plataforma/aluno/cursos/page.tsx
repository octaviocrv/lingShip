import type { Metadata } from "next";
import { MyCourses } from "@/features/platform/student/courses";

export const metadata: Metadata = { title: "Meus cursos" };

export default function Page() {
  return <MyCourses />;
}
