"use client";
import { Switch } from "@nextui-org/react";
import Prisma from "@prisma/client";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

export type UserGrowthChartData = {
  userMetrics: Prisma.UserMetrics[];
};

interface UserGrowthChartProps {
  chartData: UserGrowthChartData;
}

const PREMIUM_USERS_LABEL = "Premium Users";
const BASIC_USERS_LABEL = "Basic Users";
const FREE_USERS_LABEL = "Free Users";

export default function UserGrowthChart({ chartData }: UserGrowthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [includePremiumUsers, setIncludePremiumUsers] = useState(false);
  const [includeBasicUsers, setIncludeBasicUsers] = useState(false);
  const [includeFreeUsers, setIncludeFreeUsers] = useState(false);

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
      (ds) => ds.label === PREMIUM_USERS_LABEL
    );

    if (dsIndex !== -1) {
      chartInstance.data.datasets.splice(dsIndex, 1);
      chartInstance.update();
    }
  };

  const premiumUsersHandler = (value: boolean) => {
    setIncludePremiumUsers(value);

    if (!chartInstance) {
      return;
    }

    if (value) {
      const sampleData = [2, 4, 6, 8, 10, 12, 14, 7, 18, 29, 16, 24];
      addDataSet(PREMIUM_USERS_LABEL, sampleData, "#34d399");
    } else {
      // remove the dataSet from the chartInstance
      removeDataSet(PREMIUM_USERS_LABEL);
    }
  };

  const basicUsersHandler = (value: boolean) => {
    setIncludeBasicUsers(value);

    if (!chartInstance) {
      return;
    }

    if (value) {
      const sampleData = [6, 8, 16, 21, 25, 28, 34, 25, 20, 29, 36, 40];
      addDataSet(BASIC_USERS_LABEL, sampleData, "#fcd34d");
    } else {
      removeDataSet(BASIC_USERS_LABEL);
    }
  };

  const freeUsersHandler = (value: boolean) => {
    setIncludeFreeUsers(value);

    if (!chartInstance) {
      return;
    }

    if (value) {
      const sampleData = [6, 8, 9, 17, 35, 48, 44, 55, 48, 59, 66, 70];
      addDataSet(FREE_USERS_LABEL, sampleData, "#78716c");
    } else {
      removeDataSet(FREE_USERS_LABEL);
    }
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
    const usersChart = new Chart(canvas, {
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
            text: "User Metrics",
          },
        },
      },
    });

    setChartInstance(usersChart);

    return () => {
      usersChart.destroy();
      setChartInstance(null);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <canvas ref={canvasRef}></canvas>
      <div className="flex flex-col gap-2 mt-4 bg-violet-400/30 p-4 rounded-md">
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

// Total de usuarios vs usarios activos por mes
