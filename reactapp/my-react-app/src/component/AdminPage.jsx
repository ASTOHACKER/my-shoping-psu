import { Link, Navigate, Route, Routes } from "react-router-dom";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductTable from "./ProductTable";

export default function AdminPage() {
  if (localStorage.getItem("role") !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Admin workspace</p>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">Admin Dashboard</h1>
        </div>
        <nav className="flex gap-1 text-sm">
          <Link to="/admin/products" className="px-3 py-1.5 rounded-md text-zinc-600 hover:bg-zinc-100">Products</Link>
          <Link to="/admin/products/new" className="px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-black">Add New Product</Link>
        </nav>
      </div>
      <div className="mt-6 border-t border-zinc-100 pt-6">
        <Routes>
          <Route path="products" element={<ProductTable />} />
          <Route path="products/new" element={<ProductCreate />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="*" element={<Navigate to="products" replace />} />
        </Routes>
      </div>
    </div>
  );
}
