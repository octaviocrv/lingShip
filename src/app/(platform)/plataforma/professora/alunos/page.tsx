import type { Metadata } from "next";
import { StudentsAndSales } from "@/features/platform/teacher/students";

export const metadata: Metadata = { title: "Alunos e vendas" };

export default function Page() {
  return <StudentsAndSales />;
}
