"use client";

import { TopSongData } from "@/lib/api";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

interface TopSongChartProps {
  chartData: TopSongData[];
}

export default function TopSongsChart({ chartData }: TopSongChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const addEllipsis = (value: string) => {
  //   if (value.length > 10) {
  //     return value.slice(0, 10) + "...";
  //   }

  //   return value;
  // };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current.getContext("2d");

    if (!canvas) {
      return;
    }

    const data = {
      labels: chartData.map((data) => {
        return [data.name, data.artist];
      }),
      datasets: [
        {
          label: "Top songs",
          data: chartData.map((data) => data.listens.toString()),
          backgroundColor: [
            "#9333ea",
            "#d8b4fe",
            "#f5d0fe",
            "#a5b4fc",
            "#6366f1",
          ],
        },
      ],
    };

    const topSongChart = new Chart(canvas, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: false,
            text: "Top 5 songs",
          },
        },
      },
    });

    return () => {
      topSongChart.destroy();
    };
  }, [chartData]);

  return (
    <div
      style={{
        position: "relative",
        height: "300px",
        width: "100%",
        flex: "1 0 auto",
      }}
    >
      <div className="absolute w-full h-[300px]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
