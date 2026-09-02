import { api, type Equipment } from "@/lib/api";
import { Heading } from "@/components/Heading";
import { EquipmentList } from "@/components/EquipmentList";
import { PageWrapper } from "@/components/PageWrapper";

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
    <PageWrapper>
      <Heading level={1}>Equipment List</Heading>
      <section>
        <h2 className="text-lg font-bold">Equipment</h2>
        {error ? <p role="alert">{error}</p> : <EquipmentList equipment={equipment} />}
      </section>
    </PageWrapper>
  )
}