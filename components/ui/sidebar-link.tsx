"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function SidebarLink({ icon, label, href }: SidebarLinkProps) {
  const pathname = usePathname();

  const isCurrentPath = pathname === href;

  const hoverStyle =
    "hover:bg-gradient-to-t hover:from-white/20 hover:to-white/10";

  const activeStyle = "bg-gradient-to-t from-white/30 to-white/20";

  return (
    <Link
      href={href}
      className={`text-md flex flex-1 gap-2 items-center p-2 rounded-md ${
        isCurrentPath ? activeStyle : hoverStyle
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
