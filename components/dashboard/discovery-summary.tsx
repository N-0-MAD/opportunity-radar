import { Radar, Sparkles } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { discoverySummary } from "@/lib/mock-data"

export function DiscoverySummary() {
  const max = Math.max(...discoverySummary.bySource.map((s) => s.count))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          Discovery summary
        </CardTitle>
        <CardDescription>Fresh opportunities from your radar</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-lg border border-border/60 bg-card/40 p-3">
            <span className="text-xs text-muted-foreground">New today</span>
            <span className="text-2xl font-semibold tabular-nums">
              {discoverySummary.today}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border/60 bg-card/40 p-3">
            <span className="text-xs text-muted-foreground">This week</span>
            <span className="text-2xl font-semibold tabular-nums">
              {discoverySummary.week}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Radar className="size-3.5" />
            New today by source
          </span>
          <div className="flex flex-col gap-2.5">
            {discoverySummary.bySource.map((s) => (
              <div key={s.source} className="flex items-center gap-3">
                <BrandLogo label={s.logo} className="size-7 text-xs" />
                <span className="w-32 shrink-0 truncate text-sm text-muted-foreground">
                  {s.source}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(s.count / max) * 100}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right text-sm font-medium tabular-nums">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
