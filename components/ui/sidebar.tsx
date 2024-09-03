import { Divider } from "@nextui-org/react";
import Image from "next/image";
import ChartIcon from "../icons/chart";
import CommunityIcon from "../icons/community";
import LibraryIcon from "../icons/library";
import MusicIcon from "../icons/music";
import SidebarLink from "./sidebar-link";
import UserPresence from "./user-presence";

export default function Sidebar() {
  const items = [
    { key: "player", label: "Home" },
    { key: "dashboard", label: "Dashboard" },
    { key: "library", label: "My Library" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div className="w-[300px] bg-gradient-to-tr from-blue-700/80 via-purple-300 to-pink-500/25 flex flex-col min-h-screen max-h-screen ">
      <Image src="/logo.png" alt="Logo streamify" width={300} height={300} />

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
