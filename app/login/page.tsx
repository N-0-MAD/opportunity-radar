"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function signIn() {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <button
        onClick={signIn}
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
      >
        Continue with Google
      </button>
    </main>
  );
}