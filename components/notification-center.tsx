"use client"

import { useState } from "react"
import {
  Bell,
  CalendarClock,
  CheckCheck,
  Radar,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { notifications as seed, type Notification } from "@/lib/mock-data"

const KIND_ICON = {
  match: Sparkles,
  deadline: CalendarClock,
  stage: TrendingUp,
  scan: Radar,
} as const

export function NotificationCenter() {
  const [items, setItems] = useState<Notification[]>(seed)
  const unread = items.filter((n) => n.unread).length

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function readOne(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          >
            <Bell />
            {unread > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {unread}
              </span>
            ) : null}
          </Button>
        }
      />
      <PopoverContent align="end" className="w-80 gap-0 p-0" sideOffset={8}>
        <div className="flex items-center justify-between border-b border-border/60 p-3">
          <span className="text-sm font-medium">Notifications</span>
          {unread > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={markAllRead}
            >
              <CheckCheck data-icon="inline-start" />
              Mark all read
            </Button>
          ) : null}
        </div>
        <ScrollArea className="h-80">
          <div className="flex flex-col">
            {items.map((n) => {
              const Icon = KIND_ICON[n.kind]
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => readOne(n.id)}
                  className={cn(
                    "flex items-start gap-3 border-b border-border/40 p-3 text-left transition-colors last:border-b-0 hover:bg-muted/50",
                    n.unread && "bg-primary/5",
                  )}
                >
                  <div className="relative">
                    <BrandLogo label={n.logo} className="size-9" />
                    <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-card text-muted-foreground ring-1 ring-border">
                      <Icon className="size-2.5" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex items-center gap-2 text-sm font-medium leading-tight">
                      {n.title}
                      {n.unread ? (
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      ) : null}
                    </span>
                    <span className="text-xs leading-snug text-muted-foreground">
                      {n.detail}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {n.time}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
