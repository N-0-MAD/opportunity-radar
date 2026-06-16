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

export type Recommendation =
  | "Best Match"
  | "High Priority"
  | "Trending"
  | "Closing Soon"

export type ApplicationHealth = "On Track" | "Action Needed" | "Deadline Risk"

export type MatchDetail = {
  skills: number
  role: number
  location: number
  timeline: number
  skillsMatched: string[]
  skillsMissing: string[]
  roleNote: string
  locationNote: string
  timelineNote: string
}

export type TimelineEvent = {
  label: string
  date: string
  done: boolean
}

export type NextEvent = {
  label: string
  date: string
  kind: "Deadline" | "OA" | "Interview" | "Result"
}

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
  recommendation?: Recommendation
  source: string
  salary?: string
  posted: string
  deadline: string
  tags: string[]
  description: string
  matchReasons: string[]
  matchDetail: MatchDetail
  saved: boolean
  stage?: Stage
  health?: ApplicationHealth
  nextEvent?: NextEvent
  notes?: string
  resumeUsed?: string
  applicationLink?: string
  timeline?: TimelineEvent[]
  interviewDetails?: string
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
    recommendation: "Best Match",
    source: "Google Careers",
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
    matchDetail: {
      skills: 92,
      role: 96,
      location: 78,
      timeline: 95,
      skillsMatched: ["Go", "Distributed Systems", "PostgreSQL"],
      skillsMissing: ["C++"],
      roleNote: "Software Engineer maps exactly to your target role.",
      locationNote: "Mountain View is near your SF preference but not remote.",
      timelineNote: "New-grad start window matches your availability.",
    },
    saved: true,
    stage: "Interview Scheduled",
    health: "On Track",
    nextEvent: { label: "Onsite interview", date: "2026-06-26", kind: "Interview" },
    notes: "Recruiter mentioned 4 rounds: 2 coding, 1 system design, 1 behavioral. Brush up on consistent hashing.",
    resumeUsed: "Avery_Rivera_SWE_Infra_v3.pdf",
    applicationLink: "https://careers.google.com/jobs/results/swe-new-grad",
    timeline: [
      { label: "Applied", date: "2026-06-10", done: true },
      { label: "Recruiter screen", date: "2026-06-15", done: true },
      { label: "Onsite interview", date: "2026-06-26", done: false },
      { label: "Decision", date: "2026-07-03", done: false },
    ],
    interviewDetails: "Onsite — 4 rounds with the Core Infra team. Virtual, 9:00 AM PT. Interviewers: 2 staff engineers.",
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
    recommendation: "Closing Soon",
    source: "Wellfound",
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
    matchDetail: {
      skills: 96,
      role: 90,
      location: 82,
      timeline: 88,
      skillsMatched: ["React", "TypeScript", "Next.js"],
      skillsMissing: ["Design Systems"],
      roleNote: "Frontend Engineer is a primary target role for you.",
      locationNote: "San Francisco is your top preferred location.",
      timelineNote: "Deadline is close — submit within 7 days.",
    },
    saved: true,
    stage: "Applied",
    health: "Deadline Risk",
    nextEvent: { label: "Application due", date: "2026-06-25", kind: "Deadline" },
    notes: "Need to tailor cover letter to the design-systems team. Reference the component library project.",
    resumeUsed: "Avery_Rivera_Frontend_v2.pdf",
    applicationLink: "https://stripe.com/jobs/listing/frontend-intern",
    timeline: [
      { label: "Saved", date: "2026-06-14", done: true },
      { label: "Applied", date: "2026-06-17", done: true },
      { label: "Application due", date: "2026-06-25", done: false },
    ],
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
    recommendation: "Closing Soon",
    source: "Devfolio",
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
    matchDetail: {
      skills: 90,
      role: 84,
      location: 100,
      timeline: 76,
      skillsMatched: ["Next.js", "TypeScript", "React"],
      skillsMissing: ["AI SDK"],
      roleNote: "Generalist SWE skills cover the hackathon scope.",
      locationNote: "Fully remote — perfect location fit.",
      timelineNote: "Starts in 2 days; tight but doable.",
    },
    saved: false,
    stage: "Interested",
    health: "Deadline Risk",
    nextEvent: { label: "Registration closes", date: "2026-06-20", kind: "Deadline" },
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
    recommendation: "High Priority",
    source: "Microsoft Careers",
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
    matchDetail: {
      skills: 80,
      role: 78,
      location: 88,
      timeline: 84,
      skillsMatched: ["Python", "PyTorch"],
      skillsMissing: ["LLMs", "Azure"],
      roleNote: "ML Engineer is adjacent to your SWE focus.",
      locationNote: "Seattle is on your preferred locations list.",
      timelineNote: "Comfortable deadline — almost a month out.",
    },
    saved: false,
    stage: "OA Scheduled",
    health: "Action Needed",
    nextEvent: { label: "Online assessment", date: "2026-06-24", kind: "OA" },
    notes: "OA covers ML fundamentals + a coding section. Review transformer architectures.",
    resumeUsed: "Avery_Rivera_ML_v1.pdf",
    applicationLink: "https://careers.microsoft.com/ml-engineer",
    timeline: [
      { label: "Applied", date: "2026-06-12", done: true },
      { label: "OA invite", date: "2026-06-16", done: true },
      { label: "Online assessment", date: "2026-06-24", done: false },
    ],
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
    source: "Amazon Careers",
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
    matchDetail: {
      skills: 78,
      role: 82,
      location: 100,
      timeline: 80,
      skillsMatched: ["AWS", "PostgreSQL"],
      skillsMissing: ["Java", "Microservices"],
      roleNote: "Backend Engineer is a target role for you.",
      locationNote: "Remote — matches your preference.",
      timelineNote: "Three weeks of runway before the deadline.",
    },
    saved: true,
    stage: "Applied",
    health: "On Track",
    nextEvent: { label: "Final round", date: "2026-07-08", kind: "Interview" },
    notes: "Heard back positively from recruiter. Final loop covers LP behavioral + system design.",
    resumeUsed: "Avery_Rivera_Backend_v2.pdf",
    applicationLink: "https://amazon.jobs/payments-backend",
    timeline: [
      { label: "Applied", date: "2026-06-09", done: true },
      { label: "Phone screen", date: "2026-06-16", done: true },
      { label: "Final round", date: "2026-07-08", done: false },
    ],
    interviewDetails: "Final loop — 5 rounds including 2 system design and Amazon Leadership Principles behavioral.",
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
    source: "YC Jobs",
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
    matchDetail: {
      skills: 70,
      role: 68,
      location: 75,
      timeline: 92,
      skillsMatched: ["Leadership", "Open Source"],
      skillsMissing: ["Research"],
      roleNote: "Less direct role fit; values leadership signal.",
      locationNote: "Stanford, CA is near your SF preference.",
      timelineNote: "Plenty of time to prepare a strong essay.",
    },
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
    recommendation: "Trending",
    source: "Devfolio",
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
    matchDetail: {
      skills: 86,
      role: 80,
      location: 100,
      timeline: 82,
      skillsMatched: ["Next.js", "TypeScript", "React"],
      skillsMissing: ["Web3"],
      roleNote: "Builder profile fits the cohort well.",
      locationNote: "Remote — perfect fit.",
      timelineNote: "Registration closes in 12 days.",
    },
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
    source: "Wellfound",
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
    matchDetail: {
      skills: 64,
      role: 60,
      location: 72,
      timeline: 86,
      skillsMatched: ["Figma"],
      skillsMissing: ["Product Design", "Prototyping"],
      roleNote: "Product Designer is outside your core role focus.",
      locationNote: "NYC is on your secondary location list.",
      timelineNote: "Over a month before the deadline.",
    },
    saved: false,
    stage: "Rejected",
    health: "On Track",
    nextEvent: undefined,
    notes: "Rejected at portfolio review stage. Feedback: strengthen prototyping case studies.",
    resumeUsed: "Avery_Rivera_Design_v1.pdf",
    applicationLink: "https://notion.so/careers/design-fellowship",
    timeline: [
      { label: "Applied", date: "2026-06-05", done: true },
      { label: "Portfolio review", date: "2026-06-11", done: true },
      { label: "Decision: not advanced", date: "2026-06-13", done: true },
    ],
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
    recommendation: "High Priority",
    source: "Wellfound",
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
    matchDetail: {
      skills: 82,
      role: 84,
      location: 100,
      timeline: 80,
      skillsMatched: ["React", "TypeScript", "PostgreSQL"],
      skillsMissing: ["Rails"],
      roleNote: "Full-stack generalist fits your profile.",
      locationNote: "Remote-first — matches your preference.",
      timelineNote: "About three weeks until the deadline.",
    },
    saved: false,
    stage: "OA Completed",
    health: "On Track",
    nextEvent: { label: "Awaiting OA result", date: "2026-06-23", kind: "Result" },
    notes: "Completed take-home OA. Solid solution; awaiting reviewer feedback.",
    resumeUsed: "Avery_Rivera_Fullstack_v2.pdf",
    applicationLink: "https://wellfound.com/jobs/fullstack-engineer",
    timeline: [
      { label: "Applied", date: "2026-06-08", done: true },
      { label: "OA assigned", date: "2026-06-14", done: true },
      { label: "OA submitted", date: "2026-06-17", done: true },
      { label: "Result expected", date: "2026-06-23", done: false },
    ],
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
    recommendation: "Trending",
    source: "YC Jobs",
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
    matchDetail: {
      skills: 88,
      role: 84,
      location: 80,
      timeline: 90,
      skillsMatched: ["Python", "PostgreSQL", "React"],
      skillsMissing: ["LangChain"],
      roleNote: "Founding backend role fits your ambitions.",
      locationNote: "SF — your top location preference.",
      timelineNote: "Immediate start; deadline in 10 days.",
    },
    saved: true,
    stage: "Interview Completed",
    health: "Action Needed",
    nextEvent: { label: "Founder decision", date: "2026-06-27", kind: "Result" },
    notes: "Strong vibe with founders. Send a thank-you note and the side-project repo link.",
    resumeUsed: "Avery_Rivera_Backend_v2.pdf",
    applicationLink: "https://ycombinator.com/jobs/w27-swe",
    timeline: [
      { label: "Applied", date: "2026-06-10", done: true },
      { label: "Founder call", date: "2026-06-15", done: true },
      { label: "Technical interview", date: "2026-06-17", done: true },
      { label: "Decision", date: "2026-06-27", done: false },
    ],
    interviewDetails: "Completed 2 founder interviews + a live pairing session. Awaiting final decision.",
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
    source: "Microsoft Careers",
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
    matchDetail: {
      skills: 72,
      role: 76,
      location: 100,
      timeline: 82,
      skillsMatched: ["AWS", "PostgreSQL"],
      skillsMissing: ["C#", "Azure", "Kubernetes"],
      roleNote: "Backend infra internship is adjacent to your focus.",
      locationNote: "Remote — matches your preference.",
      timelineNote: "Almost a month until the deadline.",
    },
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
    recommendation: "Trending",
    source: "Unstop",
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
    matchDetail: {
      skills: 80,
      role: 74,
      location: 100,
      timeline: 78,
      skillsMatched: ["DSA", "Python"],
      skillsMissing: ["C++"],
      roleNote: "Competitive programming fits your SWE profile.",
      locationNote: "Remote — perfect fit.",
      timelineNote: "Round 1 closes in 4 days.",
    },
    saved: false,
    stage: "Offer",
    health: "On Track",
    nextEvent: { label: "Accept offer by", date: "2026-07-01", kind: "Result" },
    notes: "Won regional round — offer includes cash prize + fast-track interviews. Decide by Jul 1.",
    resumeUsed: "Avery_Rivera_SWE_Infra_v3.pdf",
    applicationLink: "https://unstop.com/competitions/coding-championship",
    timeline: [
      { label: "Registered", date: "2026-06-02", done: true },
      { label: "Round 1", date: "2026-06-09", done: true },
      { label: "Regional final", date: "2026-06-15", done: true },
      { label: "Offer received", date: "2026-06-18", done: true },
    ],
  },
]

