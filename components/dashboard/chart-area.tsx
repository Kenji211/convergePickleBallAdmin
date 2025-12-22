"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ChartPoint = {
  date: string
  transactions: number
  reservationMinutes: number
}

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "hsl(262 80% 60%)", // violet
  },
  reservationMinutes: {
    label: "Reservations",
    color: "hsl(25 95% 55%)", // orange
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [range, setRange] = React.useState<"1m" | "3m" | "6m">("6m")
  const [data, setData] = React.useState<ChartPoint[]>([])

  React.useEffect(() => {
    const token = localStorage.getItem("admin_access")
    if (!token) return

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/activity-chart/?range=${range}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to load chart data")
        return res.json()
      })
      .then(setData)
      .catch(console.error)
  }, [range])

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>
            Transactions vs reservation load over time
          </CardDescription>
        </div>

        <Select value={range} onValueChange={v => setRange(v as any)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="1m">Last month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data}>
            <defs>
              {/* Transactions */}
              <linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-transactions)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-transactions)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              {/* Reservations */}
              <linearGradient id="fillReservations" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-reservationMinutes)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-reservationMinutes)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            {/* 🟣 Transactions */}
            <Area
              dataKey="transactions"
              type="monotone"
              stroke="var(--color-transactions)"
              fill="url(#fillTransactions)"
            />

            {/* 🟠 Reservations (minutes) */}
            <Area
              dataKey="reservationMinutes"
              type="monotone"
              stroke="var(--color-reservationMinutes)"
              fill="url(#fillReservations)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
