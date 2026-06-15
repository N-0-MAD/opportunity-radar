import { CalendarClock, GitBranch, Radar, Sparkles } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { recentActivity } from "@/lib/mock-data"

const KIND_ICON = {
  match: Sparkles,
  deadline: CalendarClock,
  stage: GitBranch,
  scan: Radar,
} as const

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Latest signals from your radar</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {recentActivity.map((a) => {
          const Icon = KIND_ICON[a.kind]
          return (
            <div
              key={a.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
            >
              <BrandLogo label={a.logo} className="size-9" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{a.text}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {a.org}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="size-3.5" />
                <span className="text-xs">{a.time}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