export type CalendarEvent = {
  id: string
  date: string // YYYY-MM-DD
  title: string
  org: string
  kind: "Deadline" | "OA" | "Interview" | "Result"
  time?: string
  note?: string
}

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-06-20", title: "AI Builders Hackathon deadline", org: "Vercel", kind: "Deadline", time: "11:59 PM", note: "Submit project repo and demo video before registration closes." },
  { id: "e2", date: "2026-06-22", title: "Unstop Championship round 1", org: "Unstop", kind: "Deadline", time: "6:00 PM", note: "Complete 4 algorithmic problems in 2 hours." },
  { id: "e3", date: "2026-06-24", title: "Online assessment", org: "Microsoft", kind: "OA", time: "Anytime before 9 PM", note: "ML fundamentals + coding section. 90 minutes." },
  { id: "e4", date: "2026-06-25", title: "Stripe application due", org: "Stripe", kind: "Deadline", time: "11:59 PM", note: "Tailor cover letter to the design-systems team." },
  { id: "e5", date: "2026-06-26", title: "Onsite interview", org: "Google", kind: "Interview", time: "9:00 AM PT", note: "4 virtual rounds with the Core Infra team." },
  { id: "e6", date: "2026-06-28", title: "Phone screen", org: "YC Jobs", kind: "Interview", time: "2:30 PM PT", note: "30-min founder call." },
  { id: "e7", date: "2026-06-28", title: "YC W27 application due", org: "YC Jobs", kind: "Deadline", time: "11:59 PM" },
  { id: "e8", date: "2026-06-30", title: "Coding assessment", org: "Wellfound", kind: "OA", time: "Anytime", note: "Take-home full-stack task." },
  { id: "e9", date: "2026-07-01", title: "Offer decision", org: "Unstop", kind: "Result", note: "Accept or decline championship offer." },
  { id: "e10", date: "2026-07-02", title: "Google application due", org: "Google", kind: "Deadline", time: "11:59 PM" },
  { id: "e11", date: "2026-07-05", title: "Wellfound application due", org: "Wellfound", kind: "Deadline", time: "11:59 PM" },
  { id: "e12", date: "2026-07-08", title: "Final round", org: "Amazon", kind: "Interview", time: "10:00 AM PT", note: "5-round loop incl. system design + LP behavioral." },
  { id: "e13", date: "2026-07-10", title: "Hackathon results", org: "Devfolio", kind: "Result" },
  { id: "e14", date: "2026-07-15", title: "Microsoft application due", org: "Microsoft", kind: "Deadline", time: "11:59 PM" },
]

