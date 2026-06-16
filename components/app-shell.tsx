"use client"

import { Plus, Search } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { NotificationCenter } from "@/components/notification-center"
import { OpportunityDrawerProvider } from "@/components/opportunity-drawer"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          <div className="hidden w-full max-w-sm sm:block">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search opportunities, sources…" />
              <InputGroupAddon align="inline-end">
                <kbd className="rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  /
                </kbd>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <NotificationCenter />
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Add opportunity
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <OpportunityDrawerProvider>{children}</OpportunityDrawerProvider>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
