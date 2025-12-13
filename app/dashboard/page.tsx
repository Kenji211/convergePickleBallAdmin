"use client";

import React from "react";
import Link from "next/link";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
  SidebarTrigger,
} from "../../components/ui/sidebar";

export default function AdminHome() {
  const stats = [
    { label: "Active Bookings", value: 12 },
    { label: "Available Courts", value: 3 },
    { label: "Members Online", value: 5 },
  ];

  const upcoming = [
    { time: "09:00", court: "Court 1", by: "Alice" },
    { time: "10:30", court: "Court 3", by: "Group B" },
    { time: "12:00", court: "Court 2", by: "Bob" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            <div className="hidden md:block">
              <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
                <SidebarContent>
                  <SidebarHeader>
                    <div className="text-sm font-semibold">Admin</div>
                  </SidebarHeader>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard">Overview</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard/bookings">Bookings</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard/courts">Courts</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard/settings">Settings</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <SidebarSeparator />
                </SidebarContent>
              </Sidebar>
            </div>

            <main>
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="md:hidden">
                    <SidebarTrigger />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold">Converge Pickleball — Admin</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">Overview of bookings, courts, and quick actions.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost">Settings</Button>
                  <Button onClick={() => (window.location.href = "/")}>Sign out</Button>
                </div>
              </header>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {stats.map((s) => (
                  <Card key={s.label}>
                    <div className="px-6 py-5">
                      <div className="text-sm text-zinc-500">{s.label}</div>
                      <div className="mt-2 text-2xl font-semibold">{s.value}</div>
                    </div>
                  </Card>
                ))}
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <div className="p-6">
                    <h2 className="text-lg font-medium mb-3">Upcoming bookings</h2>
                    <div className="space-y-3">
                      {upcoming.map((u, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">{u.time} — {u.court}</div>
                            <div className="text-xs text-zinc-500">{u.by}</div>
                          </div>
                          <div className="text-xs text-zinc-400">View</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6 flex flex-col h-full">
                    <h2 className="text-lg font-medium mb-3">Quick actions</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-1">Create booking</label>
                        <Input placeholder="Member email or name" />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button>Create</Button>
                        <Button variant="outline">Bulk import</Button>
                      </div>
                      <div className="mt-4 text-xs text-zinc-500">Need help? Contact support at support@convergepickleball.com</div>
                    </div>
                  </div>
                </Card>
              </section>

              <Card className="mt-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium mb-3">Court availability</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded">
                      <div className="text-sm">Court 1</div>
                      <div className="text-xs text-zinc-500">Next free: 11:00</div>
                    </div>
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded">
                      <div className="text-sm">Court 2</div>
                      <div className="text-xs text-zinc-500">Next free: 12:30</div>
                    </div>
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded">
                      <div className="text-sm">Court 3</div>
                      <div className="text-xs text-zinc-500">Next free: 09:45</div>
                    </div>
                  </div>
                </div>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}