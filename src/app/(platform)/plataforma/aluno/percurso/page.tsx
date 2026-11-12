import type { Metadata } from "next";
import { Journey } from "@/features/platform/student/journey";

export const metadata: Metadata = { title: "Meu percurso" };

export default function Page() {
  return <Journey />;
}
