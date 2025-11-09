import React from "react";

import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type Token = {
  name?: string;
  symbol?: string;
  address?: string;
  marketCap?: number;
  volume24h?: number;
  holders?: number;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Tokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/token-price");
        if (!res.ok) {
          throw new Error("Failed to fetch /api/token-price");
        }
        const json = await res.json();
        setTokens(json.tokens ?? []);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Unknown error");
      } finally {
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredTokens = tokens.filter(
    (token) => token.marketCap != null && token.name != null
  );

  const chartData = {
    labels: filteredTokens.map((token) => token.name!),
    datasets: [
      {
        label: "Market Cap",
        data: filteredTokens.map((token) => Number(token.marketCap)),
        fill: false,
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.1,
      },
      {
        label: "Volume 24h",
        data: filteredTokens.map((token) => Number(token.volume24h)),
        fill: false,
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.5)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      title: {
        display: false,
        text: "Market Cap of Tokens",
        color: "white",
      },
      tooltip: {
        enabled: true,
        backgroundColor: "transparent)",
        titleColor: "white",
        bodyColor: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          enabled: false,
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="container tokens-chart space-y-6">
      <p className="text-3xl font-medium">datas</p>

      {loading && (
        <div className="w-full h-[650px] animate-pulse bg-gray-900 rounded-md"></div>
      )}

      {error && !loading && (
        <p className="text-sm text-red-400">Error: {error}</p>
      )}

      {!loading && !error && <Line data={chartData} options={chartOptions} />}
    </div>
  );
}
