export const mockTrackingData = {
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
