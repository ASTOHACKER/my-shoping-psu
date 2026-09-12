import { useEffect, useState } from "react";
import axios from "../api";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);
const MONTH_NAMES = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

export default function OrdersMonthlyChart() {
  const [chartData, setChartData] = useState(null); const [error, setError] = useState(null); const [chartType, setChartType] = useState("line"); const [totalOrders, setTotalOrders] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("api/orders/stats/monthly", { headers: { Authorization: "Bearer " + token } }).then((res) => {
      const monthlyCounts = new Array(12).fill(0); res.data.forEach((item) => { const monthIndex = new Date(item.month).getMonth(); if (monthIndex >= 0 && monthIndex < 12) monthlyCounts[monthIndex] = Number(item.count); });
      setTotalOrders(monthlyCounts.reduce((sum, value) => sum + value, 0));
      setChartData({ labels: MONTH_NAMES, datasets: [{ label: "จำนวนคำสั่งซื้อ", data: monthlyCounts, borderColor: "#c35f45", backgroundColor: chartType === "line" ? "rgba(195,95,69,.16)" : "#c35f45", fill: true, tension: .35, pointBackgroundColor: "#6f3928", pointBorderColor: "#fffdf9", pointBorderWidth: 2, pointRadius: 4, borderRadius: chartType === "bar" ? 6 : 0, maxBarThickness: 34 }] });
    }).catch((err) => setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"));
  }, [chartType]);
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { padding: 11, backgroundColor: "#4e261d", callbacks: { label: (context) => ` ${context.parsed.y} คำสั่งซื้อ` } } }, scales: { x: { grid: { display: false }, ticks: { color: "#756761", font: { family: "Noto Sans Thai" } } }, y: { beginAtZero: true, ticks: { stepSize: 2, color: "#756761" }, grid: { color: "#eadfd3" } } } };
  if (error) return <div className="error-state"><h2>โหลดสถิติไม่สำเร็จ</h2><p>{error}</p><button type="button" className="button-secondary" onClick={() => window.location.reload()} style={{ marginTop: 22 }}>ลองใหม่อีกครั้ง</button></div>;
  if (!chartData) return <div className="loading-state">กำลังเตรียมข้อมูลออเดอร์รายเดือน...</div>;
  return <div className="chart-page"><div className="chart-toolbar"><div><p className="eyebrow">Bakery insights</p><h1 className="page-title">ออเดอร์รายเดือน</h1><p className="page-copy">ภาพรวมคำสั่งซื้อทั้งปี รวมทั้งหมด <span className="chart-total">{totalOrders.toLocaleString()} ออเดอร์</span></p></div><div className="chart-toggle" role="group" aria-label="รูปแบบกราฟ"><button type="button" className={chartType === "line" ? "active" : ""} onClick={() => setChartType("line")}>เส้น</button><button type="button" className={chartType === "bar" ? "active" : ""} onClick={() => setChartType("bar")}>แท่ง</button></div></div><div className="chart-card"><div className="chart-frame">{chartType === "line" ? <Line data={chartData} options={options} /> : <Bar data={chartData} options={options} />}</div></div></div>;
}
