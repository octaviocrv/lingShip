import type { Metadata } from "next";
import { Exercises } from "@/features/platform/student/exercises";

export const metadata: Metadata = { title: "Exercícios" };

export default function Page() {
  return <Exercises />;
}
