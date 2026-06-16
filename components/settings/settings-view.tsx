"use client"

import { useState } from "react"
import { Bell, MapPin, Plus, Sparkles, User, X } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import {
  discoveryPrefs,
  matchingPrefs,
  notificationPrefs,
  OPPORTUNITY_TYPES,
  preferredLocations,
  preferredRoles,
  profile,
  skills as seedSkills,
  type OpportunityType,
} from "@/lib/mock-data"

const CADENCE_OPTIONS = ["Hourly", "Every 6 hours", "Every 12 hours", "Daily"]

export function SettingsView() {
  return (
    <Tabs defaultValue="profile" className="gap-6">
      <TabsList>
        <TabsTrigger value="profile">
          <User data-icon="inline-start" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="matching">
          <Sparkles data-icon="inline-start" />
          Matching
        </TabsTrigger>
        <TabsTrigger value="discovery">
          <MapPin data-icon="inline-start" />
          Discovery
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell data-icon="inline-start" />
          Notifications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileSection />
      </TabsContent>
      <TabsContent value="matching">
        <MatchingSection />
      </TabsContent>
      <TabsContent value="discovery">
        <DiscoverySection />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationsSection />
      </TabsContent>
    </Tabs>
  )
}

function ChipList({
  items,
  onRemove,
  onAdd,
  placeholder,
}: {
  items: string[]
  onRemove: (item: string) => void
  onAdd: (item: string) => void
  placeholder: string
}) {
  const [value, setValue] = useState("")
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item} variant="secondary" className="gap-1 pr-1">
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="rounded-full p-0.5 transition-colors hover:bg-foreground/10"
              aria-label={`Remove ${item}`}
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          const v = value.trim()
          if (v && !items.includes(v)) {
            onAdd(v)
            setValue("")
          }
        }}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-9"
        />
        <Button type="submit" variant="outline" size="sm">
          <Plus data-icon="inline-start" />
          Add
        </Button>
      </form>
    </div>
  )
}

function ProfileSection() {
  const [skillList, setSkillList] = useState<string[]>(seedSkills)
  const [roleList, setRoleList] = useState<string[]>(preferredRoles)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This information powers your match scores and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/15 text-lg font-semibold text-primary">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change photo
            </Button>
          </div>

          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input id="name" defaultValue={profile.name} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" defaultValue={profile.email} />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="headline">Headline</FieldLabel>
              <Input id="headline" defaultValue={profile.headline} />
              <FieldDescription>
                A short summary shown on your profile.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            Skills we match against opportunity requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChipList
            items={skillList}
            onAdd={(s) => setSkillList((p) => [...p, s])}
            onRemove={(s) => setSkillList((p) => p.filter((x) => x !== s))}
            placeholder="Add a skill (e.g. Kubernetes)"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferred roles</CardTitle>
          <CardDescription>
            We prioritize opportunities matching these roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChipList
            items={roleList}
            onAdd={(s) => setRoleList((p) => [...p, s])}
            onRemove={(s) => setRoleList((p) => p.filter((x) => x !== s))}
            placeholder="Add a role"
          />
        </CardContent>
      </Card>

      <SaveBar />
    </div>
  )
}

function MatchingSection() {
  const [minMatch, setMinMatch] = useState(matchingPrefs.minMatch)
  const [remote, setRemote] = useState(matchingPrefs.prioritizeRemote)
  const [newGrad, setNewGrad] = useState(matchingPrefs.prioritizeNewGrad)
  const [equity, setEquity] = useState(matchingPrefs.includeEquityRoles)
  const [locations, setLocations] = useState<string[]>(preferredLocations)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Match threshold</CardTitle>
          <CardDescription>
            Only surface opportunities at or above this match score.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>Minimum match score</Label>
            <span className="text-2xl font-semibold tabular-nums text-primary">
              {minMatch}%
            </span>
          </div>
          <Slider
            value={[minMatch]}
            onValueChange={(v: number[]) => setMinMatch(v[0])}
            min={50}
            max={95}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>50%</span>
            <span>95%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priorities</CardTitle>
          <CardDescription>
            Boost opportunities matching what matters to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <ToggleRow
            label="Prioritize remote roles"
            detail="Rank remote-friendly opportunities higher"
            checked={remote}
            onChange={setRemote}
          />
          <Separator className="opacity-50" />
          <ToggleRow
            label="Prioritize new-grad roles"
            detail="Highlight entry-level and new-grad positions"
            checked={newGrad}
            onChange={setNewGrad}
          />
          <Separator className="opacity-50" />
          <ToggleRow
            label="Include equity-heavy roles"
            detail="Show early-stage startup roles with equity comp"
            checked={equity}
            onChange={setEquity}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferred locations</CardTitle>
          <CardDescription>
            Locations we weight when scoring matches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChipList
            items={locations}
            onAdd={(s) => setLocations((p) => [...p, s])}
            onRemove={(s) => setLocations((p) => p.filter((x) => x !== s))}
            placeholder="Add a location"
          />
        </CardContent>
      </Card>

      <SaveBar />
    </div>
  )
}

function DiscoverySection() {
  const [interests, setInterests] = useState<string[]>(discoveryPrefs.interests)
  const [cadence, setCadence] = useState(discoveryPrefs.cadence)
  const [autoSave, setAutoSave] = useState(discoveryPrefs.autoSaveHighMatches)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Opportunity types</CardTitle>
          <CardDescription>
            Choose which categories Radar discovers for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup
            value={interests}
            onValueChange={(v: string[]) => {
              if (v.length > 0) setInterests(v as OpportunityType[])
            }}
            className="flex flex-wrap justify-start gap-2"
            aria-label="Opportunity types"
          >
            {OPPORTUNITY_TYPES.map((t) => (
              <ToggleGroupItem key={t} value={t} aria-label={t}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scan cadence</CardTitle>
          <CardDescription>How often we crawl your sources.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ToggleGroup
            value={[cadence]}
            onValueChange={(v: string[]) => {
              if (v[0]) setCadence(v[0])
            }}
            className="flex flex-wrap justify-start gap-2"
            aria-label="Scan cadence"
          >
            {CADENCE_OPTIONS.map((c) => (
              <ToggleGroupItem key={c} value={c} aria-label={c}>
                {c}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Separator className="opacity-50" />
          <ToggleRow
            label="Auto-save high matches"
            detail="Automatically save opportunities scoring 90% or higher"
            checked={autoSave}
            onChange={setAutoSave}
          />
        </CardContent>
      </Card>

      <SaveBar />
    </div>
  )
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState(notificationPrefs)

  function toggle(id: string) {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what Opportunity Radar alerts you about.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {prefs.map((p, i) => (
            <div key={p.id} className="flex flex-col">
              <ToggleRow
                label={p.label}
                detail={p.detail}
                checked={p.enabled}
                onChange={() => toggle(p.id)}
              />
              {i < prefs.length - 1 ? (
                <Separator className="opacity-50" />
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <SaveBar />
    </div>
  )
}

function ToggleRow({
  label,
  detail,
  checked,
  onChange,
}: {
  label: string
  detail: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{detail}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  )
}

function SaveBar() {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button onClick={() => toast.success("Settings saved")}>
        Save changes
      </Button>
    </div>
  )
}
