import {
  findAllOpportunities,
  findOpportunity,
  getSavedOpportunityIds as getSavedOpportunityIdsRepo,
  saveOpportunity as saveOpportunityRepo,
} from "@/lib/repositories/opportunity-repository"
import type {
  ApplicationHealth,
  MatchDetail,
  NextAction,
  NextEvent,
  Opportunity,
  OpportunityType,
  Recommendation,
  Stage,
  TimelineEvent,
} from "@/lib/mock-data"

type OpportunityRow = Record<string, unknown>

const OPPORTUNITY_TYPES: OpportunityType[] = [
  "Job",
  "Internship",
  "Hackathon",
  "Competition",
  "Fellowship",
  "Scholarship",
]

const RECOMMENDATIONS: Recommendation[] = [
  "Best Match",
  "High Priority",
  "Trending",
  "Closing Soon",
]

const STAGES: Stage[] = [
  "Interested",
  "Applied",
  "OA Scheduled",
  "OA Completed",
  "Interview Scheduled",
  "Interview Completed",
  "Offer",
  "Rejected",
]

const HEALTH_STATUSES: ApplicationHealth[] = [
  "On Track",
  "Action Needed",
  "Deadline Risk",
]

const NEXT_EVENT_KINDS: NextEvent["kind"][] = [
  "Deadline",
  "OA",
  "Interview",
  "Result",
]

export async function getAllOpportunities(): Promise<Opportunity[]> {
  const rows = await findAllOpportunities()

  return (rows as OpportunityRow[]).map(mapOpportunityRow)
}

export async function getOpportunityById(
  id: string,
): Promise<Opportunity | null> {
  const row = await findOpportunity(id)

  return row ? mapOpportunityRow(row as OpportunityRow) : null
}

export async function saveOpportunity(
  userId: string,
  opportunityId: string,
) {
  return await saveOpportunityRepo(userId, opportunityId)
}

export async function getSavedOpportunityIds(userId: string) {
  return getSavedOpportunityIdsRepo(userId)
}

function mapOpportunityRow(row: OpportunityRow): Opportunity {
  const title = textValue(row.title) ?? textValue(row.name) ?? "Untitled opportunity"
  const org =
    textValue(row.org) ??
    textValue(row.organization) ??
    textValue(row.company) ??
    textValue(row.company_name) ??
    textValue(row.employer) ??
    "Unknown organization"
  const location =
    textValue(row.location) ??
    textValue(row.location_name) ??
    textValue(row.city) ??
    "Remote"
  const remote =
    booleanValue(row.remote) ??
    booleanValue(row.is_remote) ??
    booleanValue(row.remote_friendly) ??
    location.toLowerCase().includes("remote")
  const tags =
    stringArrayValue(row.tags) ??
    stringArrayValue(row.skills) ??
    stringArrayValue(row.keywords) ??
    []
  const role =
    textValue(row.role) ??
    textValue(row.role_title) ??
    textValue(row.position) ??
    textValue(row.discipline) ??
    "Software Engineer"
  const matchScore = scoreValue(
    row.matchScore ?? row.match_score ?? row.score ?? row.match,
  )
  const deadline =
    dateValue(row.deadline) ??
    dateValue(row.deadline_at) ??
    dateValue(row.application_deadline) ??
    dateValue(row.due_date) ??
    dateValue(row.closes_at) ??
    "2099-12-31"

  return {
    id: String(row.id),
    title,
    org,
    logo: logoValue(row.logo_text ?? row.logo ?? row.logo_initials, org),
    type: opportunityTypeValue(row.type ?? row.opportunity_type ?? row.category),
    role,
    location,
    remote,
    matchScore,
    recommendation: recommendationValue(row.recommendation),
    source:
      textValue(row.source) ??
      textValue(row.source_name) ??
      textValue(row.platform) ??
      "Supabase",
    salary:
      textValue(row.salary) ??
      textValue(row.compensation) ??
      textValue(row.pay_range),
    posted:
      textValue(row.posted) ??
      dateValue(row.posted_at) ??
      dateValue(row.created_at) ??
      "",
    deadline,
    tags,
    description:
      textValue(row.description) ??
      textValue(row.summary) ??
      `${org} is offering ${title}.`,
    requirements:
      stringArrayValue(row.requirements) ??
      stringArrayValue(row.qualifications) ??
      [],
    matchReasons:
      stringArrayValue(row.matchReasons ?? row.match_reasons) ??
      stringArrayValue(row.reasons) ??
      [],
    matchDetail: matchDetailValue(row.matchDetail ?? row.match_detail, {
      matchScore,
      role,
      location,
      remote,
      tags,
    }),
    saved: booleanValue(row.saved) ?? false,
    stage: stageValue(row.stage ?? row.application_stage ?? row.status),
    health: healthValue(row.health ?? row.application_health),
    nextEvent: nextEventValue(row.nextEvent ?? row.next_event),
    nextAction: nextActionValue(row.nextAction ?? row.next_action),
    notes: textValue(row.notes),
    resumeUsed: textValue(row.resumeUsed ?? row.resume_used),
    applicationLink:
      textValue(row.applicationLink ?? row.application_link) ??
      textValue(row.apply_url) ??
      textValue(row.url),
    timeline: timelineValue(row.timeline),
    interviewDetails: textValue(row.interviewDetails ?? row.interview_details),
  }
}

function textValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length ? trimmed : undefined
  }

  if (typeof value === "number") return String(value)

  return undefined
}

function booleanValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()
    if (["true", "yes", "1"].includes(normalized)) return true
    if (["false", "no", "0"].includes(normalized)) return false
  }

  if (typeof value === "number") return value !== 0

  return undefined
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace("%", ""))
    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

function scoreValue(value: unknown): number {
  const score = numberValue(value) ?? 0
  const normalized = score > 0 && score <= 1 ? score * 100 : score

  return Math.max(0, Math.min(100, Math.round(normalized)))
}

function dateValue(value: unknown): string | undefined {
  const text = textValue(value)
  if (!text) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text

  const date = new Date(text)
  if (Number.isNaN(date.getTime())) return text

  return date.toISOString().slice(0, 10)
}

function stringArrayValue(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value
      .map((item) => textValue(item))
      .filter((item): item is string => Boolean(item))
  }

  if (typeof value === "string") {
    const trimmed = value.trim()
    if (!trimmed) return undefined

    if (trimmed.startsWith("[")) {
      try {
        return stringArrayValue(JSON.parse(trimmed))
      } catch {
        return undefined
      }
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return undefined
}

function objectValue(value: unknown): OpportunityRow | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as OpportunityRow
  }

  return undefined
}

function enumValue<T extends string>(
  value: unknown,
  options: readonly T[],
): T | undefined {
  const text = textValue(value)
  if (!text) return undefined

  const normalized = normalizeEnumText(text)

  return options.find((option) => normalizeEnumText(option) === normalized)
}

function normalizeEnumText(value: string) {
  return value.toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ").trim()
}

function opportunityTypeValue(value: unknown): OpportunityType {
  return enumValue(value, OPPORTUNITY_TYPES) ?? "Job"
}

function recommendationValue(value: unknown): Recommendation | undefined {
  return enumValue(value, RECOMMENDATIONS)
}

function stageValue(value: unknown): Stage | undefined {
  return enumValue(value, STAGES)
}

function healthValue(value: unknown): ApplicationHealth | undefined {
  return enumValue(value, HEALTH_STATUSES)
}

function matchDetailValue(
  value: unknown,
  fallback: {
    matchScore: number
    role: string
    location: string
    remote: boolean
    tags: string[]
  },
): MatchDetail {
  const detail = objectValue(value)
  const skillsMatched =
    stringArrayValue(detail?.skillsMatched ?? detail?.skills_matched) ??
    fallback.tags.slice(0, 3)
  const skillsMissing =
    stringArrayValue(detail?.skillsMissing ?? detail?.skills_missing) ?? []

  return {
    skills: scoreValue(detail?.skills ?? fallback.matchScore),
    role: scoreValue(detail?.role ?? fallback.matchScore),
    location: scoreValue(detail?.location ?? (fallback.remote ? 100 : 75)),
    timeline: scoreValue(detail?.timeline ?? fallback.matchScore),
    skillsMatched,
    skillsMissing,
    roleNote:
      textValue(detail?.roleNote ?? detail?.role_note) ??
      `${fallback.role} aligns with your target roles.`,
    locationNote:
      textValue(detail?.locationNote ?? detail?.location_note) ??
      (fallback.remote
        ? "Remote matches your location preference."
        : `${fallback.location} is listed for this opportunity.`),
    timelineNote:
      textValue(detail?.timelineNote ?? detail?.timeline_note) ??
      "Review the deadline and apply when ready.",
  }
}

function nextEventValue(value: unknown): NextEvent | undefined {
  const event = objectValue(value)
  if (!event) return undefined

  const label = textValue(event.label)
  const date = dateValue(event.date)
  const kind = enumValue(event.kind, NEXT_EVENT_KINDS)

  return label && date && kind ? { label, date, kind } : undefined
}

function nextActionValue(value: unknown): NextAction | undefined {
  const action = objectValue(value)
  if (!action) return undefined

  const label = textValue(action.label)
  const detail = textValue(action.detail)

  return label && detail ? { label, detail } : undefined
}

function timelineValue(value: unknown): TimelineEvent[] | undefined {
  if (!Array.isArray(value)) return undefined

  const timeline = value
    .map((item) => {
      const event = objectValue(item)
      const label = textValue(event?.label)
      const date = dateValue(event?.date)
      const done = booleanValue(event?.done) ?? false

      return label && date ? { label, date, done } : null
    })
    .filter((item): item is TimelineEvent => Boolean(item))

  return timeline.length ? timeline : undefined
}

function logoValue(value: unknown, fallback: string) {
  const logo = textValue(value)
  if (!logo) return initials(fallback)
  if (logo.startsWith("http")) return initials(fallback)
  if (logo.length > 4) return initials(logo)

  return logo
}

function initials(value: string) {
  return value
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
