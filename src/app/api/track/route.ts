import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { trackingNumber, carrierCode } = await req.json();

    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number is required" }, { status: 400 });
    }

    const params = new URLSearchParams({
      tracking_number: trackingNumber,
      carrier_code: carrierCode || "auto",
    });

    const apiKey = process.env.SHIPENGINE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server is missing SHIPENGINE_API_KEY" }, { status: 500 });
    }

    const res = await fetch(`https://api.shipengine.com/v1/tracking?${params}`, {
      headers: {
        "API-Key": apiKey,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Tracking API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
