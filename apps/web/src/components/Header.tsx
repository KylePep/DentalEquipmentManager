import Link from "next/dist/client/link";

export function Header() {
  return (
    <header className="flex gap-2 p-2 bg-stone-800 font-bold">
      <Link href="/">Home</Link>
      <span>Dental Equipment Manager</span>
    </header>
  );
}