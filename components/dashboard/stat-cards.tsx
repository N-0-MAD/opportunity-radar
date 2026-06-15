import { Bookmark, CalendarClock, Radar, Send } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { stats } from "@/lib/mock-data"

const items = [
  {
    label: "Opportunities found",
    value: stats.found.toLocaleString(),
    delta: stats.foundDelta,
    icon: Radar,
  },
  {
    label: "Saved opportunities",
    value: stats.saved,
    delta: stats.savedDelta,
    icon: Bookmark,
  },
  {
    label: "Active applications",
    value: stats.active,
    delta: stats.activeDelta,
    icon: Send,
  },
  {
    label: "Upcoming events",
    value: stats.events,
    delta: stats.eventsDelta,
    icon: CalendarClock,
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="gap-0 py-0">
          <CardContent className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <item.icon className="size-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">
                {item.value}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{item.delta}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
