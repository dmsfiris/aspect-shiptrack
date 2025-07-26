"use client";

type RecentLookupsProps = {
  items: string[];
  onSelect: (trackingNumber: string) => void;
};

export default function RecentLookups({ items, onSelect }: RecentLookupsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">Recent Lookups</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((num) => (
          <button
            key={num}
            onClick={() => onSelect(num)}
            className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm shadow-sm transition"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
