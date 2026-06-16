import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ApplicationHealth } from "@/lib/mock-data"

const CONFIG: Record<
  ApplicationHealth,
  { icon: typeof CheckCircle2; tone: string }
> = {
  "On Track": {
    icon: CheckCircle2,
    tone: "bg-success/15 text-success border-success/25",
  },
  "Action Needed": {
    icon: Clock,
    tone: "bg-warning/15 text-warning border-warning/25",
  },
  "Deadline Risk": {
    icon: AlertTriangle,
    tone: "bg-destructive/15 text-destructive border-destructive/25",
  },
}

export function HealthBadge({
  health,
  className,
}: {
  health: ApplicationHealth
  className?: string
}) {
  const { icon: Icon, tone } = CONFIG[health]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        tone,
        className,
      )}
    >
      <Icon className="size-3" />
      {health}
    </span>
  )
}
