"use client"

import { useMemo, useState } from "react"
import {
  Activity,
  CheckCircle2,
  Globe,
  Plus,
  RefreshCw,
  Search,
  TriangleAlert,
} from "lucide-react"
import { toast } from "sonner"

import { BrandLogo } from "@/components/brand-logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { sources as seed, recentScans, type Source } from "@/lib/mock-data"

export function SourcesView() {
  const [items, setItems] = useState<Source[]>(seed)
  const [scanning, setScanning] = useState(false)

  const stats = useMemo(() => {
    const connected = items.filter((s) => s.enabled).length
    const totalFound = items.reduce((sum, s) => sum + s.found, 0)
    const newToday = items.reduce((sum, s) => sum + s.newToday, 0)
    const degraded = items.filter(
      (s) => s.enabled && s.health === "Degraded",
    ).length
    return { connected, totalFound, newToday, degraded }
  }, [items])

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              enabled: !s.enabled,
              status: !s.enabled ? "Connected" : "Paused",
              cadence: !s.enabled ? "Daily" : "Paused",
            }
          : s,
      ),
    )
    const s = items.find((x) => x.id === id)
    if (s) {
      toast.success(s.enabled ? `Paused ${s.name}` : `Resumed ${s.name}`)
    }
  }

  function scanAll() {
    setScanning(true)
    toast.info("Scanning all connected sources…")
    setTimeout(() => {
      setScanning(false)
      toast.success("Scan complete", { description: "12 new opportunities found" })
    }, 1600)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={Globe}
          label="Connected"
          value={`${stats.connected}/${items.length}`}
        />
        <StatTile
          icon={Search}
          label="Total tracked"
          value={stats.totalFound.toLocaleString()}
        />
        <StatTile
          icon={Activity}
          label="New today"
          value={`+${stats.newToday}`}
          tone="primary"
        />
        <StatTile
          icon={TriangleAlert}
          label="Needs attention"
          value={String(stats.degraded)}
          tone={stats.degraded > 0 ? "warning" : "default"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">
              Connected sources
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={scanAll}
              disabled={scanning}
            >
              <RefreshCw
                data-icon="inline-start"
                className={cn(scanning && "animate-spin")}
              />
              {scanning ? "Scanning…" : "Scan all"}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {items.map((s) => (
              <SourceCard key={s.id} source={s} onToggle={toggle} />
            ))}

            <button
              type="button"
              onClick={() => toast.info("Connect a new source", {
                description: "Browse the source catalog to add a provider.",
              })}
              className="flex min-h-[8rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-card/30 p-4 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-muted">
                <Plus className="size-4" />
              </span>
              <span className="text-sm font-medium">Add a source</span>
              <span className="text-xs">
                Connect job boards, aggregators & more
              </span>
            </button>
          </div>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="size-4 text-muted-foreground" />
              Recent scans
            </CardTitle>
            <CardDescription>Latest crawl activity</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recentScans.map((scan, i) => (
              <div key={scan.id} className="flex flex-col">
                <div className="flex items-center gap-3 py-2">
                  <BrandLogo label={scan.logo} className="size-9" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {scan.source}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {scan.found} new • {scan.time}
                    </span>
                  </div>
                  {scan.status === "success" ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <TriangleAlert className="size-4 text-warning" />
                  )}
                </div>
                {i < recentScans.length - 1 ? (
                  <Separator className="opacity-50" />
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SourceCard({
  source,
  onToggle,
}: {
  source: Source
  onToggle: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 transition-opacity",
        !source.enabled && "opacity-60",
      )}
    >
      <div className="flex items-start gap-3">
        <BrandLogo label={source.logo} className="size-10" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium leading-tight">
            {source.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {source.url}
          </span>
        </div>
        <Switch
          checked={source.enabled}
          onCheckedChange={() => onToggle(source.id)}
          aria-label={`Toggle ${source.name}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
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

      <Separator className="opacity-50" />

      <div className="flex items-center justify-between text-xs">
        <div className="flex flex-col">
          <span className="font-medium tabular-nums">{source.found}</span>
          <span className="text-muted-foreground">tracked</span>
        </div>
        <div className="flex flex-col">
          <span
            className={cn(
              "font-medium tabular-nums",
              source.newToday > 0 && "text-primary",
            )}
          >
            +{source.newToday}
          </span>
          <span className="text-muted-foreground">today</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-medium">{source.cadence}</span>
          <span className="text-muted-foreground">scanned {source.lastScan}</span>
        </div>
      </div>
    </div>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone?: "default" | "primary" | "warning"
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            tone === "primary" && "bg-primary/15 text-primary",
            tone === "warning" && "bg-warning/15 text-warning",
            tone === "default" && "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col">
          <span className="text-xl font-semibold tabular-nums">{value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}
