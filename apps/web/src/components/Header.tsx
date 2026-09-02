"use client";

import Link from "next/dist/client/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between gap-2 p-2 bg-stone-800 font-bold">
      <section className="flex gap-4">
        <Link href="/" className="text-stone-300 hover:text-stone-100 px-2 rounded-xs text-center border-b-2 duration-300 border-stone-600 hover:border-stone-950">
          Dental Equipment Manager
        </Link>
      </section>
      {pathname !== "/" && (
        <section className="text-stone-300 hover:text-stone-100 px-2 rounded-xs text-center border-b-2 duration-300 border-stone-600 hover:border-stone-950">
          <Link href={"/account"}>Account</Link>
        </section>
      )}
    </header>
  );
}