import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample colors for datasets
const COLORS = {
  score: "#3b82f6", // blue-500
  learningTime: "#10b981", // green-500
  testTime: "#f59e0b", // yellow-500
};

// Safe check for dark mode
const getDarkMode = () => {
  if (typeof window !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }
  return false;
};

const generateChartData = (data, labelPrefix) => {
  const labels = data.map((item) => item.name);

  return {
    labels,
    datasets: [
      {
        label: `${labelPrefix} Score`,
        data: data.map((item) => item.score),
        borderColor: COLORS.score,
        backgroundColor: COLORS.score,
        tension: 0.3,
      },
      {
        label: `${labelPrefix} Learning Time`,
        data: data.map((item) => item.learningTime),
        borderColor: COLORS.learningTime,
        backgroundColor: COLORS.learningTime,
        tension: 0.3,
      },
      {
        label: `${labelPrefix} Test Time`,
        data: data.map((item) => item.testTime),
        borderColor: COLORS.testTime,
        backgroundColor: COLORS.testTime,
        tension: 0.3,
      },
    ],
  };
};

const getChartOptions = () => {
  const darkMode = getDarkMode();

  return {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#e5e7eb" : "#111827", // gray-200 or gray-900
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#1f2937" : "#f9fafb", // gray-800 or gray-50
        titleColor: darkMode ? "#facc15" : "#000", // yellow-400 or black
        bodyColor: darkMode ? "#ffffff" : "#111827",
        borderColor: darkMode ? "#4b5563" : "#d1d5db",
        borderWidth: 1,
        titleFont: {
          weight: "bold",
        },
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#f3f4f6" : "#374151", // gray-100 or gray-700
        },
        grid: {
          color: darkMode ? "#374151" : "#e5e7eb", // gray-700 or gray-200
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#f3f4f6" : "#374151",
        },
        grid: {
          color: darkMode ? "#374151" : "#e5e7eb",
        },
      },
    },
  };
};

const ConceptChart = ({ data, labelPrefix = "Concept" }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {labelPrefix} Performance
      </h2>
      <Line data={generateChartData(data, labelPrefix)} options={getChartOptions()} />
    </div>
  );
};

export default ConceptChart;
