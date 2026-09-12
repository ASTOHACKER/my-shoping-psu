import { useEffect, useState } from "react";
import axios from "../api";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// ลงทะเบียน Elements สำหรับ Line และ Bar Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// รายชื่อเดือนภาษาไทย ม.ค.–ธ.ค.
const MONTH_NAMES = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

export default function OrdersMonthlyChart() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("line"); // "line" หรือ "bar"
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("api/orders/stats/monthly", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // เตรียม Array 12 เดือน ค่าเริ่มต้นเป็น 0 ทุกเดือน (ม.ค.–ธ.ค.)
        const monthlyCounts = new Array(12).fill(0);

        // นำข้อมูลจาก API มาจับคู่ลงตามเดือนจริง (0 = ม.ค., ..., 11 = ธ.ค.)
        res.data.forEach((item) => {
          const date = new Date(item.month);
          const monthIndex = date.getMonth();
          if (monthIndex >= 0 && monthIndex < 12) {
            monthlyCounts[monthIndex] = Number(item.count);
          }
        });

        // คำนวณยอดรวมออเดอร์ทั้งหมด
        const sum = monthlyCounts.reduce((acc, curr) => acc + curr, 0);
        setTotalOrders(sum);

        // จัดเตรียมข้อมูลส่งเข้า Chart.js
        setChartData({
          labels: MONTH_NAMES,
          datasets: [
            {
              label: "จำนวนคำสั่งซื้อ (Orders)",
              data: monthlyCounts,
              borderColor: "#2563eb", // สีน้ำเงิน
              backgroundColor: chartType === "line" ? "rgba(37, 99, 235, 0.15)" : "#3b82f6",
              fill: true,
              tension: 0.35, // เส้นโค้งมนดูนุ่มนวล
              pointBackgroundColor: "#2563eb",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              borderRadius: chartType === "bar" ? 6 : 0,
            },
          ],
        });
      })
      .catch((err) => {
        setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      });
  }, [chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "ยอดคำสั่งซื้อแยกรายเดือน (Orders by Month)",
        font: { size: 16, weight: "600" },
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed.y} คำสั่งซื้อ`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2, font: { size: 12 } },
        grid: { color: "#f4f4f5" },
      },
    },
  };

  // 1. Error State
  if (error) {
    return (
      <div className="p-5 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <span className="font-semibold text-sm block mb-1">เกิดข้อผิดพลาดในการโหลดข้อมูล</span>
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
        <p className="text-sm text-zinc-500 font-medium">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
        <span className="text-xs text-zinc-400 mt-1">กำลังเรียก /api/orders/stats/monthly</span>
      </div>
    );
  }

  // 3. Render Chart
  return (
    <div>
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">กราฟยอดคำสั่งซื้อรายเดือน</h1>
          <p className="text-xs text-zinc-500 mt-1">
            สถิติตลอดทั้งปี ม.ค.–ธ.ค. (รวมทั้งหมด {totalOrders.toLocaleString()} คำสั่งซื้อ)
          </p>
        </div>

        {/* ปุ่มสลับ Line Chart / Bar Chart */}
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              chartType === "line"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              chartType === "bar"
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Bar Chart
          </button>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 border border-zinc-200 rounded-lg shadow-sm" style={{ height: 380 }}>
        {chartType === "line" ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
