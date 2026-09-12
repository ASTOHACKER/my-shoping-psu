import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductTable from "./ProductTable";
import { Icon } from "./ui";

export default function AdminPage() {
  const location = useLocation();
  if (localStorage.getItem("role") !== "admin") return <Navigate to="/products" replace />;
  const isNew = location.pathname.endsWith("/new");

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div><p className="eyebrow">Back of house</p><h1>หลังบ้าน</h1><p>จัดการเมนูขนมและดูภาพรวมของร้านได้ในที่เดียว</p></div>
        <nav className="admin-nav" aria-label="เมนูผู้ดูแลระบบ">
          <Link to="/admin/products" className={!isNew ? "active" : ""}><Icon name="package" size={15} />รายการสินค้า</Link>
          <Link to="/admin/products/new" className={isNew ? "active" : ""}><Icon name="plus" size={15} />เพิ่มสินค้า</Link>
        </nav>
      </header>
      <div className="admin-content"><Routes><Route path="products" element={<ProductTable />} /><Route path="products/new" element={<ProductCreate />} /><Route path="products/:id/edit" element={<ProductEdit />} /><Route path="*" element={<Navigate to="products" replace />} /></Routes></div>
    </div>
  );
}
