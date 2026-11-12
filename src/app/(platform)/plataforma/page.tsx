import { redirect } from "next/navigation";
import { routes } from "@/config/routes";

export default function PlatformIndex() {
  redirect(routes.platform.student.home);
}
