# aspect-shiptrack

A **multi-carrier shipment tracking web application** built with Next.js 14, Tailwind CSS, and the ShipEngine API.  
This app allows users to enter a tracking number and see the shipment’s current status and history in a clean timeline view.

---

## Features

- **Multi-carrier tracking** via ShipEngine API (FedEx, UPS, DHL, USPS, and more)
- **Timeline of shipment events** (pickup, transit, delivery)
- **Recent lookups** stored locally (up to 5 previous tracking numbers)
- Responsive UI built with **Next.js App Router + Tailwind**
- Secure API route that keeps **API keys on the server-side**

---

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShipEngine API](https://www.shipengine.com/docs/)

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

Create a `.env.local` file in the project root:

```
SHIPENGINE_API_KEY=your_shipengine_api_key_here
```

> Do not commit `.env.local`. Only `.env.local.example` is tracked.

---

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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
    TimelineItem.tsx
  lib/
    shipengine.ts   # Helper to call ShipEngine API
```

---

## Security

- The ShipEngine API key is stored **only in server-side environment variables**.
- `.env.local` is in `.gitignore` and never pushed to GitHub.
- A `.env.local.example` file documents required variables.

---

## Deployment

Easily deploy with [Vercel](https://vercel.com/):

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add `SHIPENGINE_API_KEY` in Vercel project settings.
4. Deploy.

---

## Roadmap

- Add carrier auto-detection
- Add delivery estimates (if API provides)
- Show map for package checkpoints

---

## License

This project is licensed under the MIT License.
