"use client";

import {
  CalendarDays,
  PhilippinePeso,
  Activity,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area";

export default function DashboardPage() {
  const todayBookings = [
    { id: 1, name: "John Doe", court: "Court 1", time: "9:00 – 10:00 AM", status: "Booked" },
    { id: 2, name: "Jane Smith", court: "Court 2", time: "10:30 – 11:30 AM", status: "Booked" },
    { id: 3, name: "Court 3", court: "Court 3", time: "12:00 – 1:00 PM", status: "Available" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pickleball Admin Dashboard</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Overview of bookings, courts, and revenue.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4 auto-rows-fr">
        <StatCard title="Today’s Bookings" value="18" icon={<CalendarDays className="h-5 w-5" />} />
        <StatCard title="Monthly Revenue" value="₱12,450" icon={<PhilippinePeso className="h-5 w-5" />} />
        <StatCard title="Active Courts" value="3 / 4" icon={<Activity className="h-5 w-5" />} />
        <StatCard title="Unique Players" value="126" icon={<Users className="h-5 w-5" />} />
      </section>

      {/* Today's Bookings Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                Today’s Bookings
                {/* shoud be date today */}
              </h2>

              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Button size="sm"
            >
              Go to Today
            </Button>
          </div>

          {/* Booking List */}
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {todayBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </Card>
        <ChartAreaInteractive/>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function BookingItem({ booking }: { booking: any }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-zinc-50 dark:bg-zinc-800">
      <div>
        <p className="font-medium">{booking.court}</p>
        <p className="text-sm text-zinc-500">
          {booking.time} • {booking.name}
        </p>
      </div>

      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.status === "Booked"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
          }`}
      >
        {booking.status}
      </span>
    </div>
  );
}