export type Source = {
  id: string
  name: string
  logo: string
  category: string
  status: "Connected" | "Paused"
  enabled: boolean
  found: number
  newToday: number
  lastScan: string
  cadence: string
  health: "Healthy" | "Degraded"
  url: string
}

export const sources: Source[] = [
  { id: "s1", name: "Google Careers", logo: "G", category: "Company", status: "Connected", enabled: true, found: 142, newToday: 6, lastScan: "2h ago", cadence: "Every 6 hours", health: "Healthy", url: "careers.google.com" },
  { id: "s2", name: "Microsoft Careers", logo: "M", category: "Company", status: "Connected", enabled: true, found: 98, newToday: 4, lastScan: "2h ago", cadence: "Every 6 hours", health: "Healthy", url: "careers.microsoft.com" },
  { id: "s3", name: "Amazon Careers", logo: "A", category: "Company", status: "Connected", enabled: true, found: 211, newToday: 11, lastScan: "5h ago", cadence: "Daily", health: "Degraded", url: "amazon.jobs" },
  { id: "s4", name: "Wellfound", logo: "W", category: "Aggregator", status: "Connected", enabled: true, found: 87, newToday: 5, lastScan: "1h ago", cadence: "Every 12 hours", health: "Healthy", url: "wellfound.com" },
  { id: "s5", name: "YC Jobs", logo: "Y", category: "Aggregator", status: "Connected", enabled: true, found: 64, newToday: 3, lastScan: "3h ago", cadence: "Daily", health: "Healthy", url: "ycombinator.com/jobs" },
  { id: "s6", name: "Devfolio", logo: "D", category: "Hackathons", status: "Connected", enabled: true, found: 41, newToday: 2, lastScan: "4h ago", cadence: "Daily", health: "Healthy", url: "devfolio.co" },
  { id: "s7", name: "Unstop", logo: "U", category: "Competitions", status: "Paused", enabled: false, found: 33, newToday: 0, lastScan: "2d ago", cadence: "Paused", health: "Healthy", url: "unstop.com" },
]

