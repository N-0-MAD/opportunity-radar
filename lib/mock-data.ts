export type OpportunityType =
  | "Job"
  | "Internship"
  | "Hackathon"
  | "Competition"
  | "Fellowship"
  | "Scholarship"

export type Stage =
  | "Interested"
  | "Applied"
  | "OA Scheduled"
  | "OA Completed"
  | "Interview Scheduled"
  | "Interview Completed"
  | "Offer"
  | "Rejected"

export type Opportunity = {
  id: string
  title: string
  org: string
  logo: string
  type: OpportunityType
  role: string
  location: string
  remote: boolean
  matchScore: number
  salary?: string
  posted: string
  deadline: string
  tags: string[]
  description: string
  matchReasons: string[]
  saved: boolean
  stage?: Stage
}

export const OPPORTUNITY_TYPES: OpportunityType[] = [
  "Job",
  "Internship",
  "Hackathon",
  "Competition",
  "Fellowship",
  "Scholarship",
]

export const STAGES: Stage[] = [
  "Interested",
  "Applied",
  "OA Scheduled",
  "OA Completed",
  "Interview Scheduled",
  "Interview Completed",
  "Offer",
  "Rejected",
]

export const ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "ML Engineer",
  "Data Scientist",
  "Product Designer",
  "Product Manager",
]

export const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Seattle, WA",
  "Remote",
  "London, UK",
  "Bengaluru, IN",
  "Berlin, DE",
]

