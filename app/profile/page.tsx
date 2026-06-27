import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="mt-6 space-y-2">
        <p><strong>Name:</strong> {user.user_metadata.full_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>

        {user.user_metadata.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            width={120}
            className="rounded-full mt-4"
          />
        )}
      </div>
    </main>
  );
}