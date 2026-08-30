import { api, type Equipment } from "@/lib/api";
import { EquipmentList } from "@/components/EquipmentList";
import { CreateEquipment } from "@/components/CreateEquipment";

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
    <div className="p-4">

      <p>Frontend (Next.js) talking to the backend (.NET API).</p>

      <h2>Create Equipment</h2>
      <p>Use the form below to create new equipment.</p>
      <CreateEquipment />

      <h2>Equipment</h2>
      {error ? <p role="alert">{error}</p> : <EquipmentList equipment={equipment} />}
    </div>
  );
}
