"use client"

import * as React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        {/* MAIN CONTENT */}
        <main className="flex flex-1 flex-col">
          {/* Mobile Header */}
          {/* <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 md:hidden">
            <SidebarTrigger />
            <span className="text-sm font-semibold">Pickleball Admin</span>
          </header> */}

          {/* Page Content */}
          <div className="flex flex-1 justify-center">
            <div className="w-full max-w-7xl p-4 md:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
