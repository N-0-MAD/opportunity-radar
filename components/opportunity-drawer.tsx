"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  ArrowUpRight,
  Banknote,
  Bookmark,
  Briefcase,
  CalendarClock,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  ListChecks,
  MapPin,
  NotebookPen,
  Plus,
  Radar,
  Sparkles,
  Target,
  Wrench,
  X,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

import { BrandLogo } from "@/components/brand-logo"
import { HealthBadge } from "@/components/health-badge"
import { MatchScore } from "@/components/match-score"
import { RecommendationBadge } from "@/components/recommendation-badge"
import { UrgencyBadge } from "@/components/urgency-badge"
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
import { formatLongDate, relativeDay } from "@/lib/dates"
import { cn } from "@/lib/utils"
import { opportunities, type Opportunity } from "@/lib/mock-data"

type DrawerContextValue = {
  open: (op: Opportunity) => void
  isSaved: (id: string) => boolean
  isTracked: (id: string) => boolean
  toggleSave: (id: string) => void
  track: (id: string) => void
}

const OpportunityDrawerContext = createContext<DrawerContextValue | null>(null)

export function useOpportunityDrawer() {
  const ctx = useContext(OpportunityDrawerContext)
  if (!ctx) {
    throw new Error(
      "useOpportunityDrawer must be used within an OpportunityDrawerProvider",
    )
  }
  return ctx
}

export function OpportunityDrawerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeOp, setActiveOp] = useState<Opportunity | null>(null)
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(
    () => new Set(opportunities.filter((o) => o.saved).map((o) => o.id)),
  )
  const [tracked, setTracked] = useState<Set<string>>(
    () => new Set(opportunities.filter((o) => o.stage).map((o) => o.id)),
  )

  const openOp = useCallback((op: Opportunity) => {
    setActiveOp(op)
    setOpen(true)
  }, [])

  const toggleSave = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        toast("Removed from saved")
      } else {
        next.add(id)
        toast.success("Saved to your list")
      }
      return next
    })
  }, [])

  const track = useCallback((id: string) => {
    setTracked((prev) => {
      if (prev.has(id)) {
        toast("Already in My Opportunities")
        return prev
      }
      const next = new Set(prev)
      next.add(id)
      toast.success("Added to My Opportunities", {
        description: "Tracking in the Interested stage.",
      })
      return next
    })
  }, [])

  const value = useMemo<DrawerContextValue>(
    () => ({
      open: openOp,
      isSaved: (id) => saved.has(id),
      isTracked: (id) => tracked.has(id),
      toggleSave,
      track,
    }),
    [openOp, saved, tracked, toggleSave, track],
  )

  return (
    <OpportunityDrawerContext.Provider value={value}>
      {children}
      <OpportunityDrawer
        op={activeOp}
        open={open}
        onOpenChange={setOpen}
        saved={activeOp ? saved.has(activeOp.id) : false}
        tracked={activeOp ? tracked.has(activeOp.id) : false}
        onToggleSave={toggleSave}
        onTrack={track}
      />
    </OpportunityDrawerContext.Provider>
  )
}

const SIGNAL_META = [
  { key: "skills", label: "Skills match", icon: Wrench, noteKey: null },
  { key: "role", label: "Role alignment", icon: Briefcase, noteKey: "roleNote" },
  { key: "location", label: "Location fit", icon: MapPin, noteKey: "locationNote" },
  {
    key: "timeline",
    label: "Timeline fit",
    icon: CalendarClock,
    noteKey: "timelineNote",
  },
] as const

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof FileText
  children: React.ReactNode
}) {
  return (
    <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      <Icon className="size-3.5" />
      {children}
    </h4>
  )
}

