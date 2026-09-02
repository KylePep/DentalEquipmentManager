"use client";

import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between gap-2 p-2 bg-stone-800 font-bold">
      <section className="flex gap-4">
        <NavLink href={"/"} className="border-stone-600 hover:border-stone-950" label="Dental Equipment Management" />
      </section>
      {pathname !== "/" && (
        <section>
          <NavLink href={"/account"} className="border-stone-600 hover:border-stone-950" label="Account" />
        </section>
      )}
    </header>
  );
}