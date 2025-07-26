"use client";

import { CheckCircleIcon, ClockIcon, TruckIcon } from "@heroicons/react/24/solid";

type TrackingEvent = {
  occurred_at: string;
  description: string;
  city_locality?: string;
  state_province?: string;
};

type TrackingResultProps = {
  trackingNumber: string;
  status: string;
  estimatedDelivery?: string;
  events: TrackingEvent[];
};

// Function to choose an icon based on index/status
function getIcon(index: number, isLast: boolean) {
  if (index === 0) return <TruckIcon className="w-5 h-5 text-blue-600" />; // Most recent event
  if (isLast) return <CheckCircleIcon className="w-5 h-5 text-green-600" />; // Oldest (package created)
  return <ClockIcon className="w-5 h-5 text-gray-400" />;
}

export default function TrackingResult({
  trackingNumber,
  status,
  estimatedDelivery,
  events,
}: TrackingResultProps) {
  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Tracking #{trackingNumber}</h2>
      <p className="mb-2">
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={`px-2 py-1 rounded text-white ${
            status.toLowerCase().includes("delivered")
              ? "bg-green-600"
              : "bg-blue-600"
          }`}
        >
          {status}
        </span>
      </p>
      {estimatedDelivery && (
        <p className="mb-6">
          <span className="font-semibold">Estimated delivery:</span>{" "}
          {new Date(estimatedDelivery).toLocaleDateString()}
        </p>
      )}

      <h3 className="font-semibold mb-4">Tracking history</h3>
      <div className="relative">
        <ul className="space-y-6">
          {events.map((event, idx) => (
            <li key={idx} className="relative flex gap-4 items-start">
              {/* Timeline vertical line */}
              {idx !== events.length - 1 && (
                <span className="absolute left-2 top-6 h-full w-px bg-gray-300"></span>
              )}
              {/* Icon */}
              <div className="relative z-10 mt-1">{getIcon(idx, idx === events.length - 1)}</div>

              {/* Event details */}
              <div className="flex-1">
                <div className="text-sm text-gray-500">
                  {new Date(event.occurred_at).toLocaleString()}
                </div>
                <div className="font-medium">{event.description}</div>
                {event.city_locality && (
                  <div className="text-gray-600 text-sm">
                    {event.city_locality}, {event.state_province}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
