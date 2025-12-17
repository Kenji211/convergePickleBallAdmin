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

const chartData = [
  { date: "2024-01-01", reservations: 12 },
  { date: "2024-02-01", reservations: 18 },
  { date: "2024-03-01", reservations: 25 },
  { date: "2024-04-01", reservations: 21 },
  { date: "2024-05-01", reservations: 32 },
  { date: "2024-06-01", reservations: 41 },
]

const chartConfig = {
  reservations: {
    label: "Reservations",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [range, setRange] = React.useState("6m")

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Monthly Reservations</CardTitle>
          <CardDescription>
            Total pickleball court bookings
          </CardDescription>
        </div>

        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="1m">Last month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillReservations" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-reservations)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-reservations)"
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
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              dataKey="reservations"
              type="natural"
              fill="url(#fillReservations)"
              stroke="var(--color-reservations)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
