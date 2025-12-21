"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

type Slot = {
  courtId: string
  date: string
  startTime: string
  endTime: string
}

type Transaction = {
  id: string
  firstName: string
  lastName: string
  gcashNumber: string
  amount: number
  status: string
  paymentIntentId?: string
  reservationIds: string[]
  pendingSlots?: Slot[]
  createdAt?: {
    seconds: number
  }
}

type SummaryResponse = {
  today: { transactions: Transaction[] }
  week: { transactions: Transaction[] }
  month: { transactions: Transaction[] }
}

export default function TransactionsList() {
  const router = useRouter()

  const [range, setRange] = React.useState<"today" | "week" | "month">("today")
  const [rows, setRows] = React.useState<Transaction[]>([])
  const [search, setSearch] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const token = localStorage.getItem("admin_access")
    if (!token) return

    setLoading(true)

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard/transactions/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then((json: SummaryResponse) => {
        setRows(json[range].transactions)
      })
      .finally(() => setLoading(false))
  }, [range])

  const filteredRows = rows.filter(tx => {
    const q = search.toLowerCase()
    return (
      `${tx.firstName} ${tx.lastName}`.toLowerCase().includes(q) ||
      tx.gcashNumber.includes(q) ||
      tx.paymentIntentId?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Transactions</h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-2">
          {(["today", "week", "month"] as const).map(r => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? "default" : "outline"}
              onClick={() => setRange(r)}
            >
              {r.toUpperCase()}
            </Button>
          ))}
        </div>

        <Input
          placeholder="Search name, GCash, or payment ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="sm:max-w-sm sm:ml-auto"
        />
      </div>

      {/* Bordered Table Card */}
      <div className="rounded-xl border bg-muted/50 p-4 shadow-sm">
           <div className="rounded-xl border bg-background shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Client</TableHead>
              <TableHead>GCash</TableHead>
              <TableHead>Schedules</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount (₱)</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Loading transactions…
                </TableCell>
              </TableRow>
            ) : filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.map(tx => (
                <TableRow key={tx.id} className="hover:bg-muted/30">
                  {/* Client */}
                  <TableCell>
                    <div className="font-medium">
                      {tx.firstName} {tx.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tx.paymentIntentId}
                    </div>
                  </TableCell>

                  {/* GCash */}
                  <TableCell className="font-mono text-sm">
                    {tx.gcashNumber}
                  </TableCell>

                  {/* Schedules */}
                  <TableCell className="space-y-1 text-sm">
                    {tx.pendingSlots?.map((slot, i) => (
                      <div key={i}>
                        <span className="font-medium">{slot.date}</span>
                        : {slot.startTime} – {slot.endTime}
                        <span className="text-muted-foreground">
                          {" "}({slot.courtId})
                        </span>
                      </div>
                    ))}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === "paid"
                          ? "default"
                          : tx.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-right font-semibold">
                    ₱ {(tx.amount / 100).toFixed(2)}
                  </TableCell>

                  {/* Created */}
                  <TableCell className="text-sm text-muted-foreground">
                    {tx.createdAt?.seconds
                      ? new Date(tx.createdAt.seconds * 1000).toLocaleString()
                      : "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      </div>
     
    </div>
  )
}
