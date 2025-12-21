"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area";
import { BookingCalendar } from "@/components/dashboard/booked-calendar";
import { TransactionTable } from "@/components/dashboard/dynamicList";
import {useRouter} from "next/navigation";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  return (
    <div className="p-1 space-y-6">

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

        <Button className="nig ml-auto" size="sm" variant="outline" onClick={() => router.push("/transactions")}>
          Transactions
        </Button>
      </div>

      {/* 🔹 TOP ROW */}
<section
 
>

  {/* Branding */}
  {/* <div className="relative z-10 hidden lg:flex flex-col justify-center px-6 text-white">
    <h1 className="text-2xl font-bold">
      Pickleball Reservation Booking
    </h1>
    <p className="mt-2 text-sm opacity-90">Admin Dashboard</p>
    <p className="mt-6 text-xs opacity-70">
      by Converge IT Solutions, Inc.
    </p>
  </div> */}

  {/* White panel */}
  {/* <div className="relative z-10 p-4 lg:col-span-2">
    <div className="grid grid-cols-2 lg:grid-cols-2">
      <BookingCalendar onDateSelect={setSelectedDate} />
      <TransactionTable date={selectedDate} search={search} />
    </div>
  </div> */}
</section>
<section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
  {/* Calendar Card */}
  <div className="rounded-xl border bg-card p-4">
    <h3 className="mb-3 text-sm font-semibold">
      Booking Density
    </h3>

    <BookingCalendar onDateSelect={setSelectedDate} />
  </div>

  {/* Transactions Card */}
  <div className="lg:col-span-2 rounded-xl border bg-card p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold">
        Reservations
      </h3>

      {selectedDate && (
        <span className="text-xs text-muted-foreground">
          {new Date(selectedDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      )}
    </div>

    <div className="max-h-[360px] overflow-auto">
      <TransactionTable
        date={selectedDate}
        search={search}
      />
    </div>
  </div>
</section>
      {/* 🔹 Charts */}
      <ChartAreaInteractive />
    </div>
  );
}
