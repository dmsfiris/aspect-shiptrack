"use client";

type RecentLookupsProps = {
  items: string[];
  onSelect: (trackingNumber: string) => void;
};

export default function RecentLookups({ items, onSelect }: RecentLookupsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Recent Lookups</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((num, idx) => (
          <li key={idx}>
            <button
              onClick={() => onSelect(num)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
