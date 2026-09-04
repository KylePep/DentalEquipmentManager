import { Heading } from "@/components/Heading";
import { MaintenanceCalendar } from "@/components/MaintenanceCalendar";
import { PageWrapper } from "@/components/PageWrapper";
import Image from "next/image";

export default function equipmentDetailPage() {
  return (
    <PageWrapper>
      <Heading level={1}>Equipment</Heading>

      <section>
        <Heading level={2}>Details</Heading>
        <p>Name: Dental Chair</p>
        <p>Manufacturer: DenistsRS</p>
        <Image
          className="w-1/2 rounded-lg border-4 border-stone-700 shadow shadow-stone-900"
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
        <ul className="flex flex-col gap-2">
          <li className="border-b-2 border-yellow-500"><span className="text-yellow-500">•</span> Drip pan tuning overdue</li>
          <li className="border-b-2 border-red-500"><span className="text-red-500">•</span> Sprockets may be misaligned</li>
        </ul>
        <Heading level={3}>Events</Heading>
        <ul>
          <li>Tune the drip pan - 3/3/26 - reoccurring - 1/month</li>
          <li>Tune the drip pan - 3/3/26 - reoccurring - 1/bi-annually(6-month)</li>
          <li>Align sprockets - 4/4/26 - reoccurring - 1/year</li>
        </ul>
        <Heading level={3}>Schedule</Heading>
        <MaintenanceCalendar />
      </section>
    </PageWrapper>
  )
}