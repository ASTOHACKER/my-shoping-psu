import { useEffect, useState } from "react";
import axios from "../api";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function StockCategoryChart() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("doughnut"); // "doughnut" หรือ "pie"
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("api/stats/stock", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const labels = res.data.map((item) => item.category);
        const data = res.data.map((item) => Number(item.total_stock));

        const sum = data.reduce((acc, curr) => acc + curr, 0);
        setTotalStock(sum);

        setChartData({
          labels,
          datasets: [
            {
              label: "จำนวนสต็อก (ชิ้น)",
              data,
              backgroundColor: [
                "#3b82f6", // Accessories
                "#10b981", // Computer
                "#f59e0b", // Dessert
                "#8b5cf6", // Smartphone
                "#ec4899", // Tablet
              ],
              borderWidth: 2,
              borderColor: "#ffffff",
              hoverOffset: 6,
            },
          ],
        });
      })
      .catch((err) => {
        setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "สัดส่วนสต็อกสินค้าตามหมวดหมู่ (Stock by Category)",
        font: { size: 16, weight: "600" },
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 16,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const percentage = totalStock > 0 ? ((value / totalStock) * 100).toFixed(1) : 0;
            return ` ${context.label}: ${value} ชิ้น (${percentage}%)`;
          },
        },
      },
    },
  };

  // 1. Error State
  if (error) {
    return (
      <div className="p-5 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <span className="font-semibold text-sm block mb-1">เกิดข้อผิดพลาดในการโหลดข้อมูลสต็อก</span>
        <p className="text-xs text-red-600 font-mono">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-md font-medium transition-colors"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  // 2. Loading State
  if (!chartData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin mb-3" />
        <p className="text-sm text-zinc-500 font-medium">กำลังโหลดข้อมูลสต็อกสินค้า...</p>
        <span className="text-xs text-zinc-400 mt-1">กำลังเรียก /api/stats/stock</span>
      </div>
    );
  }

  // 3. Success State
  return (
    <div>
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">สถิติสต็อกสินค้าแยกตามหมวดหมู่</h1>
          <p className="text-xs text-zinc-500 mt-1">
            สัดส่วนสต็อกคงเหลือทั้งหมด {totalStock.toLocaleString()} ชิ้น
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs">
          <button
            onClick={() => setChartType("doughnut")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              chartType === "doughnut"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Doughnut Chart
          </button>
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              chartType === "pie"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Pie Chart
          </button>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 border border-zinc-200 rounded-lg shadow-sm" style={{ height: 380 }}>
        {chartType === "doughnut" ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
