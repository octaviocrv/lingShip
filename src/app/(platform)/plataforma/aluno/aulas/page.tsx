import type { Metadata } from "next";
import { MyClasses } from "@/features/platform/student/classes";

export const metadata: Metadata = { title: "Minhas aulas" };

export default function Page() {
  return <MyClasses />;
}
