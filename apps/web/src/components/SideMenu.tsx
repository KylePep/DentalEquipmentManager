"use client"

import type { Route } from "next";
import { NavLink } from "./NavLink";
import { useState } from "react";

type NavItem = { href: Route; label: string; className: string };

const primary: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", className: "border-yellow-600 hover:border-yellow-950" },
  { href: "/equipment", label: "Equipment", className: "border-red-600 hover:border-red-950" },
];

const secondary: NavItem[] = [
  { href: "/settings", label: "Settings", className: "border-stone-600 hover:border-stone-950 w-full" },
];

export function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>

      <div className={`h-full flex flex-col gap-4 shrink-0 justify-end items-center bg-stone-900 transition-all duration-300 ease-in-out py-4 px-2 overflow-hidden ${open ? 'w-42' : 'w-12'}`}>
        {open && (
          <section className="flex flex-col gap-2 w-full">
            {primary.map((i) => <NavLink key={i.href} {...i} />)}
          </section>
        )}
        {open && (
          <section className="flex flex-col flex-grow gap-4 w-full items-center justify-end">
            {secondary.map((i) => <NavLink key={i.href} {...i} />)}
          </section>
        )}
        <button onClick={() => setOpen((open) => !open)} className="bg-stone-900 w-6 h-6 rounded flex items-center justify-center shadow shadow-black/90">
          {open ? "X" : "O"}
        </button>
      </div>
    </>
  );
}
