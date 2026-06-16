import Link from "next/link"
import { ArrowRight, CheckCircle2, Circle, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { profileChecklist } from "@/lib/mock-data"

export function ProfileCompleteness() {
  const total = profileChecklist.length
  const done = profileChecklist.filter((i) => i.complete).length
  const pct = Math.round((done / total) * 100)
  const missing = profileChecklist.filter((i) => !i.complete)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="size-4 text-muted-foreground" />
          Profile strength
        </CardTitle>
        <CardDescription>
          A complete profile sharpens your match scores
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            render={
              <Link href="/settings">
                Complete
                <ArrowRight data-icon="inline-end" />
              </Link>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold tabular-nums">{pct}%</span>
            <span className="text-xs text-muted-foreground">
              {done} of {total} complete
            </span>
          </div>
          <Progress value={pct} />
        </div>

        <div className="flex flex-col gap-1">
          {missing.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="size-4" />
              Your profile is fully complete.
            </div>
          ) : (
            missing.map((item) => (
              <Link
                key={item.id}
                href="/settings"
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <Circle className="size-3.5 shrink-0" />
                Add {item.label.toLowerCase()}
                <ArrowRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
