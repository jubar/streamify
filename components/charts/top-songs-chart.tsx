"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export type topSongData = {
  id: number;
  name: string;
  url: string;
  albumbId: number;
  artist: string;
  total: number;
};

interface TopSongChartProps {
  chartData: topSongData[];
}

export default function TopSongsChart({ chartData }: TopSongChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const addEllipsis = (value: string) => {
    if (value.length > 10) {
      return value.slice(0, 10) + "...";
    }

    return value;
  };

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
        return [addEllipsis(data.name), addEllipsis(data.artist)];
      }),
      datasets: [
        {
          label: "Top songs",
          data: chartData.map((data) => data.total.toString()),
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
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
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
    <div className="flex flex-1 m-h-[300px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
