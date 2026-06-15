import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { MatchScore } from "@/components/match-score"
import { Badge } from "@/components/ui/badge"
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
  const top = [...opportunities]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Match highlights</CardTitle>
        <CardDescription>Your strongest fits right now</CardDescription>
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
      <CardContent className="flex flex-col gap-2">
        {top.map((op) => (
          <div
            key={op.id}
            className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-3 transition-colors hover:border-border hover:bg-muted/40"
          >
            <BrandLogo label={op.logo} className="size-10" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-sm font-medium">{op.title}</span>
              <span className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                {op.org}
                <span className="text-border">•</span>
                {op.location}
              </span>
            </div>
            <div className="hidden sm:block">
              <Badge variant="secondary">{op.type}</Badge>
            </div>
            <MatchScore score={op.matchScore} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
