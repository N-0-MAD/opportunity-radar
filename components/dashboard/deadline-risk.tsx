"use client"

import { AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { UrgencyBadge } from "@/components/urgency-badge"
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
import { daysUntil } from "@/lib/dates"
import { opportunities } from "@/lib/mock-data"

export function DeadlineRisk() {
  const { open } = useOpportunityDrawer()
  const atRisk = opportunities
    .filter((op) => {
      const d = daysUntil(op.deadline)
      return d >= 0 && d <= 7
    })
    .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline))
    .slice(0, 5)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          Deadline risk
        </CardTitle>
        <CardDescription>Action required to stay on track</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            render={
              <Link href="/calendar">
                Calendar
                <ArrowRight data-icon="inline-end" />
              </Link>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {atRisk.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => open(op)}
            className="flex w-full items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-3 text-left transition-colors hover:border-border"
          >
            <BrandLogo label={op.logo} className="size-9" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-sm font-medium">{op.title}</span>
              <span className="truncate text-xs text-muted-foreground">
                {op.org} • {op.stage ?? "Not tracked"}
              </span>
            </div>
            <UrgencyBadge date={op.deadline} />
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
