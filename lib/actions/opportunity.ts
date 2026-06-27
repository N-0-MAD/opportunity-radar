"use server"

import { getAllOpportunities } from "@/lib/services/opportunity-service"

export async function getOpportunities() {
  return await getAllOpportunities()
}