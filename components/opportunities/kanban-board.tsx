"use client"

import { useMemo, useState } from "react"
import { CalendarClock, GripVertical, LayoutGrid, List } from "lucide-react"
import { toast } from "sonner"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { HealthBadge } from "@/components/health-badge"
import { useOpportunityDrawer } from "@/components/opportunity-drawer"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { formatDate, urgencyOf } from "@/lib/dates"
import {
  opportunities as seed,
  STAGES,
  type Opportunity,
  type Stage,
} from "@/lib/mock-data"

const STAGE_TONE: Record<Stage, string> = {
  Interested: "bg-muted-foreground",
  Applied: "bg-chart-1",
  "OA Scheduled": "bg-chart-5",
  "OA Completed": "bg-chart-5",
  "Interview Scheduled": "bg-warning",
  "Interview Completed": "bg-warning",
  Offer: "bg-success",
  Rejected: "bg-destructive",
}

function eventTone(date: string) {
  const u = urgencyOf(date)
  if (u === "overdue" || u === "today") return "danger"
  if (u === "tomorrow" || u === "soon") return "warning"
  return "muted"
}

function Card({
  op,
  onDragStart,
  onOpen,
}: {
  op: Opportunity
  onDragStart: (id: string) => void
  onOpen: (op: Opportunity) => void
}) {
  const tone = eventTone(op.nextEvent?.date ?? op.deadline)
  return (
    <div
      draggable
      onDragStart={() => onDragStart(op.id)}
      onClick={() => onOpen(op)}
      className="group flex cursor-pointer flex-col gap-3 rounded-lg border border-border/60 bg-card p-3 transition-colors hover:border-border"
    >
      <div className="flex items-start gap-2.5">
        <BrandLogo label={op.logo} className="size-9" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium leading-tight">
            {op.title}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {op.org}
          </span>
        </div>
        <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground/40 transition-colors group-hover:text-muted-foreground active:cursor-grabbing" />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary">{op.type}</Badge>
        <MatchScore score={op.matchScore} />
        {op.health ? <HealthBadge health={op.health} /> : null}
      </div>

      {op.nextEvent ? (
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs",
            tone === "danger" && "bg-destructive/10 text-destructive",
            tone === "warning" && "bg-warning/10 text-warning",
            tone === "muted" && "bg-muted/60 text-muted-foreground",
          )}
        >
          <CalendarClock className="size-3.5 shrink-0" />
          <span className="truncate font-medium">{op.nextEvent.label}</span>
          <span className="ml-auto shrink-0 tabular-nums">
            {formatDate(op.nextEvent.date)}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate">{op.location}</span>
          <span className="shrink-0 tabular-nums">
            {formatDate(op.deadline)}
          </span>
        </div>
      )}
    </div>
  )
}

export function KanbanBoard() {
  const { open } = useOpportunityDrawer()
  const [items, setItems] = useState<Opportunity[]>(
    seed.filter((o) => o.stage),
  )
  const [dragId, setDragId] = useState<string | null>(null)
  const [overStage, setOverStage] = useState<Stage | null>(null)

  const byStage = useMemo(() => {
    const map = {} as Record<Stage, Opportunity[]>
    STAGES.forEach((s) => (map[s] = []))
    items.forEach((op) => {
      if (op.stage) map[op.stage].push(op)
    })
    return map
  }, [items])

  const stats = useMemo(() => {
    const activeCount = items.filter(
      (o) => o.stage !== "Rejected" && o.stage !== "Offer",
    ).length
    const offers = byStage.Offer.length
    const interviews =
      byStage["Interview Scheduled"].length +
      byStage["Interview Completed"].length
    const atRisk = items.filter((o) => o.health === "Deadline Risk").length
    return { activeCount, offers, interviews, atRisk }
  }, [items, byStage])

  function drop(stage: Stage) {
    if (!dragId) return
    const moved = items.find((o) => o.id === dragId)
    setItems((prev) =>
      prev.map((op) => (op.id === dragId ? { ...op, stage } : op)),
    )
    if (moved && moved.stage !== stage) {
      toast.success(`Moved to ${stage}`, { description: moved.title })
    }
    setDragId(null)
    setOverStage(null)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Summary label="Active" value={stats.activeCount} />
        <Summary label="Interviews" value={stats.interviews} tone="warning" />
        <Summary label="Offers" value={stats.offers} tone="success" />
        <Summary label="At risk" value={stats.atRisk} tone="danger" />
        <ToggleGroup
          value={["board"]}
          className="ml-auto"
          aria-label="View mode"
        >
          <ToggleGroupItem value="board" aria-label="Board view">
            <LayoutGrid data-icon="inline-start" />
            Board
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" disabled>
            <List data-icon="inline-start" />
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <div
            key={stage}
            onDragOver={(e) => {
              e.preventDefault()
              setOverStage(stage)
            }}
            onDragLeave={() => setOverStage((s) => (s === stage ? null : s))}
            onDrop={() => drop(stage)}
            className={cn(
              "flex w-72 shrink-0 flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-3 transition-colors",
              overStage === stage && "border-primary/50 bg-primary/5",
            )}
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", STAGE_TONE[stage])} />
                <h3 className="text-sm font-medium">{stage}</h3>
              </div>
              <span className="rounded-md bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
                {byStage[stage].length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {byStage[stage].map((op) => (
                <Card
                  key={op.id}
                  op={op}
                  onDragStart={setDragId}
                  onOpen={open}
                />
              ))}
              {byStage[stage].length === 0 ? (
                <div className="rounded-lg border border-dashed border-border/60 py-8 text-center text-xs text-muted-foreground">
                  Drop here
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Summary({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: number
  tone?: "default" | "warning" | "success" | "danger"
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-1.5">
      <span
        className={cn(
          "text-lg font-semibold tabular-nums",
          tone === "warning" && "text-warning",
          tone === "success" && "text-success",
          tone === "danger" && "text-destructive",
        )}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
