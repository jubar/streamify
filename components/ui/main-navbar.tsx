"use client";

import {
  Avatar,
  Divider,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChartIcon from "../icons/chart";
import CommunityIcon from "../icons/community";
import MusicIcon from "../icons/music";
import SidebarLink from "./sidebar-link";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="lg:hidden bg-gradient-to-tr from-blue-500/80 via-purple-300 to-pink-500/25 max-h-[64px]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Image
            src="/min-logo.png"
            alt="Streamify"
            width={50}
            className="hidden sm:flex mr-2"
          />
          <p className="font-bold text-xl drop-shadow-md  text-inherit">
            Streamify
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Avatar
          isBordered
          color="success"
          src="https://www.gravatar.com/avatar/51aaaebc5b833211facbe04fbd3a7a5c.jpg?s=200"
        />
      </NavbarContent>

      <NavbarMenu className="bg-gradient-to-br from-blue-500/80 via-purple-300 to-pink-500/25 opacity-95">
        <NavbarMenuItem>
          <SidebarLink icon={<MusicIcon />} label="Home" href="/" />
        </NavbarMenuItem>
        <Divider className="my-4 bg-white/30" />

        <NavbarMenuItem>
          <SidebarLink
            icon={<ChartIcon />}
            label="Dashboard"
            href="/dashboard"
          />
        </NavbarMenuItem>

        <NavbarMenuItem>
          <SidebarLink
            icon={<CommunityIcon />}
            label="Users"
            href="/dashboard/users"
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
