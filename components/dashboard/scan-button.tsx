"use client"

import { useState } from "react"
import { Radar } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScanButton() {
  const [scanning, setScanning] = useState(false)

  function scan() {
    setScanning(true)
    toast.info("Scanning all connected sources…")
    setTimeout(() => {
      setScanning(false)
      toast.success("Scan complete", {
        description: "18 new opportunities found across 6 sources",
      })
    }, 1600)
  }

  return (
    <Button variant="outline" size="sm" onClick={scan} disabled={scanning}>
      <Radar data-icon="inline-start" className={cn(scanning && "animate-spin")} />
      {scanning ? "Scanning…" : "Scan all sources"}
    </Button>
  )
}
