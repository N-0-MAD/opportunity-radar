"use client"

import { useMemo, useState } from "react"
import { Compass, Search, SlidersHorizontal } from "lucide-react"
import { toast } from "sonner"

import { OpportunityCard } from "@/components/discover/opportunity-card"
import { MatchPanel } from "@/components/discover/match-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  opportunities,
  OPPORTUNITY_TYPES,
  ROLES,
  LOCATIONS,
  sources as allSources,
  type Opportunity,
} from "@/lib/mock-data"

export function DiscoverView() {
  const [query, setQuery] = useState("")
  const [types, setTypes] = useState<string[]>([])
  const [role, setRole] = useState("all")
  const [location, setLocation] = useState("all")
  const [source, setSource] = useState("all")
  const [active, setActive] = useState<Opportunity | null>(null)
  const [open, setOpen] = useState(false)

  const [saved, setSaved] = useState<Set<string>>(
    () => new Set(opportunities.filter((o) => o.saved).map((o) => o.id)),
  )
  const [tracked, setTracked] = useState<Set<string>>(
    () => new Set(opportunities.filter((o) => o.stage).map((o) => o.id)),
  )

  const sourceNames = useMemo(
    () => Array.from(new Set(allSources.map((s) => s.name))),
    [],
  )

  const results = useMemo(() => {
    return opportunities.filter((op) => {
      if (
        query &&
        !`${op.title} ${op.org} ${op.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false
      if (types.length && !types.includes(op.type)) return false
      if (role !== "all" && op.role !== role) return false
      if (source !== "all" && op.source !== source) return false
      if (
        location !== "all" &&
        op.location !== location &&
        !(location === "Remote" && op.remote)
      )
        return false
      return true
    })
  }, [query, types, role, location, source])

  function explain(op: Opportunity) {
    setActive(op)
    setOpen(true)
  }

  function toggleSave(id: string) {
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
  }

  function track(id: string) {
    setTracked((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      toast.success("Added to My Opportunities", {
        description: "Tracking in the Interested stage.",
      })
      return next
    })
  }

  function resetFilters() {
    setQuery("")
    setTypes([])
    setRole("all")
    setLocation("all")
    setSource("all")
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="lg:max-w-md lg:flex-1">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search by title, company, or skill…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All roles</SelectItem>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All locations</SelectItem>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All sources</SelectItem>
                  {sourceNames.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <SlidersHorizontal className="size-3.5" />
            Type
          </span>
          <ToggleGroup
            value={types}
            onValueChange={setTypes}
            variant="outline"
            size="sm"
            className="flex-wrap"
          >
            {OPPORTUNITY_TYPES.map((t) => (
              <ToggleGroupItem key={t} value={t}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{results.length}</span>{" "}
          opportunities
        </p>
        <Badge variant="secondary">Sorted by match</Badge>
      </div>

      {results.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...results]
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((op) => (
              <OpportunityCard
                key={op.id}
                op={op}
                saved={saved.has(op.id)}
                tracked={tracked.has(op.id)}
                onExplain={explain}
                onToggleSave={toggleSave}
                onTrack={track}
              />
            ))}
        </div>
      ) : (
        <Empty className="rounded-xl border border-dashed border-border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Compass />
            </EmptyMedia>
            <EmptyTitle>No opportunities found</EmptyTitle>
            <EmptyDescription>
              Try adjusting your filters or search terms to widen the radar.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <MatchPanel
        op={active}
        open={open}
        onOpenChange={setOpen}
        saved={active ? saved.has(active.id) : false}
        tracked={active ? tracked.has(active.id) : false}
        onToggleSave={toggleSave}
        onTrack={track}
      />
    </div>
  )
}
