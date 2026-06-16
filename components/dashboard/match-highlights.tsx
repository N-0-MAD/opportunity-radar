"use client"

import Link from "next/link"
import { ArrowRight, Briefcase, MapPin, Wrench } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { RecommendationBadge } from "@/components/recommendation-badge"
import { useOpportunityDrawer } from "@/components/opportunity-drawer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { opportunities } from "@/lib/mock-data"

export function MatchHighlights() {
  const { open } = useOpportunityDrawer()
  const top = [...opportunities]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Match highlights</CardTitle>
        <CardDescription>Why these are your strongest fits</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            render={
              <Link href="/discover">
                View all
                <ArrowRight data-icon="inline-end" />
              </Link>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {top.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => open(op)}
            className="flex flex-col gap-3 rounded-lg border border-border/60 bg-card/40 p-3 text-left transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className="flex items-center gap-3">
              <BrandLogo label={op.logo} className="size-10" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium">{op.title}</span>
                <span className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                  {op.org}
                  <span className="text-border">•</span>
                  {op.location}
                </span>
              </div>
              <MatchScore score={op.matchScore} />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Wrench className="size-3.5 text-primary/70" />
                {op.matchDetail.skills}% skills
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-primary/70" />
                {op.matchDetail.role}% role
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary/70" />
                {op.matchDetail.location}% location
              </span>
            </div>
            {op.recommendation ? (
              <div className="flex flex-wrap gap-1.5 pl-1">
                <RecommendationBadge recommendation={op.recommendation} />
                {op.matchDetail.skillsMatched.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
