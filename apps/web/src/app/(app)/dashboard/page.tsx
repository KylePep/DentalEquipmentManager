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

export default async function Dashboard() {
  const { equipment, error } = await loadEquipment();

  return (
    <div className="flex flex-col gap-4 p-4">
      <section>
        <h2 className="text-lg font-bold">Create Equipment</h2>
        <p>Use the form below to create new equipment.</p>
        <CreateEquipment />
      </section>

      <section>
        <h2 className="text-lg font-bold">Equipment</h2>
        {error ? <p role="alert">{error}</p> : <EquipmentList equipment={equipment} />}
      </section>
    </div>
  );
}
