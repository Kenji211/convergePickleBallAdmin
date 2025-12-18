"use client";

import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
     
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      localStorage.setItem("admin_access", data.access);
      console.log("Login response:", data.access);
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-6"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT CARD */}
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-2">
            Converge Pickleball Admin
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
            Admin reservation system — sign in to manage courts and bookings.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card>

        {/* RIGHT CARD */}
        <Card className="hidden md:block p-6">
          <h2 className="text-lg font-medium mb-3">Quick overview</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
            Upcoming bookings and court availability at a glance.
          </p>

          <div className="mt-4 text-xs text-zinc-500">
            Need help? Contact support at support@convergepickleball.com
          </div>
        </Card>
      </div>
    </div>
  );
}
