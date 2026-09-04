import { Heading } from "@/components/Heading";
import { PageWrapper } from "@/components/PageWrapper";
import Image from "next/image";

export default function equipmentDetailPage() {
  return (
    <PageWrapper>
      <Heading level={1}>Equipment Detail</Heading>
      <Heading level={2}>Dental chair</Heading>
      <Image
        className="w-1/2 rounded-lg border-4 border-stone-700 shadow shadow-stone-900"
        src={"https://www.fsroson.com/wp-content/uploads/2024/08/FS06-Olive-green.jpg"}
        alt="dental chair"
        width={600}
        height={400}
      />
    </PageWrapper>
  )
}