function OpportunityDrawer({
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
  const cleanLink = op?.applicationLink?.replace(/^https?:\/\//, "")

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-lg">
        <SheetHeader className="gap-3">
          {op ? (
            <>
              <div className="flex items-start gap-3">
                <BrandLogo label={op.logo} className="size-12" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <SheetTitle className="text-base leading-tight text-pretty">
                    {op.title}
                  </SheetTitle>
                  <SheetDescription className="flex flex-wrap items-center gap-1.5">
                    {op.org}
                    <span className="text-border">•</span>
                    <MapPin className="size-3" />
                    {op.location}
                    {op.remote ? (
                      <Badge variant="outline" className="ml-0.5">
                        Remote
                      </Badge>
                    ) : null}
                  </SheetDescription>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{op.type}</Badge>
                <MatchScore score={op.matchScore} />
                {op.stage ? (
                  <Badge variant="outline">{op.stage}</Badge>
                ) : null}
                {op.health ? <HealthBadge health={op.health} /> : null}
                {op.recommendation && !op.stage ? (
                  <RecommendationBadge recommendation={op.recommendation} />
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Radar className="size-3.5" />
                  via {op.source}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="size-3.5" />
                  Due {formatLongDate(op.deadline)}
                </span>
                {op.salary ? (
                  <span className="flex items-center gap-1.5">
                    <Banknote className="size-3.5" />
                    <span className="font-medium text-foreground">
                      {op.salary}
                    </span>
                  </span>
                ) : null}
              </div>
            </>
          ) : null}
        </SheetHeader>

        {op ? (
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
            {/* Next action */}
            {op.nextAction ? (
              <div className="flex items-start gap-3 rounded-lg border border-primary/25 bg-primary/5 p-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Zap className="size-4.5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
                  <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
                    Next action
                  </span>
                  <span className="text-sm font-medium">
                    {op.nextAction.label}
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {op.nextAction.detail}
                  </span>
                </div>
              </div>
            ) : op.nextEvent ? (
              <div className="flex items-center gap-3 rounded-lg border border-primary/25 bg-primary/5 p-3">
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

            {/* Description */}
            <div className="flex flex-col gap-2.5">
              <SectionTitle icon={FileText}>About this role</SectionTitle>
              <p className="text-sm leading-relaxed text-foreground/90">
                {op.description}
              </p>
            </div>

            {/* Match breakdown */}
            <div className="flex flex-col gap-4">
              <SectionTitle icon={Target}>Match breakdown</SectionTitle>
              <div className="flex flex-col gap-4">
                {SIGNAL_META.map((s) => {
                  const value = op.matchDetail[s.key]
                  const note = s.noteKey ? op.matchDetail[s.noteKey] : null
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

            {/* Why this matches */}
            <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <SectionTitle icon={Sparkles}>Why this matches</SectionTitle>
              <p className="text-sm leading-relaxed text-foreground/90">
                {`This is a ${op.matchScore >= 90 ? "standout" : "strong"} fit. ${op.org}'s ${op.role} role aligns with your profile across skills, role, location, and timeline.`}
              </p>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Skills overlap
                </span>
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
              <ul className="flex flex-col gap-2">
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

            {/* Requirements */}
            {op.requirements?.length ? (
              <div className="flex flex-col gap-2.5">
                <SectionTitle icon={ListChecks}>Requirements</SectionTitle>
                <ul className="flex flex-col gap-2">
                  {op.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Deadline + compensation */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 bg-card/40 p-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" />
                  Deadline
                </span>
                <span className="text-sm font-medium">
                  {formatLongDate(op.deadline)}
                </span>
                <UrgencyBadge date={op.deadline} />
              </div>
              <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 bg-card/40 p-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Banknote className="size-3.5" />
                  Compensation
                </span>
                <span className="text-sm font-medium">
                  {op.salary ?? "Not specified"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {op.type}
                </span>
              </div>
            </div>

            {/* Notes / resume / link (tracked apps) */}
            {op.notes || op.resumeUsed || op.applicationLink ? (
              <>
                <Separator />
                {op.notes ? (
                  <div className="flex flex-col gap-2.5">
                    <SectionTitle icon={NotebookPen}>Notes</SectionTitle>
                    <p className="rounded-lg border border-border/60 bg-card/40 p-3 text-sm leading-relaxed text-foreground/90">
                      {op.notes}
                    </p>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {op.resumeUsed ? (
                    <div className="flex flex-col gap-2.5">
                      <SectionTitle icon={FileText}>Resume used</SectionTitle>
                      <span className="truncate rounded-md bg-muted px-2 py-1.5 font-mono text-xs text-muted-foreground">
                        {op.resumeUsed}
                      </span>
                    </div>
                  ) : null}
                  {cleanLink ? (
                    <div className="flex flex-col gap-2.5">
                      <SectionTitle icon={ExternalLink}>
                        Application link
                      </SectionTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        render={
                          <a
                            href={`https://${cleanLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink data-icon="inline-start" />
                            Open posting
                          </a>
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {op.interviewDetails ? (
              <div className="flex flex-col gap-2.5">
                <SectionTitle icon={ClipboardList}>
                  Interview details
                </SectionTitle>
                <p className="rounded-lg border border-border/60 bg-card/40 p-3 text-sm leading-relaxed text-foreground/90">
                  {op.interviewDetails}
                </p>
              </div>
            ) : null}

            {/* Timeline */}
            {op.timeline?.length ? (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <SectionTitle icon={CalendarClock}>Timeline</SectionTitle>
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
                              "text-sm font-medium",
                              !t.done && "text-muted-foreground",
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
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        {op ? (
          <SheetFooter className="flex-row gap-2 border-t border-border/60">
            {tracked ? (
              <>
                <Button
                  className="flex-1"
                  onClick={() =>
                    toast.success("Stage updated", { description: op.title })
                  }
                >
                  <ArrowUpRight data-icon="inline-start" />
                  Update stage
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    toast("Add a note", { description: "Opening note editor…" })
                  }
                >
                  <NotebookPen data-icon="inline-start" />
                  Add note
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1" onClick={() => onTrack(op.id)}>
                  <Plus data-icon="inline-start" />
                  Track
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onToggleSave(op.id)}
                >
                  <Bookmark
                    data-icon="inline-start"
                    className={cn(saved && "fill-primary text-primary")}
                  />
                  {saved ? "Saved" : "Save"}
                </Button>
              </>
            )}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
