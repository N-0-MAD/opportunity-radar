import { CalendarClock } from "lucide-react"

import { cn } from "@/lib/utils"
import { urgencyLabel, urgencyOf } from "@/lib/dates"

const TONE: Record<string, string> = {
  overdue: "bg-muted text-muted-foreground border-border",
  today: "bg-destructive/15 text-destructive border-destructive/25",
  tomorrow: "bg-destructive/15 text-destructive border-destructive/25",
  soon: "bg-warning/15 text-warning border-warning/25",
  upcoming: "bg-warning/10 text-warning border-warning/20",
}

export function UrgencyBadge({
  date,
  className,
  withIcon = true,
}: {
  date: string
  className?: string
  withIcon?: boolean
}) {
  const label = urgencyLabel(date)
  if (!label) return null
  const tone = urgencyOf(date)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        TONE[tone] ?? TONE.upcoming,
        className,
      )}
    >
      {withIcon ? <CalendarClock className="size-3" /> : null}
      {label}
    </span>
  )
}
