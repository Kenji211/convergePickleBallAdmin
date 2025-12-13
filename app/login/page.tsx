"use client";

import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { auth } from "../../lib/firebaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-8">
            <h1 className="text-2xl font-semibold mb-2">Converge Pickleball Admin</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
              Admin reservation system — sign in to manage courts and bookings.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@club.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="form-checkbox"
                  />
                  Remember me
                </label>
                <a className="text-primary-600 hover:underline" href="#">
                  Forgot?
                </a>
              </div>

              {error && (
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
              )}

              <div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        <Card className="hidden md:block">
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-lg font-medium mb-3">Quick overview</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
              Upcoming bookings and court availability at a glance.
            </p>

            <div className="mt-4 text-xs text-zinc-500">
              Need help? Contact support at support@convergepickleball.com
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}