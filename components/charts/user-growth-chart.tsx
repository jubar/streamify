"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export type UserGrowthChartData = {
  allUsers: number[];
  activeUsers: number[];
};

interface UserGrowthChartProps {
  chartData: UserGrowthChartData;
}

export default function UserGrowthChart({ chartData }: UserGrowthChartProps) {
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
      labels: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec.",
      ],
      datasets: [
        {
          label: "All Users",
          data: chartData.allUsers,
          borderColor: "#a78bfa",
        },
        {
          label: "Active Users",
          data: chartData.activeUsers,
          borderColor: "#f472b6",
        },
      ],
    };

    let delayed = false;
    const userChart = new Chart(canvas, {
      type: "line",
      data: data,
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 250 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Users Growth",
          },
        },
      },
    });

    return () => {
      userChart.destroy();
    };
  }, []);

  return (
    <div className="flex flex-1">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

// Total de usuarios vs usarios activos por mes
