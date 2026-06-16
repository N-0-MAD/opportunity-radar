"use client"

import {
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
  Pause,
  Play,
  RefreshCw,
  TriangleAlert,
} from "lucide-react"
import { toast } from "sonner"

import { BrandLogo } from "@/components/brand-logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { type Source } from "@/lib/mock-data"

export function SourceDrawer({
  source,
  open,
  onOpenChange,
  onToggle,
}: {
  source: Source | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggle: (id: string) => void
}) {
  if (!source) return null

  const maxFound = Math.max(...source.scanHistory.map((s) => s.found), 1)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="gap-3">
          <div className="flex items-start gap-3">
            <BrandLogo label={source.logo} className="size-12" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <SheetTitle className="text-base leading-tight">
                {source.name}
              </SheetTitle>
              <SheetDescription>{source.url}</SheetDescription>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{source.category}</Badge>
            {source.enabled ? (
              source.health === "Healthy" ? (
                <Badge variant="outline" className="text-success">
                  <CheckCircle2 data-icon="inline-start" />
                  Healthy
                </Badge>
              ) : (
                <Badge variant="outline" className="text-warning">
                  <TriangleAlert data-icon="inline-start" />
                  Degraded
                </Badge>
              )
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Paused
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Tracked" value={source.found.toLocaleString()} />
            <Stat label="New today" value={`+${source.newToday}`} tone="primary" />
            <Stat label="This week" value={`+${source.newThisWeek}`} />
          </div>

          <div
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3",
              source.health === "Degraded"
                ? "border-warning/30 bg-warning/5"
                : "border-success/25 bg-success/5",
            )}
          >
            {source.health === "Degraded" ? (
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
            ) : (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
            )}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {source.healthNote}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 p-3 text-sm">
              <Clock className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cadence</span>
              <span className="ml-auto font-medium">{source.cadence}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 p-3 text-sm">
              <RefreshCw className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last scan</span>
              <span className="ml-auto font-medium">{source.lastScan}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Activity className="size-3.5" />
              Scan history
            </h4>
            <div className="flex flex-col gap-2">
              {source.scanHistory.map((scan, i) => (
                <div key={i} className="flex items-center gap-3">
                  {scan.status === "success" ? (
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                  ) : (
                    <TriangleAlert className="size-4 shrink-0 text-warning" />
                  )}
                  <span className="w-16 shrink-0 text-xs text-muted-foreground">
                    {scan.time}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        scan.status === "success" ? "bg-primary" : "bg-warning",
                      )}
                      style={{ width: `${(scan.found / maxFound) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 shrink-0 text-right text-xs font-medium tabular-nums">
                    +{scan.found}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Tracks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {source.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 border-t border-border/60">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onToggle(source.id)
            }}
          >
            {source.enabled ? (
              <>
                <Pause data-icon="inline-start" />
                Pause
              </>
            ) : (
              <>
                <Play data-icon="inline-start" />
                Resume
              </>
            )}
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              toast.success(`Scanning ${source.name}…`, {
                description: "We'll notify you when new results arrive.",
              })
            }
          >
            <RefreshCw data-icon="inline-start" />
            Scan now
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open source site">
            <ExternalLink />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "primary"
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-card/40 p-3">
      <span
        className={cn(
          "text-lg font-semibold tabular-nums",
          tone === "primary" && "text-primary",
        )}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
