"use client";
import Prisma from "@prisma/client";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

interface RevenueChartProps {
  chartData: Prisma.RevenueMetrics;
}

export default function RevenueChart({ chartData }: RevenueChartProps) {
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
          data: [
            chartData.subscription,
            chartData.adsRevenue,
            chartData.merchandising,
            chartData.tickets,
          ],
          backgroundColor: ["#9333ea", "#f5d0fe", "#a5b4fc", "#6366f1"],
        },
      ],
    };

    const topSongChart = new Chart(canvas, {
      type: "doughnut",
      data: data,
      options: {
        maintainAspectRatio: false,
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
  }, [
    chartData.adsRevenue,
    chartData.merchandising,
    chartData.subscription,
    chartData.tickets,
  ]);

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
