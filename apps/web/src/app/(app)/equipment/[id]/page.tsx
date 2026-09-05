import { Heading } from "@/components/Heading";
import { MaintenanceCalendar } from "@/components/MaintenanceCalendar";
import { PageWrapper } from "@/components/PageWrapper";
import { api } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  const createdAt = equipment.createdAt ? `${new Date(equipment.createdAt).getMonth() + 1}/${new Date(equipment.createdAt).getDate()}/${new Date(equipment.createdAt).getFullYear()}` : "Missing Created At";

  const purchasedAt = equipment.purchaseDate ? `${new Date(equipment.purchaseDate).getMonth() + 1}/${new Date(equipment.purchaseDate).getDate()}/${new Date(equipment.purchaseDate).getFullYear()}` : "Missing Purchase Date";

  const manufacturerDate = equipment.manufacturerDate ? `${new Date(equipment.manufacturerDate).getMonth() + 1}/${new Date(equipment.manufacturerDate).getDate()}/${new Date(equipment.manufacturerDate).getFullYear()}` : "Missing Manufacture Date";

  return (
    <PageWrapper>
      <pre>
        {JSON.stringify(equipment, null, 2)}
      </pre>
      <Heading level={1}>Equipment</Heading>

      <section>
        <Heading level={2}>Details</Heading>
        <p>Created at: {createdAt}</p>
        <p>Name: {equipment.name}</p>
        <p>Manufacturer: {equipment.manufacturer ?? "Missing Manufacturer"}</p>
        <p>Serial Number: {equipment.serialNumber ?? "Missing Serial Number"}</p>
        <p>Purchase Date: {purchasedAt}</p>
        <p>Manufacture Date: {manufacturerDate}</p>
        <Image
          className="w-48 rounded-lg border-4 border-stone-700 shadow shadow-stone-900"
          src={"https://www.fsroson.com/wp-content/uploads/2024/08/FS06-Olive-green.jpg"}
          alt="dental chair"
          width={600}
          height={400}
        />
        <p>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequuntur nisi, amet consectetur aperiam earum dolores magni nobis, ipsam nihil, reiciendis debitis perferendis vitae ad nulla soluta tenetur hic vel!</p>
      </section>

      <section>
        <Heading level={2}>Maintenance</Heading>
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