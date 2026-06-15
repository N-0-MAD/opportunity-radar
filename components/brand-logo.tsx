import { cn } from "@/lib/utils"

const COLORS: Record<string, string> = {
  G: "bg-chart-1/15 text-chart-1",
  S: "bg-chart-2/15 text-chart-2",
  V: "bg-foreground/10 text-foreground",
  M: "bg-chart-5/15 text-chart-5",
  A: "bg-warning/15 text-warning",
  St: "bg-destructive/15 text-destructive",
  D: "bg-chart-4/15 text-chart-4",
  N: "bg-foreground/10 text-foreground",
  W: "bg-chart-2/15 text-chart-2",
  Y: "bg-warning/15 text-warning",
  U: "bg-chart-1/15 text-chart-1",
}

export function BrandLogo({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border border-border/60 font-mono text-sm font-semibold",
        COLORS[label] ?? "bg-muted text-muted-foreground",
        className,
      )}
      aria-hidden
    >
      {label}
    </span>
  )
}
