import { api, type Equipment } from "@/lib/api";
import { EquipmentList } from "@/components/EquipmentList";

async function loadEquipment(): Promise<{ equipment: Equipment[]; error: string | null }> {
  try {
    return { equipment: await api.listEquipment(), error: null };
  } catch {
    return { equipment: [], error: "Could not reach the API. Is it running on port 5080?" };
  }
}

export default async function EquipmentPage() {
  const { equipment, error } = await loadEquipment();

  return (
    <div className="flex flex-col gap-4 p-4 flex-grow">
      <h1 className="text-xl font-black">Equipment List</h1>
      <section>
        <h2 className="text-lg font-bold">Equipment</h2>
        {error ? <p role="alert">{error}</p> : <EquipmentList equipment={equipment} />}
      </section>
    </div>
  )
}