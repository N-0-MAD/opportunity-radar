"use client"

import { useMemo, useState } from "react"
import { GripVertical } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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

function Card({
  op,
  onDragStart,
}: {
  op: Opportunity
  onDragStart: (id: string) => void
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(op.id)}
      className="group flex cursor-grab flex-col gap-3 rounded-lg border border-border/60 bg-card p-3 transition-colors hover:border-border active:cursor-grabbing"
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
        <GripVertical className="size-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary">{op.type}</Badge>
        <MatchScore score={op.matchScore} />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">{op.location}</span>
        <span className="shrink-0 tabular-nums">
          {new Date(op.deadline + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  )
}

export function KanbanBoard() {
  const [items, setItems] = useState<Opportunity[]>(seed)
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

  function drop(stage: Stage) {
    if (!dragId) return
    setItems((prev) =>
      prev.map((op) => (op.id === dragId ? { ...op, stage } : op))
    )
    setDragId(null)
    setOverStage(null)
  }

  return (
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
            overStage === stage && "border-primary/50 bg-primary/5"
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
              <Card key={op.id} op={op} onDragStart={setDragId} />
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
  )
}
