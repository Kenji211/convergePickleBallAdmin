"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type Reservation = {
  id: string
  courtId: string
  date: string
  startTime: string
  endTime: string
  status: string
}

export type Transaction = {
  id: string
  firstName: string
  lastName: string
  gcashNumber: string
  amount: number
  status: string
  reservations: Reservation[]
}

export const columns: ColumnDef<Transaction>[] = [
  // 👤 CLIENT
  {
    id: "client",
    header: "Client",
    cell: ({ row }) => {
      const tx = row.original
      return (
        <div className="space-y-0.5">
          <p className="font-medium">
            {tx.firstName} {tx.lastName}
          </p>
          <p className="text-xs text-muted-foreground">
            {tx.gcashNumber}
          </p>
        </div>
      )
    },
  },

  // 🕒 RESERVATION TIME(S)
  {
    id: "time",
    header: "Reservation",
    cell: ({ row }) => {
      const reservations = row.original.reservations

      return (
        <div className="space-y-1 text-sm">
          {reservations.map(r => (
            <div key={r.id} className="flex gap-2">
              <span className="font-medium">
                {r.startTime} – {r.endTime}
              </span>
              <span className="text-muted-foreground">
                ({r.courtId})
              </span>
            </div>
          ))}
        </div>
      )
    },
  },

  // 💰 AMOUNT
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium">
        ₱{(row.getValue<number>("amount") / 100).toFixed(2)}
      </div>
    ),
  },

  // // 🟢 STATUS
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status = row.getValue<string>("status")

  //     return (
  //       <span
  //         className={cn(
  //           "rounded-full px-3 py-1 text-xs font-semibold capitalize",
  //           status === "paid"
  //             ? "bg-green-500/15 text-green-400"
  //             : "bg-yellow-500/15 text-yellow-400"
  //         )}
  //       >
  //         {status}
  //       </span>
  //     )
  //   },
  // },
]
