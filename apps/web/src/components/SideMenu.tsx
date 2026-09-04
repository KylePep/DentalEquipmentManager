"use client"

import type { Route } from "next";
import { NavLink } from "./NavLink";
import { useState } from "react";
import { LayoutDashboard, Wrench, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { href: Route; label: string; className: string; icon: LucideIcon };

const primary: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", className: "border-yellow-600 hover:border-yellow-950", icon: LayoutDashboard },
  { href: "/equipment", label: "Equipment", className: "border-red-600 hover:border-red-950", icon: Wrench },
];

const secondary: NavItem[] = [
  { href: "/settings", label: "Settings", className: "border-stone-600 hover:border-stone-950 w-full", icon: Settings },
];

export function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`h-full flex flex-col gap-4 shrink-0 justify-end items-start bg-stone-900 transition-all duration-300 ease-in-out py-4 px-2 overflow-hidden ${open ? 'w-42' : 'w-12'}`}>
      <section className="flex flex-col gap-2 w-full">
        {primary.map((i) => <NavLink key={i.href} {...i} open={open} />)}
      </section>
      <section className="flex flex-col flex-grow gap-4 w-full items-center justify-end">
        {secondary.map((i) => <NavLink key={i.href} {...i} open={open} />)}
      </section>
      <button
        onClick={() => setOpen((open) => !open)}
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        className="bg-stone-900 w-6 h-6 rounded flex items-center justify-center shadow shadow-black/90 text-stone-300 hover:text-stone-100 mx-1"
      >
        {open ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
      </button>
    </div>
  );
}