export const opportunities: Opportunity[] = [
  {
    id: "op-1",
    title: "Software Engineer, New Grad",
    org: "Google",
    logo: "G",
    type: "Job",
    role: "Software Engineer",
    location: "Mountain View, CA",
    remote: false,
    matchScore: 94,
    salary: "$145k–$185k",
    posted: "2d ago",
    deadline: "2026-07-02",
    tags: ["Go", "Distributed Systems", "C++"],
    description:
      "Join the Core Infrastructure team building the systems that power Google scale. Work across the stack on highly available, low-latency services.",
    matchReasons: [
      "Your Go and distributed systems experience strongly aligns with the core requirements.",
      "Your past internship at a cloud infra team maps directly to the team's charter.",
      "Location preference and new-grad timeline are an exact match.",
    ],
    saved: true,
    stage: "Interview Scheduled",
  },
  {
    id: "op-2",
    title: "Frontend Engineering Intern",
    org: "Stripe",
    logo: "S",
    type: "Internship",
    role: "Frontend Engineer",
    location: "San Francisco, CA",
    remote: false,
    matchScore: 91,
    salary: "$9.5k / mo",
    posted: "4h ago",
    deadline: "2026-06-25",
    tags: ["React", "TypeScript", "Design Systems"],
    description:
      "Build delightful, accessible interfaces for Stripe's Dashboard used by millions of businesses. Partner closely with design and product.",
    matchReasons: [
      "Your React + TypeScript portfolio matches the team's primary stack.",
      "Strong signal from your design-systems side projects.",
      "You expressed interest in fintech and developer tools.",
    ],
    saved: true,
    stage: "Applied",
  },
  {
    id: "op-3",
    title: "AI Builders Hackathon 2026",
    org: "Vercel",
    logo: "V",
    type: "Hackathon",
    role: "Software Engineer",
    location: "Remote",
    remote: true,
    matchScore: 88,
    posted: "1d ago",
    deadline: "2026-06-20",
    tags: ["AI SDK", "Next.js", "48 hours"],
    description:
      "A 48-hour global hackathon to build AI-native applications. $50k prize pool, mentorship from the Vercel team, and a fast-track interview for finalists.",
    matchReasons: [
      "Your Next.js and AI SDK experience fits the hackathon theme perfectly.",
      "Remote format matches your availability this month.",
      "Finalists get fast-tracked — aligns with your job search.",
    ],
    saved: false,
    stage: "Interested",
  },
  {
    id: "op-4",
    title: "Machine Learning Engineer",
    org: "Microsoft",
    logo: "M",
    type: "Job",
    role: "ML Engineer",
    location: "Seattle, WA",
    remote: false,
    matchScore: 82,
    salary: "$160k–$210k",
    posted: "3d ago",
    deadline: "2026-07-15",
    tags: ["PyTorch", "LLMs", "Azure"],
    description:
      "Work on applied ML for Microsoft Copilot. Train, fine-tune, and ship large models into production at planetary scale.",
    matchReasons: [
      "Your PyTorch and LLM coursework aligns with the role.",
      "Seattle is within your preferred locations.",
      "Compensation band fits your target range.",
    ],
    saved: false,
    stage: "OA Scheduled",
  },
  {
    id: "op-5",
    title: "Backend Engineer (Payments)",
    org: "Amazon",
    logo: "A",
    type: "Job",
    role: "Backend Engineer",
    location: "Remote",
    remote: true,
    matchScore: 79,
    salary: "$150k–$195k",
    posted: "5d ago",
    deadline: "2026-07-08",
    tags: ["Java", "AWS", "Microservices"],
    description:
      "Own critical payment processing services. Design fault-tolerant, idempotent systems that move billions of dollars safely.",
    matchReasons: [
      "Your Java and AWS background matches the stack.",
      "Remote-friendly, fitting your location preference.",
      "Payments domain overlaps with your fintech interest.",
    ],
    saved: true,
    stage: "Applied",
  },
  {
    id: "op-6",
    title: "Knight-Hennessy Scholars",
    org: "Stanford",
    logo: "St",
    type: "Scholarship",
    role: "Software Engineer",
    location: "Stanford, CA",
    remote: false,
    matchScore: 76,
    posted: "1w ago",
    deadline: "2026-08-10",
    tags: ["Fully Funded", "Graduate", "Leadership"],
    description:
      "A fully funded graduate scholarship developing the next generation of global leaders. Covers tuition, stipend, and a leadership development program.",
    matchReasons: [
      "Your leadership and open-source community work strengthen the application.",
      "Aligns with your interest in graduate study.",
      "Deadline gives you enough runway to prepare essays.",
    ],
    saved: false,
    stage: "Interested",
  },
  {
    id: "op-7",
    title: "Devfolio Buildspace S6",
    org: "Devfolio",
    logo: "D",
    type: "Competition",
    role: "Software Engineer",
    location: "Remote",
    remote: true,
    matchScore: 84,
    posted: "2d ago",
    deadline: "2026-06-30",
    tags: ["Web3", "Solo / Team", "6 weeks"],
    description:
      "A 6-week build cohort where you ship a product from idea to launch. Demo day in front of investors and a community of 10k builders.",
    matchReasons: [
      "Your shipping cadence on side projects is a strong fit.",
      "Demo day exposure aligns with your fundraising curiosity.",
      "Flexible team format suits your schedule.",
    ],
    saved: false,
    stage: "Interested",
  },
  {
    id: "op-8",
    title: "Product Design Fellowship",
    org: "Notion",
    logo: "N",
    type: "Fellowship",
    role: "Product Designer",
    location: "New York, NY",
    remote: false,
    matchScore: 71,
    salary: "$7k / mo",
    posted: "6d ago",
    deadline: "2026-07-20",
    tags: ["Figma", "Mentorship", "12 weeks"],
    description:
      "A 12-week mentored fellowship for emerging product designers. Ship real features alongside Notion's design team.",
    matchReasons: [
      "Your design portfolio shows strong product thinking.",
      "Mentorship structure fits early-career growth goals.",
      "NYC is on your secondary location list.",
    ],
    saved: false,
    stage: "Rejected",
  },
  {
    id: "op-9",
    title: "Full-Stack Engineer",
    org: "Wellfound",
    logo: "W",
    type: "Job",
    role: "Software Engineer",
    location: "Remote",
    remote: true,
    matchScore: 80,
    salary: "$130k–$170k",
    posted: "3d ago",
    deadline: "2026-07-05",
    tags: ["Rails", "React", "Startups"],
    description:
      "Join an early-stage team building the platform where the world's startups hire. Wear many hats and ship fast.",
    matchReasons: [
      "Your full-stack range fits a startup generalist role.",
      "Remote-first matches your preference.",
      "Startup environment aligns with your stated interest.",
    ],
    saved: false,
    stage: "OA Completed",
  },
  {
    id: "op-10",
    title: "Y Combinator W27 SWE",
    org: "YC Jobs",
    logo: "Y",
    type: "Job",
    role: "Backend Engineer",
    location: "San Francisco, CA",
    remote: false,
    matchScore: 86,
    salary: "$140k–$180k + equity",
    posted: "12h ago",
    deadline: "2026-06-28",
    tags: ["Python", "Equity", "Seed Stage"],
    description:
      "Founding engineer role at a seed-stage YC company building AI agents for operations teams. High ownership, high equity.",
    matchReasons: [
      "Your Python and agent experiments match the product direction.",
      "You indicated openness to high-equity early roles.",
      "SF location and immediate start align.",
    ],
    saved: true,
    stage: "Interview Completed",
  },
  {
    id: "op-11",
    title: "Cloud Platform Intern",
    org: "Microsoft",
    logo: "M",
    type: "Internship",
    role: "Backend Engineer",
    location: "Remote",
    remote: true,
    matchScore: 73,
    salary: "$8k / mo",
    posted: "4d ago",
    deadline: "2026-07-12",
    tags: ["C#", "Azure", "Kubernetes"],
    description:
      "Build tooling for the Azure container platform. Learn how planet-scale infrastructure is operated and shipped.",
    matchReasons: [
      "Your Kubernetes homelab project is a strong signal.",
      "Remote internship fits your summer plans.",
      "Cloud infra matches your stated interests.",
    ],
    saved: false,
    stage: "Interested",
  },
  {
    id: "op-12",
    title: "Unstop Coding Championship",
    org: "Unstop",
    logo: "U",
    type: "Competition",
    role: "Software Engineer",
    location: "Remote",
    remote: true,
    matchScore: 77,
    posted: "1d ago",
    deadline: "2026-06-22",
    tags: ["DSA", "Cash Prize", "National"],
    description:
      "A national competitive programming championship with cash prizes and direct interview opportunities with top recruiters.",
    matchReasons: [
      "Your competitive programming rating is above the qualifying bar.",
      "Recruiter pipeline aligns with your job search.",
      "Remote participation suits your schedule.",
    ],
    saved: false,
    stage: "Offer",
  },
]

