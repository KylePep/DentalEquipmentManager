import { api, type Equipment } from "@/lib/api";
import { EquipmentList } from "@/components/EquipmentList";
import { PageWrapper } from "@/components/PageWrapper";
import { Heading } from "@/components/Heading";
import { EquipmentCreation } from "@/components/EquipmentCreation";
import { MaintenanceCalendar } from "@/components/MaintenanceCalendar";

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
    <PageWrapper>
      <Heading level={1}>Dashboard</Heading>

      <section>
        <Heading level={2}>Scheduled Maintenance</Heading>
        <MaintenanceCalendar />
        <MaintenanceCalendar />
      </section>

      <section>
        <Heading level={2}>Equipment</Heading>
      </section>

      <section>
        <Heading level={2}>Failure Prediction</Heading>
      </section>

      <section>
        <Heading level={2}>Diagnostic</Heading>
      </section>

      <section>
        <Heading level={2}>User Manuals</Heading>
      </section>

    </PageWrapper>
  );
}
