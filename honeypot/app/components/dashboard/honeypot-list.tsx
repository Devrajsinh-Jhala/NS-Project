// components/dashboard/honeypot-list.tsx
"use client";

import { useState, useEffect } from "react";
import { Honeypot, getAllHoneypots } from "@/lib/api-client";
import HoneypotCard from "./honeypot-card";

export default function HoneypotList() {
  const [honeypots, setHoneypots] = useState<Honeypot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHoneypots = async () => {
    try {
      setLoading(true);
      const data = await getAllHoneypots();
      setHoneypots(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load honeypots");
      console.error("Error loading honeypots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHoneypots();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button
          onClick={loadHoneypots}
          className="mt-2 bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (honeypots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No honeypots found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {honeypots.map((honeypot) => (
        <HoneypotCard
          key={honeypot.id}
          honeypot={honeypot}
          onUpdate={loadHoneypots}
        />
      ))}
    </div>
  );
}
