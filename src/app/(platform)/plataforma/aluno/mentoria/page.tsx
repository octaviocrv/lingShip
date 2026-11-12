import type { Metadata } from "next";
import { StudentMentoring } from "@/features/platform/student/mentoring";

export const metadata: Metadata = { title: "Mentoria" };

export default function Page() {
  return <StudentMentoring />;
}
