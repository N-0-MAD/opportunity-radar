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

  const fullName = getUserFullName(user.user_metadata, user.email);
  const avatarUrl =
    typeof user.user_metadata.avatar_url === "string"
      ? user.user_metadata.avatar_url
      : undefined;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="mt-6 space-y-2">
        <p><strong>Full name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>

        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            width={120}
            className="rounded-full mt-4"
          />
        ) : (
          <div className="mt-4 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-muted text-3xl font-semibold">
            {getInitials(fullName)}
          </div>
        )}
      </div>
    </main>
  );
}

function getUserFullName(
  metadata: Record<string, unknown>,
  email: string | undefined,
) {
  if (typeof metadata.full_name === "string") return metadata.full_name;
  if (typeof metadata.name === "string") return metadata.name;

  return email ?? "Account";
}

function getInitials(value: string) {
  return (
    value
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}
