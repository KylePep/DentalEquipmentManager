import { api, type Equipment } from "@/lib/api";
import { Heading } from "@/components/Heading";
import { EquipmentList } from "@/components/EquipmentList";
import { PageWrapper } from "@/components/PageWrapper";
import { EquipmentCreation } from "@/components/EquipmentCreation";

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
      <Heading level={1}>Equipment</Heading>
      <section>
        <Heading level={2}>Create Equipment</Heading>
        <p>Use the form below to create new equipment.</p>
        <EquipmentCreation />
      </section>

      <section>
        <Heading level={2}>Equipment</Heading>
        {error ? <p role="alert">{error}</p> : <EquipmentList equipment={equipment} />}
      </section>
    </PageWrapper>
  )
}