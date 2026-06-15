import { CalendarClock, ClipboardCheck, Video } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { calendarEvents, type CalendarEvent } from "@/lib/mock-data"

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function daysAway(date: string) {
  const today = new Date("2026-06-18T00:00:00").getTime()
  const target = new Date(date + "T00:00:00").getTime()
  const diff = Math.round((target - today) / 86400000)
  if (diff <= 0) return "Today"
  if (diff === 1) return "Tomorrow"
  return `in ${diff}d`
}

function EventRow({ event }: { event: CalendarEvent }) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50">
      <BrandLogo label={event.org.charAt(0)} className="size-9" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{event.title}</span>
        <span className="truncate text-xs text-muted-foreground">
          {event.org}
        </span>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <span className="text-xs font-medium tabular-nums">
          {formatDate(event.date)}
        </span>
        <span className="text-xs text-muted-foreground">
          {daysAway(event.date)}
        </span>
      </div>
    </div>
  )
}

function ListCard({
  title,
  description,
  icon: Icon,
  events,
}: {
  title: string
  description: string
  icon: typeof CalendarClock
  events: CalendarEvent[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {events.length ? (
          events.map((e) => <EventRow key={e.id} event={e} />)
        ) : (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            Nothing scheduled.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function UpcomingDeadlines() {
  const events = calendarEvents
    .filter((e) => e.kind === "Deadline")
    .slice(0, 5)
  return (
    <ListCard
      title="Upcoming deadlines"
      description="Don't miss these submissions"
      icon={CalendarClock}
      events={events}
    />
  )
}

export function UpcomingInterviews() {
  const events = calendarEvents.filter((e) => e.kind === "Interview").slice(0, 5)
  return (
    <ListCard
      title="Upcoming interviews"
      description="Get ready to shine"
      icon={Video}
      events={events}
    />
  )
}

export function UpcomingAssessments() {
  const events = calendarEvents.filter((e) => e.kind === "OA").slice(0, 5)
  return (
    <ListCard
      title="Upcoming assessments"
      description="Online assessments on deck"
      icon={ClipboardCheck}
      events={events}
    />
  )
}
