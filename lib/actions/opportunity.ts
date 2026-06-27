"use server"

import { getAllOpportunities } from "@/lib/services/opportunity-service"

export async function getOpportunities() {
  return await getAllOpportunities()
}

"use server";

import { saveOpportunity as saveOpportunityService } from "@/lib/services/opportunity-service";

export async function saveOpportunity(
  userId: string,
  opportunityId: string
) {
  return await saveOpportunityService(userId, opportunityId);
}
"use server";

import { getSavedOpportunityIds as service } from "@/lib/services/opportunity-service";

export async function getSavedOpportunityIds(userId: string) {
  return service(userId);
}