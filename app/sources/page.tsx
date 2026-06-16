import { PageHeader } from "@/components/page-header"
import { SourcesView } from "@/components/sources/sources-view"

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        title="Sources"
        description="Manage where Opportunity Radar scans for jobs, internships, hackathons, and more."
      />
      <SourcesView />
    </>
  )
}
