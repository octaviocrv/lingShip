import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import { loginContent } from "@/features/auth/content/login";

export const metadata: Metadata = {
  title: loginContent.meta.title,
  description: loginContent.meta.description,
};

export default function LoginPage() {
  return <LoginForm />;
}
