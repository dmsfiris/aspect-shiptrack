"use client";

import { useState, useEffect } from "react";
import TrackingResult from "./TrackingResult";
import RecentLookups from "./RecentLookups";
import { mockTrackingData } from "@/lib/mockData";

const STORAGE_KEY = "recent_trackings";
const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

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

  async function fetchTrackingData(tracking: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (useMockData) {
        // Demo mode – use mock data
        await new Promise((res) => setTimeout(res, 500));
        setResult(mockTrackingData);
        saveRecent(tracking);
        return;
      }

      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber: tracking }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(
          data.error || "Failed to fetch tracking data. Try again later."
        );
      }

      // Normalize data (same structure for both API and mock)
      setResult({
        tracking_number: data.tracking_number,
        status_description: data.status_description,
        estimated_delivery_date: data.estimated_delivery_date,
        events: (data.events || []).map((e: any) => ({
          occurred_at: e.occurred_at,
          description: e.description,
          city_locality: e.city_locality,
          state_province: e.state_province,
        })),
      });

      saveRecent(tracking);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    fetchTrackingData(trackingNumber.trim());
  }

  function handleSelectRecent(number: string) {
    setTrackingNumber(number);
    fetchTrackingData(number);
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      {useMockData && (
        <div className="mb-4 rounded bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 text-sm">
          Mock Mode Active – data is simulated, not live.
        </div>
      )}

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
