"use client"

import {
  CalendarClock,
  Check,
  ExternalLink,
  FileText,
  Link2,
  MapPin,
  NotebookPen,
  Video,
} from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { HealthBadge } from "@/components/health-badge"
import { MatchScore } from "@/components/match-score"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { formatLongDate, relativeDay } from "@/lib/dates"
import type { Opportunity } from "@/lib/mock-data"

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof FileText
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {title}
      </h4>
      {children}
    </div>
  )
}

export function DetailsDrawer({
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
                <Badge variant="secondary">{op.stage}</Badge>
                {op.health ? <HealthBadge health={op.health} /> : null}
                <MatchScore score={op.matchScore} />
              </div>
            </>
          ) : null}
        </SheetHeader>

        {op ? (
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
            {op.nextEvent ? (
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <CalendarClock className="size-4.5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="text-sm font-medium">
                    {op.nextEvent.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatLongDate(op.nextEvent.date)} •{" "}
                    {relativeDay(op.nextEvent.date)}
                  </span>
                </div>
              </div>
            ) : null}

            <Section icon={NotebookPen} title="Notes">
              <p className="rounded-lg border border-border/60 bg-card/40 p-3 text-sm leading-relaxed text-foreground/90">
                {op.notes ?? "No notes yet. Add context for this application."}
              </p>
            </Section>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Section icon={FileText} title="Resume used">
                <span className="truncate rounded-md bg-muted px-2 py-1.5 font-mono text-xs text-muted-foreground">
                  {op.resumeUsed ?? "—"}
                </span>
              </Section>
              <Section icon={Link2} title="Application link">
                {op.applicationLink ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    render={
                      <a
                        href={`https://${op.applicationLink.replace(/^https?:\/\//, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink data-icon="inline-start" />
                        Open posting
                      </a>
                    }
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </Section>
            </div>

            {op.interviewDetails ? (
              <Section icon={Video} title="Interview details">
                <p className="rounded-lg border border-border/60 bg-card/40 p-3 text-sm leading-relaxed text-foreground/90">
                  {op.interviewDetails}
                </p>
              </Section>
            ) : null}

            <Separator />

            {op.timeline?.length ? (
              <Section icon={CalendarClock} title="Timeline">
                <ol className="flex flex-col gap-0">
                  {op.timeline.map((t, i) => (
                    <li key={t.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full border",
                            t.done
                              ? "border-success/40 bg-success/15 text-success"
                              : "border-border bg-card text-muted-foreground",
                          )}
                        >
                          {t.done ? (
                            <Check className="size-3" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-current" />
                          )}
                        </span>
                        {i < op.timeline!.length - 1 ? (
                          <span className="my-0.5 w-px flex-1 bg-border" />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col pb-4 leading-tight">
                        <span
                          className={cn(
                            "text-sm",
                            t.done
                              ? "font-medium"
                              : "font-medium text-muted-foreground",
                          )}
                        >
                          {t.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatLongDate(t.date)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>
            ) : null}
          </div>
        ) : null}

        <SheetFooter className="flex-row gap-2 border-t border-border/60">
          <Button className="flex-1">Update stage</Button>
          <Button variant="outline" className="flex-1">
            Add note
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
