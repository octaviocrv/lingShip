import type { Metadata } from "next";
import { Purchases } from "@/features/platform/student/purchases";

export const metadata: Metadata = { title: "Compras" };

export default function Page() {
  return <Purchases />;
}
