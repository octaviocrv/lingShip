import type { Metadata } from "next";
import { TeacherMentoring } from "@/features/platform/teacher/mentoring";

export const metadata: Metadata = { title: "Mentoria" };

export default function Page() {
  return <TeacherMentoring />;
}
