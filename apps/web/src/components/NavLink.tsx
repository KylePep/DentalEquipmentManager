"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type NavItem = { href: Route; label: string; className: string; icon?: LucideIcon; open?: boolean };

export function NavLink({ href, label, className, icon: Icon, open = true }: NavItem) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      title={label}
      className={`flex items-center gap-2 text-stone-300 hover:text-stone-100 px-2 py-1 rounded-xs border-b-2 duration-300 ${open ? "text-center" : "justify-center"} ${className} ${pathname === href ? 'rounded bg-stone-700' : ""}`}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {open && <span>{label}</span>}
    </Link>
  )
}
