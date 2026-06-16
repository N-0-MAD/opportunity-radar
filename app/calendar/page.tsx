import { CalendarCheck, Flame } from "lucide-react"

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
import { relativeDay } from "@/lib/dates"
import { calendarEvents } from "@/lib/mock-data"

const TODAY = "2026-06-18"

const KIND_VARIANT = {
  Deadline: "destructive",
  OA: "secondary",
  Interview: "outline",
  Result: "secondary",
} as const

export default function CalendarPage() {
  const sorted = [...calendarEvents].sort((a, b) =>
    a.date.localeCompare(b.date),
  )
  const upcoming = sorted.filter((e) => e.date >= TODAY).slice(0, 8)

  const within7 = sorted.filter((e) => {
    const diff =
      (new Date(e.date + "T00:00:00").getTime() -
        new Date(TODAY + "T00:00:00").getTime()) /
      86400000
    return diff >= 0 && diff <= 7
  })
  const deadlineCount = within7.filter((e) => e.kind === "Deadline").length
  const interviewCount = within7.filter((e) => e.kind === "Interview").length

  return (
    <>
      <PageHeader
        title="Calendar"
        description="All your deadlines, assessments, interviews, and result dates in one place."
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <CalendarView />
        <div className="flex flex-col gap-4">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="size-4 text-primary" />
                This week&apos;s focus
              </CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <div className="flex flex-1 flex-col items-center rounded-lg border border-border/60 bg-card p-3">
                <span className="text-2xl font-semibold tabular-nums text-destructive">
                  {deadlineCount}
                </span>
                <span className="text-xs text-muted-foreground">Deadlines</span>
              </div>
              <div className="flex flex-1 flex-col items-center rounded-lg border border-border/60 bg-card p-3">
                <span className="text-2xl font-semibold tabular-nums text-warning">
                  {interviewCount}
                </span>
                <span className="text-xs text-muted-foreground">
                  Interviews
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center rounded-lg border border-border/60 bg-card p-3">
                <span className="text-2xl font-semibold tabular-nums">
                  {within7.length}
                </span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarCheck className="size-4 text-muted-foreground" />
                Up next
              </CardTitle>
              <CardDescription>Your upcoming events</CardDescription>
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
                      {new Date(e.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        },
                      )}{" "}
                      • {relativeDay(e.date)}
                    </span>
                  </div>
                  <Badge variant={KIND_VARIANT[e.kind]}>{e.kind}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
