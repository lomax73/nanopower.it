import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Accedi | Area Tecnici nanopower.it",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex flex-col py-24">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
