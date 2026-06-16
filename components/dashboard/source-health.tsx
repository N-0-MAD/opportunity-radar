import Link from "next/link"
import { ArrowRight, Radar } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { sources } from "@/lib/mock-data"

export function SourceHealth() {
  const connected = sources.filter((s) => s.status === "Connected")
  const top = [...sources].sort((a, b) => b.newToday - a.newToday).slice(0, 5)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radar className="size-4 text-muted-foreground" />
          Source health
        </CardTitle>
        <CardDescription>
          {connected.length} of {sources.length} sources connected
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            render={
              <Link href="/sources">
                Manage
                <ArrowRight data-icon="inline-end" />
              </Link>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {top.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
          >
            <BrandLogo label={s.logo} className="size-8 text-xs" />
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-medium">{s.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                Last scan {s.lastScan} • {s.found} found
              </span>
            </div>
            <span
              className={cn(
                "flex items-center gap-1.5 text-xs",
                s.status === "Connected"
                  ? "text-success"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  s.status === "Connected" ? "bg-success" : "bg-muted-foreground",
                )}
              />
              {s.status === "Connected" ? "Active" : "Paused"}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
