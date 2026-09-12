import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { apiRequest, authHeaders } from "./api";

export default function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest(`/api/products/${id}`, { headers: authHeaders() })
      .then(setProduct)
      .catch((requestError) => setError(requestError.message));
  }, [id]);

  if (error) {
    return <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3">{error}</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-500">กำลังโหลดข้อมูลสินค้า...</p>;
  }

  return <ProductForm product={product} title="แก้ไขสินค้า" submitLabel="Save Changes" />;
}
