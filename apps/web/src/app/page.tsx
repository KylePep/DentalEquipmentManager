import Link from "next/dist/client/link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-black text-center">Dental Equipment Manager</h1>
      <Link href={"/dashboard"} className="bg-green-700 text-white text-center rounded font-bold hover:bg-green-900 duration-300">
        Manage Equipment
      </Link>
    </div>
  );
}
