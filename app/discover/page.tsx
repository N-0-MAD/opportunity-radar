import { PageHeader } from "@/components/page-header"
import { DiscoverView } from "@/components/discover/discover-view"

export default function DiscoverPage() {
  return (
    <>
      <PageHeader
        title="Discover"
        description="AI-ranked opportunities matched to your profile."
      />
      <DiscoverView />
    </>
  )
}
