"use client"

import { Check, MapPin, Sparkles, TrendingUp } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
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

const SIGNALS = [
  { label: "Skills overlap", value: 92 },
  { label: "Role alignment", value: 88 },
  { label: "Location fit", value: 80 },
  { label: "Timeline fit", value: 95 },
]

export function MatchPanel({
  op,
  open,
  onOpenChange,
}: {
  op: Opportunity | null
  open: boolean
  onOpenChange: (open: boolean) => void
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
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{op.type}</Badge>
                <MatchScore score={op.matchScore} />
              </div>
            </>
          ) : null}
        </SheetHeader>

        {op ? (
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm leading-relaxed text-foreground/90">
                {`This is a strong fit. Based on your profile, ${op.org}'s ${op.role} role aligns across skills, timeline, and location preferences. Here's the breakdown.`}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="size-3.5" />
                Match signals
              </h4>
              <div className="flex flex-col gap-3.5">
                {SIGNALS.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-mono text-xs tabular-nums">
                        {s.value}%
                      </span>
                    </div>
                    <Progress value={s.value} />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Why we recommend this
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

        <SheetFooter className="flex-row gap-2 border-t border-border/60">
          <Button className="flex-1">Save & track</Button>
          <Button variant="outline" className="flex-1">
            View posting
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
