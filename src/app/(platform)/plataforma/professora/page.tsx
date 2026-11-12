import type { Metadata } from "next";
import { TeacherOverview } from "@/features/platform/teacher/overview";

export const metadata: Metadata = { title: "Visão geral" };

export default function Page() {
  return <TeacherOverview />;
}
