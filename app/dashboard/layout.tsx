"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="sticky top-0 z-20 flex items-center gap-2 border-b bg-background px-4 py-3 md:hidden">
            <SidebarTrigger />  
            <span className="text-sm font-semibold">Pickleball Admin</span>
          </div>
          <div className="">
            <div className="w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
