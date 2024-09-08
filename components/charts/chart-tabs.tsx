"use client";

import { TopSongData } from "@/lib/api";
import { Tab, Tabs } from "@nextui-org/react";
import Prisma from "@prisma/client";
import MusicIcon from "../icons/music";
import RevenueIcon from "../icons/revenue";
import RevenueChart from "./revenue-chart";
import TopSongsChart from "./top-songs-chart";

interface RevenueChartProps {
  revenueData: Prisma.RevenueMetrics;
  songsData: TopSongData[];
}

export default function ChartTabs({
  revenueData,
  songsData,
}: RevenueChartProps) {
  return (
    <div className="flex w-full flex-col bg-violet-400/30 items-center px-2 py-4 rounded-md">
      <h3 className="text-lg text-slate-700 mb-4">Metrics</h3>
      <Tabs
        aria-label="Options"
        color="secondary"
        variant="bordered"
        classNames={{
          tabList: "border-violet-400",
          tabContent: "text-violet-600",
          panel: "flex flex-1 w-full",
        }}
      >
        <Tab
          key="revenue"
          title={
            <div className="flex items-center space-x-2">
              <RevenueIcon />
              <span>Revenue</span>
            </div>
          }
        >
          <RevenueChart chartData={revenueData} />
        </Tab>
        <Tab
          key="songs"
          title={
            <div className="flex items-center space-x-2">
              <MusicIcon />
              <span>Top songs</span>
            </div>
          }
        >
          <TopSongsChart chartData={songsData} />
        </Tab>
      </Tabs>
    </div>
  );
}
