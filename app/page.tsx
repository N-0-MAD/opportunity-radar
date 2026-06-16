import { PageHeader } from "@/components/page-header"
import { ScanButton } from "@/components/dashboard/scan-button"
import { StatCards } from "@/components/dashboard/stat-cards"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { MatchHighlights } from "@/components/dashboard/match-highlights"
import { DiscoverySummary } from "@/components/dashboard/discovery-summary"
import { DeadlineRisk } from "@/components/dashboard/deadline-risk"
import { SourceHealth } from "@/components/dashboard/source-health"
import { ProfileCompleteness } from "@/components/dashboard/profile-completeness"
import {
  UpcomingAssessments,
  UpcomingDeadlines,
  UpcomingInterviews,
} from "@/components/dashboard/upcoming"

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your opportunity pipeline at a glance, Avery."
      >
        <ScanButton />
      </PageHeader>

      <StatCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MatchHighlights />
        </div>
        <DiscoverySummary />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DeadlineRisk />
        </div>
        <ActivityFeed />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SourceHealth />
        </div>
        <ProfileCompleteness />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <UpcomingDeadlines />
        <UpcomingInterviews />
        <UpcomingAssessments />
      </div>
    </>
  )
}
