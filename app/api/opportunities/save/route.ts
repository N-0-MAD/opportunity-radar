import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type SaveAction = "save" | "unsave" | "track";

type SavedOpportunityRow = {
  opportunity_id: string;
  status: string | null;
};

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("opportunity_id,status")
    .eq("user_id", user.id);

  if (error)
    return NextResponse.json(error, { status: 400 });

  const savedIds = new Set<string>();
  const trackedIds = new Set<string>();

  for (const row of data as SavedOpportunityRow[]) {
    const state = stateFromStatus(row.status);

    if (state.saved) savedIds.add(row.opportunity_id);
    if (state.tracked) trackedIds.add(row.opportunity_id);
  }

  return NextResponse.json({
    savedIds: Array.from(savedIds),
    trackedIds: Array.from(trackedIds),
  });
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { opportunityId, action } = (await req.json()) as {
    opportunityId?: string;
    action?: SaveAction;
  };

  if (!opportunityId || !isSaveAction(action)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data: existing, error: findError } = await supabase
    .from("saved_opportunities")
    .select("opportunity_id,status")
    .eq("user_id", user.id)
    .eq("opportunity_id", opportunityId);

  if (findError)
    return NextResponse.json(findError, { status: 400 });

  const rows = (existing ?? []) as SavedOpportunityRow[];
  const current = rows.reduce(
    (state, row) => {
      const next = stateFromStatus(row.status);

      return {
        saved: state.saved || next.saved,
        tracked: state.tracked || next.tracked,
      };
    },
    { saved: false, tracked: false },
  );
  const next = nextState(current, action);
  const status = statusFromState(next);

  if (!status) {
    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("user_id", user.id)
      .eq("opportunity_id", opportunityId);

    if (error)
      return NextResponse.json(error, { status: 400 });

    return NextResponse.json({ opportunityId, ...next });
  }

  const { error } = rows.length
    ? await supabase
        .from("saved_opportunities")
        .update({ status })
        .eq("user_id", user.id)
        .eq("opportunity_id", opportunityId)
    : await supabase
        .from("saved_opportunities")
        .insert({ user_id: user.id, opportunity_id: opportunityId, status });

  if (error)
    return NextResponse.json(error, { status: 400 });

  return NextResponse.json({ opportunityId, ...next });
}

function isSaveAction(action: unknown): action is SaveAction {
  return action === "save" || action === "unsave" || action === "track";
}

function stateFromStatus(status: string | null) {
  const normalized = status?.toLowerCase().replace(/[\s-]/g, "_");

  return {
    saved: normalized === "saved" || normalized === "saved_tracked",
    tracked:
      normalized === "tracked" ||
      normalized === "saved_tracked" ||
      normalized === "interested",
  };
}

function nextState(
  state: { saved: boolean; tracked: boolean },
  action: SaveAction,
) {
  if (action === "save") return { ...state, saved: true };
  if (action === "unsave") return { ...state, saved: false };

  return { ...state, tracked: true };
}

function statusFromState(state: { saved: boolean; tracked: boolean }) {
  if (state.saved && state.tracked) return "saved_tracked";
  if (state.saved) return "saved";
  if (state.tracked) return "tracked";

  return null;
}
