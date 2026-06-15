import { cn } from "@/lib/utils"

export function MatchScore({
  score,
  className,
}: {
  score: number
  className?: string
}) {
  const tone =
    score >= 90
      ? "bg-success/15 text-success border-success/25"
      : score >= 80
        ? "bg-chart-1/15 text-chart-1 border-chart-1/25"
        : "bg-warning/15 text-warning border-warning/25"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-xs font-semibold tabular-nums",
        tone,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {score}% match
    </span>
  )
}
