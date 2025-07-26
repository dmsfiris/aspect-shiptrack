"use client";

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

export default function TrackingResult({
  trackingNumber,
  status,
  estimatedDelivery,
  events,
}: TrackingResultProps) {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Tracking #{trackingNumber}</h2>
      <p className="mb-2">
        <span className="font-semibold">Status:</span> {status}
      </p>
      {estimatedDelivery && (
        <p className="mb-4">
          <span className="font-semibold">Estimated delivery:</span>{" "}
          {new Date(estimatedDelivery).toLocaleDateString()}
        </p>
      )}

      <div>
        <h3 className="font-semibold mb-2">Tracking history:</h3>
        <ul className="border-l-2 border-blue-500 pl-4">
          {events.map((event, idx) => (
            <li key={idx} className="mb-4">
              <div className="text-sm text-gray-500">
                {new Date(event.occurred_at).toLocaleString()}
              </div>
              <div className="font-medium">{event.description}</div>
              {event.city_locality && (
                <div className="text-gray-600 text-sm">
                  {event.city_locality}, {event.state_province}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
