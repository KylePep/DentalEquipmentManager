import { api, type Equipment } from "@/lib/api";
import { EquipmentList } from "@/components/EquipmentList";

async function loadEquipment(): Promise<{ equipment: Equipment[]; error: string | null }> {
  try {
    return { equipment: await api.listEquipment(), error: null };
  } catch {
    return { equipment: [], error: "Could not reach the API. Is it running on port 5080?" };
  }
}

export default async function Home() {
  const { equipment, error } = await loadEquipment();

  return (
    <>
      <header className="p-4 text-center bg-stone-800 text-white">
        <h1>Dental Equipment Manager</h1>
      </header>
      <main className="h-full flex flex-col items-center justify-center gap-4 p-4 bg-stone-900">

        <p>Frontend (Next.js) talking to the backend (.NET API).</p>

        <h2>Equipment</h2>
        {error ? <p role="alert">{error}</p> : <EquipmentList equipment={equipment} />}
      </main>
      <footer className="p-4 text-center bg-stone-800 text-white">
        <p>&copy; 2023 Dental Equipment Manager. All rights reserved.</p>
      </footer>
    </>
  );
}
