import ChartTabs from "@/components/charts/chart-tabs";
import MainStats from "@/components/dashboard.tsx/main-stats";
import { StreamTable } from "@/components/dashboard.tsx/stream-table";
import TopSongs from "@/components/dashboard.tsx/top-songs";
import TopArtist from "@/components/ui/top-artist";
import { getTopFiveSongs, getUserGrowth } from "@/lib/api";
import prisma from "@/prisma/db";
import { Divider } from "@nextui-org/react";
import dynamic from "next/dynamic";

// 🧠 We are dynamically importing this component because uses chart-zoom-plugin
// and it's not SSR compatible. This way we can avoid the error in the console.
const UserGrowthChartComponent = dynamic(
  () => import("@/components/charts/user-growth-chart"),
  { ssr: false }
);

export default async function DashboardPage() {
  // This values will be cached for next requests.
  const userGrowth = await getUserGrowth();
  const topFiveSongs = await getTopFiveSongs();
  const revenueData = await prisma.revenueMetrics.findMany({
    orderBy: [
      {
        year: "asc",
      },
      { month: "asc" },
    ],
    take: 1,
  });

  return (
    <div className="flex flex-col w-full max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] lg:min-h-screen lg:max-h-screen px-8 py-4 overflow-y-auto">
      <div className="gap-6 flex flex-col xl:flex-row flex-1 w-full">
        <div className="flex flex-col flex-1">
          <h2
            role="heading"
            className="text-slate-700 font-medium text-3xl drop-shadow-sm"
          >
            Dashboard
          </h2>

          <Divider className="my-6 bg-violet-200" />

          <MainStats />

          <div className="flex flex-1 flex-col w-full mt-10">
            <div className="flex flex-1" data-testid="user-growth-chart">
              <UserGrowthChartComponent chartData={userGrowth} />
            </div>

            <div className="flex flex-1 mt-6">
              <ChartTabs
                revenueData={revenueData[0]}
                songsData={topFiveSongs}
              />
            </div>

            <StreamTable />
          </div>
        </div>

        <div className="flex flex-col max-w-full xl:max-w-[350px]">
          <div className="w-full sm:w-2/3 lg:w-3/4 xl:w-full">
            <TopArtist
              artist="La Tabare"
              song="Blues de los esclavos de ahora"
              albumCover="https://i.scdn.co/image/ab67616d0000b273c27bfe8bccec8a1f7d3b2469"
              artistAvatar="https://i.scdn.co/image/ab67616100005174ecfbc2083dada0374928ad98"
            />
          </div>

          <TopSongs />
        </div>
      </div>
    </div>
  );
}
