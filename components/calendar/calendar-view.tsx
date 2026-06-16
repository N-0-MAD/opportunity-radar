"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  List,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { BrandLogo } from "@/components/brand-logo"
import { useOpportunityDrawer } from "@/components/opportunity-drawer"
import { cn } from "@/lib/utils"
import { formatLongDate, relativeDay } from "@/lib/dates"
import {
  calendarEvents,
  opportunities,
  type CalendarEvent,
} from "@/lib/mock-data"

const KIND_TONE: Record<CalendarEvent["kind"], string> = {
  Deadline: "bg-destructive/15 text-destructive border-destructive/25",
  OA: "bg-chart-5/15 text-chart-5 border-chart-5/25",
  Interview: "bg-warning/15 text-warning border-warning/25",
  Result: "bg-success/15 text-success border-success/25",
}

const KIND_DOT: Record<CalendarEvent["kind"], string> = {
  Deadline: "bg-destructive",
  OA: "bg-chart-5",
  Interview: "bg-warning",
  Result: "bg-success",
}

const KIND_VARIANT = {
  Deadline: "destructive",
  OA: "secondary",
  Interview: "outline",
  Result: "secondary",
} as const

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const KINDS: CalendarEvent["kind"][] = ["Deadline", "OA", "Interview", "Result"]

const TODAY = "2026-06-18"

export function CalendarView() {
  const { open: openOpportunity } = useOpportunityDrawer()
  const [cursor, setCursor] = useState({ year: 2026, month: 5 })
  const [view, setView] = useState<"month" | "agenda">("month")
  const [active, setActive] = useState<CalendarEvent | null>(null)
  const [hidden, setHidden] = useState<CalendarEvent["kind"][]>([])

  const visibleEvents = useMemo(
    () => calendarEvents.filter((e) => !hidden.includes(e.kind)),
    [hidden],
  )

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function eventsFor(day: number) {
    const key = `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return visibleEvents.filter((e) => e.date === key)
  }

  function shift(dir: number) {
    setCursor((c) => {
      const m = c.month + dir
      if (m < 0) return { year: c.year - 1, month: 11 }
      if (m > 11) return { year: c.year + 1, month: 0 }
      return { ...c, month: m }
    })
  }

  function toggleKind(k: CalendarEvent["kind"]) {
    setHidden((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k],
    )
  }

  const agenda = useMemo(() => {
    const upcoming = [...visibleEvents]
      .filter((e) => e.date >= TODAY)
      .sort((a, b) => a.date.localeCompare(b.date))
    const groups = new Map<string, CalendarEvent[]>()
    upcoming.forEach((e) => {
      groups.set(e.date, [...(groups.get(e.date) ?? []), e])
    })
    return [...groups.entries()]
  }, [visibleEvents])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight tabular-nums">
            {MONTHS[cursor.month]} {cursor.year}
          </h2>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => shift(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => shift(1)}
              aria-label="Next month"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <ToggleGroup
          value={[view]}
          onValueChange={(v: string[]) => {
            if (v[0]) setView(v[0] as "month" | "agenda")
          }}
          aria-label="Calendar view"
        >
          <ToggleGroupItem value="month" aria-label="Month view">
            <CalendarDays data-icon="inline-start" />
            Month
          </ToggleGroupItem>
          <ToggleGroupItem value="agenda" aria-label="Agenda view">
            <List data-icon="inline-start" />
            Agenda
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {KINDS.map((k) => {
          const off = hidden.includes(k)
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggleKind(k)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors",
                off
                  ? "border-border/50 text-muted-foreground/50"
                  : "border-border bg-card text-foreground",
              )}
              aria-pressed={!off}
            >
              <span
                className={cn(
                  "size-2 rounded-full",
                  off ? "bg-muted-foreground/30" : KIND_DOT[k],
                )}
              />
              {k}
            </button>
          )
        })}
      </div>

      {view === "month" ? (
        <Card className="overflow-hidden p-0">
          <div className="grid grid-cols-7 border-b border-border/60">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="px-3 py-2.5 text-center text-xs font-medium text-muted-foreground"
              >
                <span className="hidden sm:inline">{d}</span>
                <span className="sm:hidden">{d.charAt(0)}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const key = day
                ? `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : ""
              const isToday = key === TODAY
              const dayEvents = day ? eventsFor(day) : []
              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-24 border-b border-r border-border/40 p-1.5 last:border-r-0 sm:min-h-28",
                    (i + 1) % 7 === 0 && "border-r-0",
                    !day && "bg-muted/20",
                  )}
                >
                  {day ? (
                    <div className="flex h-full flex-col gap-1">
                      <span
                        className={cn(
                          "flex size-6 items-center justify-center self-start rounded-full text-xs tabular-nums",
                          isToday
                            ? "bg-primary font-semibold text-primary-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {day}
                      </span>
                      <div className="flex flex-col gap-1">
                        {dayEvents.slice(0, 3).map((e) => (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() => setActive(e)}
                            className={cn(
                              "truncate rounded border px-1.5 py-0.5 text-left text-[10px] font-medium leading-tight transition-opacity hover:opacity-80",
                              KIND_TONE[e.kind],
                            )}
                          >
                            {e.title}
                          </button>
                        ))}
                        {dayEvents.length > 3 ? (
                          <span className="px-1.5 text-[10px] text-muted-foreground">
                            +{dayEvents.length - 3} more
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col gap-5 p-5">
          {agenda.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No upcoming events match your filters.
            </p>
          ) : (
            agenda.map(([date, events]) => (
              <div key={date} className="flex gap-4">
                <div className="flex w-20 shrink-0 flex-col">
                  <span className="text-sm font-medium tabular-nums">
                    {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {relativeDay(date)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  {events.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setActive(e)}
                      className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 p-3 text-left transition-colors hover:border-border"
                    >
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          KIND_DOT[e.kind],
                        )}
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium">
                          {e.title}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {e.org}
                          {e.time ? ` • ${e.time}` : ""}
                        </span>
                      </div>
                      <Badge variant={KIND_VARIANT[e.kind]}>{e.kind}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </Card>
      )}

      <Sheet
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <SheetContent className="flex w-full flex-col gap-5 sm:max-w-md">
          {active ? (
            <>
              <SheetHeader className="gap-3">
                <div className="flex items-start gap-3">
                  <BrandLogo label={active.org.charAt(0)} className="size-12" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <SheetTitle className="text-base leading-tight">
                      {active.title}
                    </SheetTitle>
                    <SheetDescription>{active.org}</SheetDescription>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={KIND_VARIANT[active.kind]}>
                    {active.kind}
                  </Badge>
                  <Badge variant="outline">{relativeDay(active.date)}</Badge>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-3 px-4">
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 p-3">
                  <CalendarClock className="size-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {formatLongDate(active.date)}
                    </span>
                    {active.time ? (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {active.time}
                      </span>
                    ) : null}
                  </div>
                </div>
                {active.note ? (
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Notes
                    </h4>
                    <p className="rounded-lg border border-border/60 bg-card/60 p-3 text-sm leading-relaxed text-muted-foreground">
                      {active.note}
                    </p>
                  </div>
                ) : null}
                {opportunities.some((o) => o.id === active.opportunityId) ? (
                  <Button
                    className="mt-1 w-full justify-center"
                    onClick={() => {
                      const op = opportunities.find(
                        (o) => o.id === active.opportunityId,
                      )
                      if (op) {
                        setActive(null)
                        openOpportunity(op)
                      }
                    }}
                  >
                    View opportunity
                    <ArrowUpRight data-icon="inline-end" />
                  </Button>
                ) : null}
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  )
}
