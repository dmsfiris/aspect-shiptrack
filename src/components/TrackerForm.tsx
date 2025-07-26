"use client";

import { useState, useEffect } from "react";
import TrackingResult from "./TrackingResult";
import RecentLookups from "./RecentLookups";

const STORAGE_KEY = "recent_trackings";

// Temporary mock data for UI development
const mockData = {
  tracking_number: "1Z12345E0291980793",
  status_description: "In Transit",
  estimated_delivery_date: "2025-08-01T00:00:00Z",
  events: [
    {
      occurred_at: "2025-07-22T12:00:00Z",
      description: "Package arrived at regional facility",
      city_locality: "Memphis",
      state_province: "TN",
    },
    {
      occurred_at: "2025-07-20T08:30:00Z",
      description: "Package picked up",
      city_locality: "Nashville",
      state_province: "TN",
    },
  ],
};

export default function TrackerForm() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  // Load recent lookups from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  function saveRecent(number: string) {
    const updated = [number, ...recent.filter((n) => n !== number)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    await new Promise((res) => setTimeout(res, 1000)); // Simulate delay
    setResult(mockData);

    saveRecent(trackingNumber);
    setLoading(false);
  }

  function handleSelectRecent(number: string) {
    setTrackingNumber(number);
    setResult(mockData); // You can also re-fetch here if using real API
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Track
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {result && (
        <TrackingResult
          trackingNumber={result.tracking_number}
          status={result.status_description}
          estimatedDelivery={result.estimated_delivery_date}
          events={result.events}
        />
      )}

      <RecentLookups items={recent} onSelect={handleSelectRecent} />
    </div>
  );
}
