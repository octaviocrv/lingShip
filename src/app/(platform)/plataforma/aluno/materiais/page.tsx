import type { Metadata } from "next";
import { Materials } from "@/features/platform/student/materials";

export const metadata: Metadata = { title: "Materiais" };

export default function Page() {
  return <Materials />;
}
