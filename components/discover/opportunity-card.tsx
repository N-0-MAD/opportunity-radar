"use client"

import { Bookmark, ExternalLink, MapPin, Plus, Radar, Sparkles } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { RecommendationBadge } from "@/components/recommendation-badge"
import { UrgencyBadge } from "@/components/urgency-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { formatDate } from "@/lib/dates"
import { cn } from "@/lib/utils"
import type { Opportunity } from "@/lib/mock-data"

export function OpportunityCard({
  op,
  saved,
  tracked,
  onExplain,
  onToggleSave,
  onTrack,
}: {
  op: Opportunity
  saved: boolean
  tracked: boolean
  onExplain: (op: Opportunity) => void
  onToggleSave: (id: string) => void
  onTrack: (id: string) => void
}) {
  return (
    <Card className="group gap-0 py-0 transition-colors hover:border-border">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
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
            aria-label={saved ? "Remove from saved" : "Save"}
            onClick={() => onToggleSave(op.id)}
          >
            <Bookmark className={cn(saved && "fill-primary text-primary")} />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {op.recommendation && op.recommendation !== "Closing Soon" ? (
            <RecommendationBadge recommendation={op.recommendation} />
          ) : null}
          <UrgencyBadge date={op.deadline} />
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
          <span className="flex flex-wrap items-center gap-1.5">
            <Radar className="size-3.5" />
            via {op.source}
            <span className="text-border">•</span>
            Due {formatDate(op.deadline)}
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

        <Button
          variant="outline"
          size="sm"
          className="mt-auto w-full justify-center"
          onClick={() => onExplain(op)}
        >
          <Sparkles data-icon="inline-start" />
          Why this matches
        </Button>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-1 border-t border-border/60 p-2">
        <Button
          variant="ghost"
          size="sm"
          className="justify-center"
          onClick={() => onToggleSave(op.id)}
        >
          <Bookmark
            data-icon="inline-start"
            className={cn(saved && "fill-primary text-primary")}
          />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-center"
          disabled={tracked}
          onClick={() => onTrack(op.id)}
        >
          <Plus data-icon="inline-start" />
          {tracked ? "Tracking" : "Track"}
        </Button>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="sm" className="justify-center">
                <ExternalLink data-icon="inline-start" />
                View
              </Button>
            }
          />
          <TooltipContent>Open original posting</TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}
