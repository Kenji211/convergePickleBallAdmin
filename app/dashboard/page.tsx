"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area";
import { BookingCalendar } from "@/components/dashboard/booked-calendar";
import { TransactionList } from "@/components/dashboard/dynamicList";
import { AnimatedBackground } from "@/components/dashboard/animatedBg";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");

  return (
    <div className="p-6 space-y-6">

      {/* 🔹 Header actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Button
          size="sm"
          onClick={() =>
            setSelectedDate(
              new Date().toLocaleDateString("en-CA")
            )
          }
        >
          Go to Today
        </Button>

        {/* 🔍 Search bar */}
        <Input
          placeholder="Search by client name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      {/* 🔹 TOP ROW */}
<section
  className="
    relative
    grid grid-cols-1 lg:grid-cols-3
    rounded-xl
    overflow-hidden
    min-h-[420px]
  "
>
  {/* Animated background */}
  <AnimatedBackground />

  {/* Branding */}
  <div className="relative z-10 hidden lg:flex flex-col justify-center px-6 text-white">
    <h1 className="text-2xl font-bold">
      Pickleball Reservation Booking
    </h1>
    <p className="mt-2 text-sm opacity-90">Admin Dashboard</p>
    <p className="mt-6 text-xs opacity-70">
      by Converge IT Solutions, Inc.
    </p>
  </div>

  {/* White panel */}
  <div className="relative z-10 bg-white p-4 lg:col-span-2">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <BookingCalendar onDateSelect={setSelectedDate} />
      <TransactionList date={selectedDate} search={search} />
    </div>
  </div>
</section>



      {/* 🔹 Charts */}
      <ChartAreaInteractive />
    </div>
  );
}
