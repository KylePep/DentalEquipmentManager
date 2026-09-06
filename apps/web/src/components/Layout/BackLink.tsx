"use client";

import { Route } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type NavItem = { href: Route; label: string; };

export function BackLink({ href, label }: NavItem) {

  return (
    <Link
      href={href}
      title={label}
      className={`flex items-center gap-2 text-stone-300 hover:text-stone-100`}
    >
      <ArrowLeft className="size-4 shrink-0" />
      <span>{label}</span>
    </Link>
  )
}
