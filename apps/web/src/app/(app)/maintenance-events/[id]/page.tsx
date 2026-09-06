import { Heading } from "@/components/Layout/Heading";
import { PageWrapper } from "@/components/Layout/PageWrapper";
import { MaintenanceEventEditor } from "@/components/Maintenance/MaintenanceEventEditor";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function maintenanceEventPage({ params }: PageProps<'/maintenance-events/[id]'>) {
  const { id } = await params;
  const maintenanceEventId = Number(id);
  if (!Number.isInteger(maintenanceEventId)) notFound();

  let maintenanceEvent;
  try {
    maintenanceEvent = await api.getMaintenanceEvent(maintenanceEventId);
  } catch {
    return <PageWrapper><p role="alert">Could not reach the API...</p></PageWrapper>;
  }
  if (!maintenanceEvent) notFound();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const formatDateOnly = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return `${month}/${day}/${year}`;
  };

  const createdAt = maintenanceEvent.createdAt
    ? formatDateTime(maintenanceEvent.createdAt)
    : "Missing Created At";

  const startDate = maintenanceEvent.start
    ? formatDateOnly(maintenanceEvent.start)
    : "Missing Purchase Date";

  const endDate = maintenanceEvent.end
    ? formatDateOnly(maintenanceEvent.end)
    : "Missing Manufacture Date";

  return (
    <PageWrapper>
      <Heading level={1}>Maintenance Event Details</Heading>
      {/* <pre>
        {JSON.stringify(maintenanceEvent, null, 2)}
      </pre> */}

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded p-2 max-w-xl">
          <div>
            <Heading level={2}>{maintenanceEvent.title}</Heading>
            <p>Created at: {createdAt}</p>
            <p>Start: {startDate}</p>
            <p>End: {endDate}</p>
            <p>Type: {maintenanceEvent.reoccur ? "Reoccurring" : "Once"}</p>
            <p>Occurrence: {maintenanceEvent.occurrence ?? "Occurs Once"}</p>
          </div>
          <div className="md:col-span-2">
            <p>Description: {maintenanceEvent.description}</p>
          </div>
          <MaintenanceEventEditor maintenanceEvent={maintenanceEvent} />
        </div>
      </section>
    </PageWrapper>
  )
}