export type CalendarEvent = {
  id: string
  date: string // YYYY-MM-DD
  title: string
  org: string
  kind: "Deadline" | "OA" | "Interview" | "Result"
}

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-06-20", title: "AI Builders Hackathon deadline", org: "Vercel", kind: "Deadline" },
  { id: "e2", date: "2026-06-22", title: "Unstop Championship round 1", org: "Unstop", kind: "Deadline" },
  { id: "e3", date: "2026-06-24", title: "Online assessment", org: "Microsoft", kind: "OA" },
  { id: "e4", date: "2026-06-25", title: "Stripe application due", org: "Stripe", kind: "Deadline" },
  { id: "e5", date: "2026-06-26", title: "Onsite interview", org: "Google", kind: "Interview" },
  { id: "e6", date: "2026-06-28", title: "Phone screen", org: "YC Jobs", kind: "Interview" },
  { id: "e7", date: "2026-06-28", title: "YC W27 application due", org: "YC Jobs", kind: "Deadline" },
  { id: "e8", date: "2026-06-30", title: "Coding assessment", org: "Wellfound", kind: "OA" },
  { id: "e9", date: "2026-07-01", title: "Offer decision", org: "Unstop", kind: "Result" },
  { id: "e10", date: "2026-07-02", title: "Google application due", org: "Google", kind: "Deadline" },
  { id: "e11", date: "2026-07-05", title: "Wellfound application due", org: "Wellfound", kind: "Deadline" },
  { id: "e12", date: "2026-07-08", title: "Final round", org: "Amazon", kind: "Interview" },
  { id: "e13", date: "2026-07-10", title: "Hackathon results", org: "Devfolio", kind: "Result" },
  { id: "e14", date: "2026-07-15", title: "Microsoft application due", org: "Microsoft", kind: "Deadline" },
]

export type Source = {
  id: string
  name: string
  logo: string
  category: string
  status: "Connected" | "Available"
  found: number
  lastScan: string
  cadence: string
}

export const sources: Source[] = [
  { id: "s1", name: "Google Careers", logo: "G", category: "Company", status: "Connected", found: 142, lastScan: "2h ago", cadence: "Every 6 hours" },
  { id: "s2", name: "Microsoft Careers", logo: "M", category: "Company", status: "Connected", found: 98, lastScan: "2h ago", cadence: "Every 6 hours" },
  { id: "s3", name: "Amazon Careers", logo: "A", category: "Company", status: "Connected", found: 211, lastScan: "5h ago", cadence: "Daily" },
  { id: "s4", name: "Wellfound", logo: "W", category: "Aggregator", status: "Connected", found: 87, lastScan: "1h ago", cadence: "Every 12 hours" },
  { id: "s5", name: "YC Jobs", logo: "Y", category: "Aggregator", status: "Connected", found: 64, lastScan: "3h ago", cadence: "Daily" },
  { id: "s6", name: "Unstop", logo: "U", category: "Competitions", status: "Available", found: 0, lastScan: "Never", cadence: "—" },
  { id: "s7", name: "Devfolio", logo: "D", category: "Hackathons", status: "Available", found: 0, lastScan: "Never", cadence: "—" },
]

export type Activity = {
  id: string
  text: string
  org: string
  logo: string
  time: string
  kind: "match" | "deadline" | "stage" | "scan"
}

export const recentActivity: Activity[] = [
  { id: "a1", text: "New 94% match found", org: "Google", logo: "G", time: "2h ago", kind: "match" },
  { id: "a2", text: "Moved to Interview Scheduled", org: "Google", logo: "G", time: "5h ago", kind: "stage" },
  { id: "a3", text: "Deadline in 3 days", org: "Stripe", logo: "S", time: "6h ago", kind: "deadline" },
  { id: "a4", text: "Scanned 142 new roles", org: "Google Careers", logo: "G", time: "8h ago", kind: "scan" },
  { id: "a5", text: "Application submitted", org: "Amazon", logo: "A", time: "1d ago", kind: "stage" },
  { id: "a6", text: "New 91% match found", org: "Stripe", logo: "S", time: "1d ago", kind: "match" },
]

export const stats = {
  found: 1284,
  foundDelta: "+86 this week",
  saved: 37,
  savedDelta: "+5 this week",
  active: 12,
  activeDelta: "3 in interview",
  events: 9,
  eventsDelta: "next 14 days",
}

export const skills = ["TypeScript", "React", "Next.js", "Go", "Python", "PostgreSQL", "AWS", "Distributed Systems"]
export const preferredRoles = ["Software Engineer", "Frontend Engineer", "Backend Engineer"]
export const preferredLocations = ["San Francisco, CA", "Remote", "Seattle, WA"]
