# aspect-shiptrack

A **multi-carrier shipment tracking web application** built with Next.js 14, Tailwind CSS, and the ShipEngine API.  
This app allows users to enter a tracking number and see the shipment’s current status and history in a clean, modern timeline view.

---

## Features

- **Multi-carrier tracking** via ShipEngine API  
  Supports UPS, FedEx, DHL, USPS and more (auto-detected by ShipEngine).
- **Mock or Live Data Modes**  
  - **Mock Mode:** Instant demo with sample tracking data, no API key required.  
  - **Live Mode:** Real data from ShipEngine when a valid API key is provided.
- **Interactive Timeline**  
  Displays key shipment events (pickup, in transit, delivery) as a vertical timeline with icons.
- **Recent Lookups**  
  Stores up to 5 previously tracked numbers locally for quick access.
- **Responsive UI**  
  Clean and modern design built with Next.js App Router and Tailwind CSS.
- **Secure API Route**  
  All API calls are proxied through a serverless route so that your API key stays on the server.

---

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShipEngine API](https://www.shipengine.com/docs/)

---

## Modes

You can run the app in **two different modes**:

- **Mock Mode (Default for Demo)**
  - Uses pre-defined sample tracking data.
  - No API key required.
- **Live API Mode**
  - Calls the real ShipEngine API using your API key.
  - Returns real-time tracking updates from supported carriers.

Controlled by the `NEXT_PUBLIC_USE_MOCK_DATA` environment variable:

```
# .env.local
NEXT_PUBLIC_USE_MOCK_DATA=true   # Mock/demo mode
NEXT_PUBLIC_USE_MOCK_DATA=false  # Real ShipEngine API
SHIPENGINE_API_KEY=your_shipengine_api_key_here
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/aspect-shiptrack.git
cd aspect-shiptrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and edit as needed:

```bash
cp .env.local.example .env.local
```

> Do not commit `.env.local`. Only `.env.local.example` is tracked.

---

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
src/
  app/
    api/
      track/
        route.ts    # Secure ShipEngine API proxy
    page.tsx        # Home page
  components/
    TrackerForm.tsx
    TrackingResult.tsx
    RecentLookups.tsx
  lib/
    mockData.ts     # Sample data for mock mode
```

---

## Security

- The ShipEngine API key is stored **only in server-side environment variables**.
- `.env.local` is in `.gitignore` and never pushed to GitHub.
- `.env.local.example` documents the required variables for other developers.

---

## Deployment

Deploy in minutes using [Vercel](https://vercel.com/):

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Configure your environment variables (`NEXT_PUBLIC_USE_MOCK_DATA` and `SHIPENGINE_API_KEY`) in Vercel settings.
4. Deploy.

> When `NEXT_PUBLIC_USE_MOCK_DATA=false` and a valid key is set, the deployed app will use **real carrier tracking data**.

---

## Roadmap

- Display package checkpoints on an interactive map.
- Enhanced error messages for failed tracking lookups.
- Optional authentication for personal dashboards.

---

## License

This project is licensed under the MIT License.
