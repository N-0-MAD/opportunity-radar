"use client"

import { Bookmark, CalendarClock, MapPin, Sparkles } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Opportunity } from "@/lib/mock-data"

export function OpportunityCard({
  op,
  onExplain,
}: {
  op: Opportunity
  onExplain: (op: Opportunity) => void
}) {
  return (
    <Card className="group gap-0 py-0 transition-colors hover:border-border">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <BrandLogo label={op.logo} className="size-11" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3 className="truncate text-sm font-semibold">{op.title}</h3>
            <span className="truncate text-xs text-muted-foreground">
              {op.org}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={op.saved ? "Saved" : "Save"}
          >
            <Bookmark className={cn(op.saved && "fill-primary text-primary")} />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{op.type}</Badge>
          <MatchScore score={op.matchScore} />
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {op.location}
            {op.remote ? (
              <Badge variant="outline" className="ml-1">
                Remote
              </Badge>
            ) : null}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarClock className="size-3.5" />
            Due{" "}
            {new Date(op.deadline + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            {op.salary ? (
              <>
                <span className="text-border">•</span>
                <span className="font-medium text-foreground">{op.salary}</span>
              </>
            ) : null}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {op.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/60 p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => onExplain(op)}
        >
          <Sparkles data-icon="inline-start" />
          Why this matches
        </Button>
      </CardFooter>
    </Card>
  )
}
