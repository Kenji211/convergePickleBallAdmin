"use client"

import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { columns, Transaction } from "@/components/ui/columns"

export function TransactionTable({
  date,
  search,
}: {
  date: string | null
  search: string
}) {
  const [data, setData] = React.useState<Transaction[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!date) {
      setData([])
      return
    }

    const token = localStorage.getItem("admin_access")
    if (!token) return

    setLoading(true)

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions-by-reservation-date/?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [date])

  const filtered = React.useMemo(() => {
    if (!search) return data

    const q = search.toLowerCase()

    return data.filter(tx =>
      `${tx.firstName} ${tx.lastName}`
        .toLowerCase()
        .includes(q)
    )
  }, [data, search])

  if (!date) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a date to view reservations
      </p>
    )
  }

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading reservations…
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {/* <h3 className="text-sm font-semibold">
    
        {new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h3> */}

      <DataTable columns={columns} data={filtered} />
    </div>
  )
}
