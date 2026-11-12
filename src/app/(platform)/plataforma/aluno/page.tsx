import type { Metadata } from "next";
import { StudentHome } from "@/features/platform/student/home";

export const metadata: Metadata = { title: "Início" };

export default function Page() {
  return <StudentHome />;
}
