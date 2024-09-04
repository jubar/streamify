import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import ChartIcon from "../icons/chart";
import CommunityIcon from "../icons/community";
import LibraryIcon from "../icons/library";
import MusicIcon from "../icons/music";
import SidebarLink from "./sidebar-link";
import UserPresence from "./user-presence";

export default function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-col min-w-[300px] max-w-[300px] w-[300px] bg-gradient-to-tr from-blue-700/80 via-purple-300 to-pink-500/25 dark:from-blue-900/80 dark:via-purple-400 dark:to-pink-700/45 min-h-screen max-h-screen relative">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo streamify"
          width={300}
          height={300}
          className="hover:animate-pulse"
        />
      </Link>

      <div className="flex flex-col flex-1 justify-between p-4">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-2">
            <SidebarLink icon={<MusicIcon />} label="Home" href="/" />
            <SidebarLink
              icon={<LibraryIcon />}
              label="My Library"
              href="/library"
            />
            <SidebarLink
              icon={<CommunityIcon />}
              label="My Community"
              href="/community"
            />

            <Divider className="my-2 bg-white/30" />
            <SidebarLink
              icon={<ChartIcon />}
              label="Dashboard"
              href="/dashboard"
            />
          </div>
        </div>

        <div>
          <Divider className="mb-5 bg-white/30" />
          <UserPresence />
        </div>
      </div>
    </div>
  );
}
