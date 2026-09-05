import { EquipmentEditor } from "@/components/Equipment/EquipmentEditor";
import { Heading } from "@/components/Layout/Heading";
import { MaintenanceCalendar } from "@/components/Maintenance/MaintenanceCalendar";
import { PageWrapper } from "@/components/Layout/PageWrapper";
import { api } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MaintenanceEventCreation } from "@/components/Maintenance/MaintenanceEventCreation";

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

  return (
    <PageWrapper>
      {/* <pre>
        {JSON.stringify(equipment, null, 2)}
      </pre> */}
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
          <li className="border-b border-yellow-500"><span className="text-yellow-500">•</span> Drip pan tuning overdue</li>
          <li className="border-b border-red-500"><span className="text-red-500">•</span> Sprockets may be misaligned</li>
        </ul>
        <Heading level={3}>Events</Heading>
        <ul className="flex flex-col gap-2 mb-4">
          <li className="border-b"><span>•</span> Tune the drip pan - 3/3/26 - reoccurring - 1/month</li>
          <li className="border-b"><span>•</span> Tune the drip pan - 3/3/26 - reoccurring - 1/bi-annually(6-month)</li>
          <li className="border-b"><span>•</span> Align sprockets - 4/4/26 - reoccurring - 1/year</li>
        </ul>
        <Heading level={3}>Schedule</Heading>
        <MaintenanceCalendar />
      </section>
    </PageWrapper>
  )
}