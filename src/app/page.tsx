import TrackerForm from "@/components/TrackerForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Aspect ShipTrack</h1>
      <TrackerForm />
    </main>
  );
}
