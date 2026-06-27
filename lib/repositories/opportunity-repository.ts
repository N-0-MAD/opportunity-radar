import { createClient } from "@/lib/supabase/server"

export async function findAllOpportunities() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function findOpportunity(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error

  return data
}
export async function saveOpportunity(
  userId: string,
  opportunityId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_opportunities")
    .insert({
      user_id: userId,
      opportunity_id: opportunityId,
      status: "saved",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function getSavedOpportunityIds(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("opportunity_id")
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((x) => x.opportunity_id);
}