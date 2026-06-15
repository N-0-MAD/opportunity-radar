import { BrandLogo } from "@/components/brand-logo"
import { PageHeader } from "@/components/page-header"
import { CalendarView } from "@/components/calendar/calendar-view"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { calendarEvents } from "@/lib/mock-data"

const KIND_VARIANT = {
  Deadline: "destructive",
  OA: "secondary",
  Interview: "outline",
  Result: "secondary",
} as const

export default function CalendarPage() {
  const upcoming = [...calendarEvents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((e) => e.date >= "2026-06-18")
    .slice(0, 7)

  return (
    <>
      <PageHeader
        title="Calendar"
        description="All your deadlines, assessments, interviews, and result dates in one place."
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <CalendarView />
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Up next</CardTitle>
            <CardDescription>Your next 7 events</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {upcoming.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
              >
                <BrandLogo label={e.org.charAt(0)} className="size-9" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">
                    {e.title}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {new Date(e.date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <Badge variant={KIND_VARIANT[e.kind]}>{e.kind}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
