import type { Metadata } from "next";
import { Settings } from "@/features/platform/student/settings";

export const metadata: Metadata = { title: "Configurações" };

export default function Page() {
  return <Settings />;
}
