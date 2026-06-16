"use client"

import {
  Briefcase,
  CalendarClock,
  Check,
  MapPin,
  Plus,
  Sparkles,
  Wrench,
  X,
} from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { RecommendationBadge } from "@/components/recommendation-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Opportunity } from "@/lib/mock-data"

const SIGNAL_META = [
  { key: "skills", label: "Skills overlap", icon: Wrench, noteKey: null },
  { key: "role", label: "Role alignment", icon: Briefcase, noteKey: "roleNote" },
  { key: "location", label: "Location fit", icon: MapPin, noteKey: "locationNote" },
  {
    key: "timeline",
    label: "Timeline fit",
    icon: CalendarClock,
    noteKey: "timelineNote",
  },
] as const

export function MatchPanel({
  op,
  open,
  onOpenChange,
  saved,
  tracked,
  onToggleSave,
  onTrack,
}: {
  op: Opportunity | null
  open: boolean
  onOpenChange: (open: boolean) => void
  saved: boolean
  tracked: boolean
  onToggleSave: (id: string) => void
  onTrack: (id: string) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              AI Match Analysis
            </span>
          </div>
          {op ? (
            <>
              <div className="flex items-start gap-3">
                <BrandLogo label={op.logo} className="size-12" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <SheetTitle className="text-base leading-tight">
                    {op.title}
                  </SheetTitle>
                  <SheetDescription className="flex items-center gap-1.5">
                    {op.org}
                    <span className="text-border">•</span>
                    <MapPin className="size-3" />
                    {op.location}
                  </SheetDescription>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{op.type}</Badge>
                <MatchScore score={op.matchScore} />
                {op.recommendation ? (
                  <RecommendationBadge recommendation={op.recommendation} />
                ) : null}
              </div>
            </>
          ) : null}
        </SheetHeader>

        {op ? (
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm leading-relaxed text-foreground/90">
                {`This is a ${op.matchScore >= 90 ? "standout" : "strong"} fit. ${op.org}'s ${op.role} role aligns with your profile across skills, role, location, and timeline. Here's the full breakdown.`}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Sparkles className="size-3.5" />
                Match signals
              </h4>
              <div className="flex flex-col gap-4">
                {SIGNAL_META.map((s) => {
                  const value = op.matchDetail[s.key]
                  const note = s.noteKey
                    ? op.matchDetail[s.noteKey]
                    : null
                  return (
                    <div key={s.key} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-foreground/90">
                          <s.icon className="size-3.5 text-primary/70" />
                          {s.label}
                        </span>
                        <span className="font-mono text-xs tabular-nums">
                          {value}%
                        </span>
                      </div>
                      <Progress value={value} />
                      {note ? (
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {note}
                        </p>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Wrench className="size-3.5" />
                Skills overlap
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {op.matchDetail.skillsMatched.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-md border border-success/25 bg-success/10 px-2 py-0.5 text-xs text-success"
                  >
                    <Check className="size-3" />
                    {s}
                  </span>
                ))}
                {op.matchDetail.skillsMissing.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    <X className="size-3" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Recommendation reasoning
              </h4>
              <ul className="flex flex-col gap-2.5">
                {op.matchReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <Check className="size-3" />
                    </span>
                    <span className="leading-relaxed text-foreground/90">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {op ? (
          <SheetFooter className="flex-row gap-2 border-t border-border/60">
            <Button
              className="flex-1"
              disabled={tracked}
              onClick={() => onTrack(op.id)}
            >
              <Plus data-icon="inline-start" />
              {tracked ? "Tracking" : "Track"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onToggleSave(op.id)}
            >
              {saved ? "Saved" : "Save"}
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
