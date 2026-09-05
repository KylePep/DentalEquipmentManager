import { EquipmentEditor } from "@/components/Equipment/EquipmentEditor";
import { Heading } from "@/components/Layout/Heading";
import { CalendarEvent, MaintenanceCalendar } from "@/components/Maintenance/MaintenanceCalendar";
import { PageWrapper } from "@/components/Layout/PageWrapper";
import { api } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MaintenanceEventCreation } from "@/components/Maintenance/MaintenanceEventCreation";
import Link from "next/link";

export default async function EquipmentDetailPage({ params }: PageProps<'/equipment/[id]'>) {
  const { id } = await params;
  const equipmentId = Number(id);
  if (!Number.isInteger(equipmentId)) notFound();

  let equipment;
  try {
    equipment = await api.getEquipment(equipmentId);
  } catch {
    return <PageWrapper><p role="alert">Could no reach the API...</p></PageWrapper>;
  }
  if (!equipment) notFound();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const formatDateOnly = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return `${month}/${day}/${year}`;
  };

  const createdAt = equipment.createdAt
    ? formatDateTime(equipment.createdAt)
    : "Missing Created At";

  const purchasedAt = equipment.purchaseDate
    ? formatDateOnly(equipment.purchaseDate)
    : "Missing Purchase Date";

  const manufacturerDate = equipment.manufacturerDate
    ? formatDateOnly(equipment.manufacturerDate)
    : "Missing Manufacture Date";

  const calendarEvents: CalendarEvent[] = equipment.maintenanceEvents.map(
    (event) => {
      const [year, month, day] = event.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return {
        id: event.id.toString(),
        title: event.name,
        start: new Date(date),
        end: new Date(date),
      }
    });

  return (
    <PageWrapper>
      <pre>
        {JSON.stringify(equipment, null, 2)}
      </pre>
      <Heading level={1}>Equipment</Heading>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded p-2 max-w-xl">
          <div>
            <Heading level={2}>Details</Heading>
            <p>Created at: {createdAt}</p>
            <p>Name: {equipment.name}</p>
            <p>Manufacturer: {equipment.manufacturer ?? "Missing Manufacturer"}</p>
            <p>Serial Number: {equipment.serialNumber ?? "Missing Serial Number"}</p>
            <p>Purchase Date: {purchasedAt}</p>
            <p>Manufacture Date: {manufacturerDate}</p>
          </div>
          <div className="flex justify-start md:justify-end">
            <Image
              className="w-48 rounded-lg border-4 border-stone-700 shadow shadow-stone-900"
              src={"https://www.fsroson.com/wp-content/uploads/2024/08/FS06-Olive-green.jpg"}
              alt="dental chair"
              width={600}
              height={400}
            />
          </div>
          <div className="md:col-span-2">
            <p>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequuntur nisi, amet consectetur aperiam earum dolores magni nobis, ipsam nihil, reiciendis debitis perferendis vitae ad nulla soluta tenetur hic vel!</p>
          </div>
          <EquipmentEditor equipment={equipment} />
        </div>
      </section>

      <section>
        <div className="flex justify-between">
          <Heading level={2}>Maintenance</Heading>
          <MaintenanceEventCreation equipment={equipment} />
        </div>

        <Heading level={3}>Warnings</Heading>
        <ul className="flex flex-col gap-2 mb-4">
          {equipment.maintenanceEvents.map((event) => (
            <li key={event.id} className="flex flex-col border-b">
              <div>
                <span>•</span> {event.name} - {event.date} - reoccurring - 1/month
              </div>
              <div className="flex gap-2 justify-end">
                <div>
                  <Link href={`/maintenance-events/${event.id}`} className="bg-green-800 text-white py-0 px-1 rounded text-xs hover:bg-green-950 hover:cursor-pointer duration-300 ease-in-out">Select</Link>
                </div>
                <div>
                  <button className="bg-red-800 text-white py-0 px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">Dismiss</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Heading level={3}>Events</Heading>
        <ul className="flex flex-col gap-2 mb-4">
          {equipment.maintenanceEvents.map((event) => (
            <li key={event.id} className="flex flex-col border-b">
              <div>
                <span>•</span> {event.name} - {event.date} - reoccurring - 1/month
              </div>
              <div className="flex gap-2 justify-end">
                <div>
                  <Link href={`/maintenance-events/${event.id}`} className="bg-green-800 text-white py-0 px-1 rounded text-xs hover:bg-green-950 hover:cursor-pointer duration-300 ease-in-out">Select</Link>
                </div>
                <div>
                  <button className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out">Edit</button>
                </div>
                <div>
                  <button className="bg-red-800 text-white py-0 px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Heading level={3}>Schedule</Heading>
        <MaintenanceCalendar events={calendarEvents} />
      </section>
    </PageWrapper>
  )
}