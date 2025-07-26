import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { trackingNumber, carrierCode } = await req.json();

    const params = new URLSearchParams({ tracking_number: trackingNumber });
    if (carrierCode) params.append("carrier_code", carrierCode);

    const res = await fetch(`https://api.shipengine.com/v1/tracking?${params}`, {
      headers: {
        "API-Key": process.env.SHIPENGINE_API_KEY || "",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
