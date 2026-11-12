import type { Metadata } from "next";
import { TeacherCourses } from "@/features/platform/teacher/courses";

export const metadata: Metadata = { title: "Cursos" };

export default function Page() {
  return <TeacherCourses />;
}