export type ScanActivity = {
  id: string
  source: string
  logo: string
  found: number
  time: string
  status: "success" | "warning"
}

export const recentScans: ScanActivity[] = [
  { id: "sc1", source: "Wellfound", logo: "W", found: 5, time: "1h ago", status: "success" },
  { id: "sc2", source: "Google Careers", logo: "G", found: 6, time: "2h ago", status: "success" },
  { id: "sc3", source: "Microsoft Careers", logo: "M", found: 4, time: "2h ago", status: "success" },
  { id: "sc4", source: "YC Jobs", logo: "Y", found: 3, time: "3h ago", status: "success" },
  { id: "sc5", source: "Devfolio", logo: "D", found: 2, time: "4h ago", status: "success" },
  { id: "sc6", source: "Amazon Careers", logo: "A", found: 11, time: "5h ago", status: "warning" },
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

export type Notification = {
  id: string
  title: string
  detail: string
  org: string
  logo: string
  time: string
  kind: "match" | "deadline" | "stage" | "scan"
  unread: boolean
}

export const notifications: Notification[] = [
  { id: "n1", title: "New 94% match", detail: "Software Engineer, New Grad at Google", org: "Google", logo: "G", time: "2h ago", kind: "match", unread: true },
  { id: "n2", title: "Deadline tomorrow", detail: "AI Builders Hackathon registration closes", org: "Vercel", logo: "V", time: "3h ago", kind: "deadline", unread: true },
  { id: "n3", title: "Interview scheduled", detail: "Onsite with Google Core Infra on Jun 26", org: "Google", logo: "G", time: "5h ago", kind: "stage", unread: true },
  { id: "n4", title: "Action needed", detail: "Stripe application due in 7 days", org: "Stripe", logo: "S", time: "6h ago", kind: "deadline", unread: false },
  { id: "n5", title: "Scan complete", detail: "Wellfound found 5 new opportunities", org: "Wellfound", logo: "W", time: "1h ago", kind: "scan", unread: false },
  { id: "n6", title: "Offer received", detail: "Unstop Coding Championship — respond by Jul 1", org: "Unstop", logo: "U", time: "1d ago", kind: "stage", unread: false },
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

export const discoverySummary = {
  today: 18,
  week: 86,
  bySource: [
    { source: "Amazon Careers", logo: "A", count: 11 },
    { source: "Google Careers", logo: "G", count: 6 },
    { source: "Wellfound", logo: "W", count: 5 },
    { source: "Microsoft Careers", logo: "M", count: 4 },
    { source: "YC Jobs", logo: "Y", count: 3 },
  ],
}

export const skills = ["TypeScript", "React", "Next.js", "Go", "Python", "PostgreSQL", "AWS", "Distributed Systems"]
export const preferredRoles = ["Software Engineer", "Frontend Engineer", "Backend Engineer"]
export const preferredLocations = ["San Francisco, CA", "Remote", "Seattle, WA"]

export const profile = {
  name: "Avery Rivera",
  email: "avery@radar.dev",
  headline: "New-grad software engineer • infra & full-stack",
  initials: "AR",
}

export const notificationPrefs = [
  { id: "np1", label: "New high matches", detail: "Notify when a 90%+ match is found", enabled: true },
  { id: "np2", label: "Deadline reminders", detail: "Alert 3 days and 1 day before deadlines", enabled: true },
  { id: "np3", label: "Stage changes", detail: "When an application moves stage", enabled: true },
  { id: "np4", label: "Source scan summaries", detail: "Daily digest of new discoveries", enabled: false },
  { id: "np5", label: "Weekly report", detail: "Monday recap of pipeline activity", enabled: true },
]

export const matchingPrefs = {
  minMatch: 75,
  prioritizeRemote: true,
  prioritizeNewGrad: true,
  includeEquityRoles: true,
}

export const discoveryPrefs = {
  interests: ["Job", "Internship", "Hackathon", "Competition"] as OpportunityType[],
  cadence: "Every 6 hours",
  autoSaveHighMatches: true,
}
