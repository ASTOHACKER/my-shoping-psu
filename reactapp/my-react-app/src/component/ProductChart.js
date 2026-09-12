import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProductChart() {
  // ----- State -----
  const [chartData, setChartData] = useState();
  const [error, setError] = useState(null); // ← เพิ่มใหม่สำหรับ Error
  const chartRef = useRef(null);
  const navigate = useNavigate();

  // ----- useEffect ดึงข้อมูลจาก Backend -----
  useEffect(() => {
    axios
      .get("api/stats", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const labels = res.data.map((item) => item.category);
        const data = res.data.map((item) => item.total);
        setChartData({
          labels,
          datasets: [
            {
              label: "Products by Category",
              data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
      })
      .catch((err) => setError(err.message)); // ← เพิ่มใหม่
  }, []);

  // ----- Options -----
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Products by Category" },
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  // ----- Handle Click -----
  const onBarClick = (evt) => {
    const chart = chartRef.current;
    if (!chart) return;
    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      false
    );
    if (points.length) {
      const idx = points[0].index;
      const category = chart.data.labels[idx];
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  // ----- Render -----
  if (error) return <p className="text-sm text-red-600 p-4 bg-red-50 border border-red-200 rounded-lg">Error: {error}</p>; // ← แสดง error ถ้ามี
  if (!chartData) return <p className="text-sm text-zinc-500 p-4">Loading...</p>; // ← แสดง loading ระหว่างรอ

  return (
    <div style={{ height: 360 }}>
      <Bar
        ref={chartRef}
        data={chartData}
        options={options}
        onClick={onBarClick}
      />
    </div>
  );
}
