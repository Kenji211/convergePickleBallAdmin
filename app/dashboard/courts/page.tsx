"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourtsDashboard() {
    const courts = [
        { id: 1, name: "Court 1", status: "Available", currentBooking: "10:00 AM - 11:00 AM" },
        { id: 2, name: "Court 2", status: "Occupied", currentBooking: "11:30 AM - 12:30 PM" },
        { id: 3, name: "Court 3", status: "Available", currentBooking: "-" },
        { id: 4, name: "Court 4", status: "Maintenance", currentBooking: "-" },
    ];

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Courts Dashboard</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Overview of court availability and bookings
                </p>
            </header>

            {/* Court Stats */}
            <section className="grid gap-4 grid-cols-2 lg:grid-cols-4 auto-rows-fr">
                <StatCard title="Total Courts" value={courts.length.toString()} icon={<Activity className="h-5 w-5" />} />
                <StatCard title="Available" value={courts.filter(c => c.status === "Available").length.toString()} icon={<CheckCircle className="h-5 w-5 text-green-600" />} />
                <StatCard title="Occupied" value={courts.filter(c => c.status === "Occupied").length.toString()} icon={<Clock className="h-5 w-5 text-yellow-600" />} />
                <StatCard title="Maintenance" value={courts.filter(c => c.status === "Maintenance").length.toString()} icon={<XCircle className="h-5 w-5 text-red-600" />} />
            </section>

            {/* Court List */}
            <section className="grid grid-cols-1 gap-3">
                {courts.map(court => (
                    <CourtCard key={court.id} court={court} />
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

// New compact CourtCard
function CourtCard({ court }: { court: { id: number; name: string; status: string; currentBooking: string } }) {
    return (
        <Card className="hover:shadow-lg transition gap-1 py-2">
            <CardHeader className="flex items-center justify-between pb-1">
                <div>
                    <CardTitle className="text-sm">{court.name}</CardTitle>
                    <CardDescription className="text-xs">
                        {court.currentBooking !== "-" ? court.currentBooking : "No current booking"}
                    </CardDescription>
                </div>
                <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${court.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : court.status === "Occupied"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                >
                    {court.status}
                </span>
            </CardHeader>
            <CardContent className="flex justify-end py-1">
                <Button size="sm">View Schedule</Button>
            </CardContent>
        </Card>
    );
}
