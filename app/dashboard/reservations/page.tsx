"use client";

import { CalendarDays, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReservationPage() {
  const reservations = [
    { id: 1, name: "John Doe", court: "Court 1", time: "10:00 AM", status: "Confirmed" },
    { id: 2, name: "Jane Smith", court: "Court 2", time: "11:30 AM", status: "Pending" },
    { id: 3, name: "Alice Johnson", court: "Court 3", time: "1:00 PM", status: "Cancelled" },
    { id: 4, name: "Bob Lee", court: "Court 1", time: "2:30 PM", status: "Confirmed" },
    { id: 5, name: "Charlie Brown", court: "Court 2", time: "3:00 PM", status: "Pending" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pickleball Reservations</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Overview of court reservations
        </p>
      </header>

      {/* Reservation Stats */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4 auto-rows-fr">
        <StatCard
          title="Total Reservations"
          value={reservations.length.toString()}
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <StatCard
          title="Confirmed"
          value={reservations.filter(r => r.status === "Confirmed").length.toString()}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Pending"
          value={reservations.filter(r => r.status === "Pending").length.toString()}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          title="Cancelled"
          value={reservations.filter(r => r.status === "Cancelled").length.toString()}
          icon={<Users className="h-5 w-5" />}
        />
      </section>

      {/* Reservation List */}
      <section className="grid grid-cols-1 gap-3">
        {reservations.map(reservation => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

// Compact ReservationCard, similar to CourtCard
function ReservationCard({ reservation }: { reservation: { id: number; name: string; court: string; time: string; status: string } }) {
  return (
    <Card className="hover:shadow-lg transition gap-1 py-2">
      <CardHeader className="flex items-center justify-between pb-1">
        <div>
          <CardTitle className="text-sm">{reservation.name}</CardTitle>
          <CardDescription className="text-xs">
            {reservation.court} • {reservation.time}
          </CardDescription>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${reservation.status === "Confirmed"
              ? "bg-green-100 text-green-800"
              : reservation.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
        >
          {reservation.status}
        </span>
      </CardHeader>
      <CardContent className="flex justify-end py-1">
        <Button size="sm">View Details</Button>
      </CardContent>
    </Card>
  );
}
