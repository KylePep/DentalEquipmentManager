import Link from "next/dist/client/link";

export function Header() {
  return (
    <header className="flex gap-2 p-2 bg-stone-800 font-bold">
      <Link href="/">Home</Link>
      <h1>Dental Equipment Manager</h1>
    </header>
  );
}