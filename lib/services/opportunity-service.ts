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