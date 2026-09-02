"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: Route; label: string; className: string };

export function NavLink({ href, label, className }: NavItem) {
  const pathname = usePathname();

  return (
    <Link href={href} className={`text-stone-300 hover:text-stone-100 px-2 rounded-xs text-center border-b-2 duration-300 ${className} ${pathname === href ? 'rounded bg-stone-700' : ""}`}>
      {label}
    </Link>
  )
}