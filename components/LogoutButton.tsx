"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:border-nano-teal hover:text-nano-teal"
    >
      Logout
    </button>
  );
}
