import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ProductChart() {
  const [chartData, setChartData] = useState(); const [error, setError] = useState(null); const chartRef = useRef(null); const navigate = useNavigate();
  useEffect(() => {
    axios.get("api/stats", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).then((res) => {
      setChartData({ labels: res.data.map((item) => item.category), datasets: [{ label: "จำนวนสินค้า", data: res.data.map((item) => item.total), backgroundColor: ["#c35f45", "#6f3928", "#d8a25e", "#9a6b58", "#d7b6a5"], borderRadius: 7, borderSkipped: false, maxBarThickness: 52 }] });
    }).catch((err) => setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"));
  }, []);
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { padding: 11, backgroundColor: "#4e261d", titleFont: { family: "Noto Sans Thai" }, bodyFont: { family: "Noto Sans Thai" } } }, scales: { x: { grid: { display: false }, ticks: { color: "#756761", font: { family: "Noto Sans Thai" } } }, y: { beginAtZero: true, ticks: { stepSize: 1, color: "#756761" }, grid: { color: "#eadfd3" } } } };
  const onBarClick = (event) => { const chart = chartRef.current; if (!chart) return; const points = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, false); if (points.length) navigate(`/products?category=${encodeURIComponent(chart.data.labels[points[0].index])}`); };
  if (error) return <div className="error-state"><h2>โหลดสถิติไม่สำเร็จ</h2><p>{error}</p></div>;
  if (!chartData) return <div className="loading-state">กำลังเตรียมข้อมูลหมวดหมู่สินค้า...</div>;
  return <div className="chart-page"><div className="chart-toolbar"><div><p className="eyebrow">Bakery insights</p><h1 className="page-title">สินค้าแยกตามหมวดหมู่</h1><p className="page-copy">ดูจำนวนเมนูในแต่ละหมวดหมู่ และคลิกแท่งกราฟเพื่อเปิดรายการสินค้า</p></div></div><div className="chart-card"><div className="chart-frame"><Bar ref={chartRef} data={chartData} options={options} onClick={onBarClick} /></div></div></div>;
}
