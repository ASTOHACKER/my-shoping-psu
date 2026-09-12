import { useEffect, useState } from "react";
import axios from "../api";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StockCategoryChart() {
  const [chartData, setChartData] = useState(null); const [error, setError] = useState(null); const [chartType, setChartType] = useState("doughnut"); const [totalStock, setTotalStock] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("api/stats/stock", { headers: { Authorization: "Bearer " + token } }).then((res) => {
      const data = res.data.map((item) => Number(item.total_stock)); setTotalStock(data.reduce((sum, value) => sum + value, 0));
      setChartData({ labels: res.data.map((item) => item.category), datasets: [{ label: "จำนวนสต็อก", data, backgroundColor: ["#c35f45", "#6f3928", "#d8a25e", "#9a6b58", "#d7b6a5"], borderWidth: 3, borderColor: "#fffdf9", hoverOffset: 7 }] });
    }).catch((err) => setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"));
  }, []);
  const options = { responsive: true, maintainAspectRatio: false, cutout: "64%", plugins: { legend: { position: "bottom", labels: { padding: 18, color: "#756761", font: { family: "Noto Sans Thai", size: 11 } } }, tooltip: { padding: 11, backgroundColor: "#4e261d", callbacks: { label: (context) => { const value = context.parsed; const percentage = totalStock > 0 ? ((value / totalStock) * 100).toFixed(1) : 0; return ` ${context.label}: ${value} ชิ้น (${percentage}%)`; } } } } };
  if (error) return <div className="error-state"><h2>โหลดสต็อกไม่สำเร็จ</h2><p>{error}</p><button type="button" className="button-secondary" onClick={() => window.location.reload()} style={{ marginTop: 22 }}>ลองใหม่อีกครั้ง</button></div>;
  if (!chartData) return <div className="loading-state">กำลังเตรียมข้อมูลสต็อกสินค้า...</div>;
  return <div className="chart-page"><div className="chart-toolbar"><div><p className="eyebrow">Bakery insights</p><h1 className="page-title">สต็อกคงเหลือ</h1><p className="page-copy">สัดส่วนสต็อกสินค้าตามหมวดหมู่ รวมทั้งหมด <span className="chart-total">{totalStock.toLocaleString()} ชิ้น</span></p></div><div className="chart-toggle" role="group" aria-label="รูปแบบกราฟ"><button type="button" className={chartType === "doughnut" ? "active" : ""} onClick={() => setChartType("doughnut")}>โดนัท</button><button type="button" className={chartType === "pie" ? "active" : ""} onClick={() => setChartType("pie")}>วงกลม</button></div></div><div className="chart-card"><div className="chart-frame">{chartType === "doughnut" ? <Doughnut data={chartData} options={options} /> : <Pie data={chartData} options={options} />}</div></div></div>;
}
