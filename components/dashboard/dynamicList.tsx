"use client";

import * as React from "react";

type Transaction = {
  id: string;
  amountInCentavos: number;
  status: string;
  createdAt: string;
  clientName?: string;
  userName?: string;
  user?: {
    name?: string;
  };
};

export function TransactionList({
  date,
  search,
}: {
  date: string | null;
  search: string;
}) {
  const [data, setData] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!date) {
      setData([]);
      return;
    }

    const token = localStorage.getItem("admin_access");
    if (!token) return;

    setLoading(true);

    fetch(
      `http://127.0.0.1:8000/api/admin/transactions/?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  const filtered = React.useMemo(() => {
    if (!search) return data;

    const q = search.toLowerCase();

    return data.filter(tx => {
      const name =
        tx.clientName ||
        tx.userName ||
        tx.user?.name ||
        "";

      return name.toLowerCase().includes(q);
    });
  }, [data, search]);

  if (!date) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a date to view transactions
      </p>
    );
  }

  if (loading) {
    return <p>Loading transactions…</p>;
  }

  if (filtered.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No matching transactions found
      </p>
    );
  }

  return (
    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        <div>June 3, 2025</div>
      {filtered.map(tx => (
        <TransactionItem key={tx.id} tx={tx} />
      ))}
    </div>
  );
}
function TransactionItem({ tx }: { tx: Transaction }) {
  return (
    <div
   
    >
      <div>
        <p className="font-medium text-sm">
          7:30am – 10:00am
        </p>

        <p className="text-xs text-zinc-300">
          Froilan Dave E. Espinosa | 09682446524
        </p>
      </div>

      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          tx.status === "paid"
            ? "bg-green-500/20 text-green-300"
            : "bg-yellow-500/20 text-yellow-300"
        }`}
      >
        {tx.status}
      </span>
    </div>
  );
}

