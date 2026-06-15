"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { calendarEvents, type CalendarEvent } from "@/lib/mock-data"

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

const TODAY = "2026-06-18"

export function CalendarView() {
  // Calendar centered on June 2026 where events live
  const [cursor, setCursor] = useState({ year: 2026, month: 5 })

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function eventsFor(day: number) {
    const key = `${cursor.year}-${String(cursor.month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`
    return calendarEvents.filter((e) => e.date === key)
  }

  function shift(dir: number) {
    setCursor((c) => {
      const m = c.month + dir
      if (m < 0) return { year: c.year - 1, month: 11 }
      if (m > 11) return { year: c.year + 1, month: 0 }
      return { ...c, month: m }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
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
        <div className="hidden flex-wrap items-center gap-3 sm:flex">
          {(
            ["Deadline", "OA", "Interview", "Result"] as CalendarEvent["kind"][]
          ).map((k) => (
            <span
              key={k}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span className={cn("size-2 rounded-full", KIND_DOT[k])} />
              {k}
            </span>
          ))}
        </div>
      </div>

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
                  !day && "bg-muted/20"
                )}
              >
                {day ? (
                  <div className="flex h-full flex-col gap-1">
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center self-start rounded-full text-xs tabular-nums",
                        isToday
                          ? "bg-primary font-semibold text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col gap-1">
                      {dayEvents.slice(0, 3).map((e) => (
                        <span
                          key={e.id}
                          title={`${e.title} — ${e.org}`}
                          className={cn(
                            "truncate rounded border px-1.5 py-0.5 text-[10px] font-medium leading-tight",
                            KIND_TONE[e.kind]
                          )}
                        >
                          {e.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
