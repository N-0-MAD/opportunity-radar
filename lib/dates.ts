// Fixed "today" so the demo's relative dates stay consistent.
export const TODAY = "2026-06-18"

export function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function formatLongDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function daysUntil(date: string) {
  const today = new Date(TODAY + "T00:00:00").getTime()
  const target = new Date(date + "T00:00:00").getTime()
  return Math.round((target - today) / 86400000)
}

export function relativeDay(date: string) {
  const diff = daysUntil(date)
  if (diff < 0) return `${Math.abs(diff)}d ago`
  if (diff === 0) return "Today"
  if (diff === 1) return "Tomorrow"
  return `in ${diff}d`
}

export type Urgency = "overdue" | "today" | "tomorrow" | "soon" | "upcoming" | "later"

export function urgencyOf(date: string): Urgency {
  const diff = daysUntil(date)
  if (diff < 0) return "overdue"
  if (diff === 0) return "today"
  if (diff === 1) return "tomorrow"
  if (diff <= 3) return "soon"
  if (diff <= 7) return "upcoming"
  return "later"
}

// Short urgency label for deadline-type chips.
export function urgencyLabel(date: string): string | null {
  const diff = daysUntil(date)
  if (diff < 0) return "Closed"
  if (diff === 0) return "Due today"
  if (diff === 1) return "Due tomorrow"
  if (diff <= 3) return `Due in ${diff} days`
  if (diff <= 7) return "Closing soon"
  return null
}
