"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { OpportunityCard } from "@/components/discover/opportunity-card"
import { MatchPanel } from "@/components/discover/match-panel"
import { Badge } from "@/components/ui/badge"
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  opportunities,
  OPPORTUNITY_TYPES,
  ROLES,
  LOCATIONS,
  type Opportunity,
} from "@/lib/mock-data"

export function DiscoverView() {
  const [query, setQuery] = useState("")
  const [types, setTypes] = useState<string[]>([])
  const [role, setRole] = useState("all")
  const [location, setLocation] = useState("all")
  const [active, setActive] = useState<Opportunity | null>(null)
  const [open, setOpen] = useState(false)

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
      if (location !== "all" && op.location !== location && !(location === "Remote" && op.remote))
        return false
      return true
    })
  }, [query, types, role, location])

  function explain(op: Opportunity) {
    setActive(op)
    setOpen(true)
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
              <SelectTrigger size="sm" className="w-40">
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
              <SelectTrigger size="sm" className="w-40">
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
              <OpportunityCard key={op.id} op={op} onExplain={explain} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-sm font-medium">No opportunities found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search.
          </p>
        </div>
      )}

      <MatchPanel op={active} open={open} onOpenChange={setOpen} />
    </div>
  )
}
