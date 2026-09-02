import type { Route } from "next";
import { NavLink } from "./NavLink";

type NavItem = { href: Route; label: string; className: string };

const primary: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", className: "border-yellow-600 hover:border-yellow-950" },
  { href: "/equipment", label: "Equipment", className: "border-red-600 hover:border-red-950" },
];

const secondary: NavItem[] = [
  { href: "/settings", label: "Settings", className: "border-stone-600 hover:border-stone-950" },
];

export function SideMenu() {
  return (
    <div className="h-full flex flex-col justify-between bg-stone-900 w-32 py-4 px-2">
      <section className="flex flex-col gap-2">
        {primary.map((i) => <NavLink key={i.href} {...i} />)}
      </section>
      <section className="flex flex-col">
        {secondary.map((i) => <NavLink key={i.href} {...i} />)}
      </section>
    </div>
  );
}
