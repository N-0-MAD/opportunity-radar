import { Flame, Sparkles, Timer, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Recommendation } from "@/lib/mock-data"

const CONFIG: Record<
  Recommendation,
  { icon: typeof Sparkles; tone: string }
> = {
  "Best Match": {
    icon: Sparkles,
    tone: "bg-success/15 text-success border-success/25",
  },
  "High Priority": {
    icon: Flame,
    tone: "bg-primary/15 text-primary border-primary/25",
  },
  Trending: {
    icon: TrendingUp,
    tone: "bg-chart-4/15 text-chart-4 border-chart-4/25",
  },
  "Closing Soon": {
    icon: Timer,
    tone: "bg-warning/15 text-warning border-warning/25",
  },
}

export function RecommendationBadge({
  recommendation,
  className,
}: {
  recommendation: Recommendation
  className?: string
}) {
  const { icon: Icon, tone } = CONFIG[recommendation]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        tone,
        className,
      )}
    >
      <Icon className="size-3" />
      {recommendation}
    </span>
  )
}
