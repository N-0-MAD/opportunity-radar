"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import {
  CalendarDays,
  Compass,
  LayoutDashboard,
  LogOut,
  Radar,
  Settings,
  Layers,
  Rss,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const nav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Discover", href: "/discover", icon: Compass },
  { title: "My Opportunities", href: "/opportunities", icon: Layers },
  { title: "Calendar", href: "/calendar", icon: CalendarDays },
  { title: "Sources", href: "/sources", icon: Rss },
  { title: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const fullName = getUserFullName(user)
  const email = user?.email ?? ""
  const avatarUrl =
    typeof user?.user_metadata.avatar_url === "string"
      ? user.user_metadata.avatar_url
      : undefined
  const fallback = getInitials(fullName || email)

  async function logout() {
    const supabase = createClient()

    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-1.5 py-1">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Radar className="size-4.5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              Opportunity Radar
            </span>
            <span className="text-xs text-muted-foreground">Career intel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      render={
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-card/50 p-2">
          <Avatar className="size-8">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={fullName} /> : null}
            <AvatarFallback className="bg-muted text-xs">{fallback}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">{fullName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Logout"
            className="ml-auto"
            onClick={logout}
          >
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function getUserFullName(user: User | null) {
  const metadata = user?.user_metadata

  if (typeof metadata?.full_name === "string") return metadata.full_name
  if (typeof metadata?.name === "string") return metadata.name

  return user?.email ?? "Account"
}

function getInitials(value: string) {
  return (
    value
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  )
}
