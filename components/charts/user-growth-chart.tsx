"use client";
import { Switch } from "@nextui-org/react";
import Prisma from "@prisma/client";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

interface UserGrowthChartProps {
  chartData: Prisma.UserMetrics[];
}

const PREMIUM_USERS_LABEL = "Premium Users";
const BASIC_USERS_LABEL = "Basic Users";
const FREE_USERS_LABEL = "Free Users";

Chart.register(zoomPlugin);

export default function UserGrowthChart({ chartData }: UserGrowthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const [includePremiumUsers, setIncludePremiumUsers] = useState(false);
  const [includeBasicUsers, setIncludeBasicUsers] = useState(false);
  const [includeFreeUsers, setIncludeFreeUsers] = useState(false);

  const [totalUserData, setTotalUserData] = useState<number[]>([]);
  const [activeUserData, setActiveUserData] = useState<number[]>([]);
  const [premiumUsersData, setPremiumUsersData] = useState<number[]>([]);
  const [basicUserData, setBasicUserData] = useState<number[]>([]);
  const [freeUserData, setFreeUserData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  /**
   *
   * @param {string} label - Visible text for the dataset.
   * @param {number[]} data - Array of numbers that represent the values for the dataset.
   * @param {string} color - Color for the line chart.
   * @returns void
   */
  const addDataSet = (label: string, data: number[], color: string) => {
    if (!chartInstance) {
      return;
    }

    // Here we can comprobate first if the dataset already exists.
    // Since this is a demo, we wont add the validation.

    const newDataset = {
      label,
      borderColor: color,
      data,
    };

    chartInstance.data.datasets.push(newDataset);
    chartInstance.update();
  };

  /**
   * This function will remove a dataset from the chartInstance.
   * @param {string} label - Visible text of the dataset to find it.
   * @returns void
   */
  const removeDataSet = (label: string) => {
    if (!chartInstance) {
      return;
    }

    const dsIndex = chartInstance.data.datasets.findIndex(
      (ds) => ds.label === label
    );

    if (dsIndex !== -1) {
      chartInstance.data.datasets.splice(dsIndex, 1);
      chartInstance.update();
    }
  };

  const premiumUsersHandler = (value: boolean) => {
    setIncludePremiumUsers(value);

    if (value) {
      addDataSet(PREMIUM_USERS_LABEL, premiumUsersData, "#34d399");
    } else {
      removeDataSet(PREMIUM_USERS_LABEL);
    }
  };

  const basicUsersHandler = (value: boolean) => {
    setIncludeBasicUsers(value);

    if (value) {
      addDataSet(BASIC_USERS_LABEL, basicUserData, "#fcd34d");
    } else {
      removeDataSet(BASIC_USERS_LABEL);
    }
  };

  const freeUsersHandler = (value: boolean) => {
    setIncludeFreeUsers(value);

    if (value) {
      addDataSet(FREE_USERS_LABEL, freeUserData, "#78716c");
    } else {
      removeDataSet(FREE_USERS_LABEL);
    }
  };

  useEffect(() => {
    // Parse values and store them as a state variables
    const total: number[] = [];
    const active: number[] = [];
    const premium: number[] = [];
    const basic: number[] = [];
    const free: number[] = [];
    const texts: string[] = [];

    // This function assumes tht the metrics are in the correct order.
    chartData.map((metric) => {
      total.push(metric.totalUsers);
      active.push(metric.activeUsers);
      premium.push(metric.premiumUsers);
      basic.push(metric.basicUsers);
      free.push(metric.freeUsers);
      const date = dayjs(`${metric.year}-${metric.month}-01`);
      texts.push(
        `${date.format("MMM.")} ${
          metric.month === 12 ? date.format(" YY") : ""
        }`
      );
    });

    setTotalUserData(total);
    setActiveUserData(active);
    setPremiumUsersData(premium);
    setBasicUserData(basic);
    setFreeUserData(free);
    setLabels(texts);
  }, [chartData]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvasCtx = canvasRef.current.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    const data = {
      labels,
      datasets: [
        {
          label: "All Users",
          data: totalUserData,
          borderColor: "#a78bfa",
        },
        {
          label: "Active Users",
          data: activeUserData,
          borderColor: "#f472b6",
        },
      ],
    };

    let delayed = false;
    const usersChart = new Chart(canvasCtx, {
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
              delay = context.dataIndex * 100 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: "User Metrics",
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.1,
              },
              pinch: {
                enabled: true,
              },
              mode: "x",
              scaleMode: "x",
            },
            pan: {
              enabled: true,
              mode: "x",
            },
          },
        },
      },
    });

    setChartInstance(usersChart);

    return () => {
      usersChart.destroy();
    };
  }, [totalUserData, activeUserData, labels]);

  return (
    <div className="flex flex-1 flex-col">
      <h3
        role="heading"
        className="text-slate-700 font-medium text-3xl drop-shadow-sm"
      >
        User growth metrics
      </h3>
      <p className="text-slate-600 text-md mt-4 mb-6">
        The users growth chart provides a comprehensive visual representation of
        key metrics related to growth of the users in the last twelve months.
        This chart allow you to include dynamic data to understand if the growth
        is related to a specific type of user (free, basic or premium).
      </p>

      <div
        style={{
          position: "relative",
          height: "400px",
          width: "100%",
          flex: "1 0 auto",
        }}
      >
        <div className="absolute w-full h-[400px]">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6 bg-violet-400/30 p-4 rounded-md">
        <span className="text-md">Include additional data</span>

        <div className="flex flex-1 items-center gap-4">
          <Switch
            size="sm"
            color="secondary"
            isSelected={includePremiumUsers}
            onValueChange={premiumUsersHandler}
          >
            Premium Users
          </Switch>

          <Switch
            size="sm"
            color="secondary"
            isSelected={includeBasicUsers}
            onValueChange={basicUsersHandler}
          >
            Basic Users
          </Switch>

          <Switch
            size="sm"
            color="secondary"
            isSelected={includeFreeUsers}
            onValueChange={freeUsersHandler}
          >
            Free Users
          </Switch>
        </div>
      </div>
    </div>
  );
}
