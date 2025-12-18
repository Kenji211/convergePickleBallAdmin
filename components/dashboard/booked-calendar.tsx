"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

type BookingDensity = {
  date: string
  percentage: number
}

type BookingCalendarProps = {
  onDateSelect?: (date: string | null) => void
}

export function BookingCalendar(
  { onDateSelect }: BookingCalendarProps
) {
  const [data, setData] = React.useState<BookingDensity[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  React.useEffect(() => {
    const token = localStorage.getItem("admin_access")
    if (!token) return

    fetch(`http://127.0.0.1:8000/api/admin/calendar-density/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const densityMap = React.useMemo(() => {
    return Object.fromEntries(
      data.map(d => [d.date, d.percentage])
    )
  }, [data])

  const handleSelect = (date?: Date) => {
    setSelectedDate(date)

    if (!date) {
      onDateSelect?.(null)
      return
    }

    const formatted = date.toLocaleDateString("en-CA")
    onDateSelect?.(formatted)
  }

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={handleSelect}
      className="rounded-lg border"
      components={{
        DayButton: (props) => {
          const local = props.day.date.toLocaleDateString("en-CA")
          const density = densityMap[local] ?? 0

          return (
            <GlassDay {...props} density={density} />
          )
        },
      }}
    />
  )
}

function GlassDay({
  day,
  density,
  ...props
}: {
  day: any
  density: number
}) {
  return (
    <button
      {...props}
      className="relative aspect-square w-full rounded-md overflow-hidden border"
    >
      <div
        className="absolute bottom-0 left-0 w-full bg-orange-400/70"
        style={{ height: `${density}%` }}
      />

      <span className="relative z-10 font-medium">
        {day.date.getDate()}
      </span>
    </button>
  )
}
