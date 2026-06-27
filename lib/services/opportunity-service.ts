import {
  findAllOpportunities,
  findOpportunity,
} from "@/lib/repositories/opportunity-repository"

export async function getAllOpportunities() {
  return await findAllOpportunities()
}

export async function getOpportunityById(id: string) {
  return await findOpportunity(id)
}

import { saveOpportunity as saveOpportunityRepo } from "@/lib/repositories/opportunity-repository";

export async function saveOpportunity(
  userId: string,
  opportunityId: string
) {
  return await saveOpportunityRepo(userId, opportunityId);
}
import { getSavedOpportunityIds as repo } from "@/lib/repositories/opportunity-repository";

export async function getSavedOpportunityIds(userId: string) {
  return repo(userId);
}