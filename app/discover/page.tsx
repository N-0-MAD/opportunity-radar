import { PageHeader } from "@/components/page-header"
import { DiscoverView } from "@/components/discover/discover-view"
import { getAllOpportunities } from "@/lib/services/opportunity-service"

export default async function DiscoverPage() {
  const opportunities = await getAllOpportunities()

  return (
    <>
      <PageHeader
        title="Discover"
        description="AI-ranked opportunities matched to your profile."
      />
      <DiscoverView opportunities={opportunities} />
    </>
  )
}
