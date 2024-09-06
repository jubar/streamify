"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

// export type revenueChartData = {
//   id: number;
//   name: string;
//   url: string;
//   albumbId: number;
//   artist: string;
//   total: number;
// };

// interface RevenueChartProps {
//   chartData: topSongData[];
// }

export default function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current.getContext("2d");

    if (!canvas) {
      return;
    }

    const data = {
      labels: ["Subscription", "Ads", "Merchandise", "Tickets"],
      datasets: [
        {
          label: "Top songs",
          data: [60, 30, 7, 3],
          backgroundColor: ["#9333ea", "#f5d0fe", "#a5b4fc", "#6366f1"],
        },
      ],
    };

    const topSongChart = new Chart(canvas, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Revenue sources",
          },
        },
      },
    });

    return () => {
      topSongChart.destroy();
    };
  }, []);

  return (
    <div className="flex flex-1 m-h-[300px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
