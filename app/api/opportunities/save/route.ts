import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { opportunityId } = await req.json();

  const { error } = await supabase
    .from("saved_opportunities")
    .insert({
      user_id: user.id,
      opportunity_id: opportunityId,
      status: "saved",
    });

  if (error)
    return NextResponse.json(error, { status: 400 });

  return NextResponse.json({ success: true });
}