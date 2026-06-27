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