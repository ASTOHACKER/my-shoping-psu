import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, authHeaders } from "./api";

const emptyProduct = {
  name: "",
  category: "",
  description: "",
  price: "",
  stock: 0,
  image_url: "",
};

export default function ProductForm({ product, title, submitLabel }) {
  const [form, setForm] = useState(product || emptyProduct);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image_url || product?.image || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEditing = Boolean(product?.id);

  useEffect(() => {
    setForm(product || emptyProduct);
    setImageFile(null);
    setImagePreview(product?.image_url || product?.image || "");
  }, [product]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "image_url" && !imageFile) setImagePreview(value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("category", form.category);
      body.append("description", form.description || "");
      body.append("price", String(Number(form.price)));
      body.append("stock", String(Number(form.stock || 0)));
      if (imageFile) body.append("image", imageFile);
      else if (form.image_url) body.append("image_url", form.image_url);

      await apiRequest(isEditing ? `/api/products/${product.id}` : "/api/products", {
        method: isEditing ? "PUT" : "POST",
        headers: authHeaders(),
        body,
      });
      window.alert(isEditing ? "แก้ไขสินค้าสำเร็จ" : "บันทึกสินค้าสำเร็จ");
      navigate("/admin/products");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-zinc-500 mt-1">กรอกข้อมูลสินค้าให้ครบถ้วน</p>
        </div>
        <button type="button" onClick={() => navigate("/admin/products")} className="text-sm text-zinc-500 hover:text-zinc-900">
          ยกเลิก
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-medium">
            ชื่อสินค้า <span className="text-red-500">*</span>
            <input name="name" value={form.name} onChange={updateField} required className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400" />
          </label>
          <label className="text-sm font-medium">
            หมวดหมู่ <span className="text-red-500">*</span>
            <input name="category" value={form.category} onChange={updateField} required className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400" />
          </label>
          <label className="text-sm font-medium">
            ราคา <span className="text-red-500">*</span>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} required className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400" />
          </label>
          <label className="text-sm font-medium">
            จำนวนคงเหลือ
            <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={updateField} className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400" />
          </label>
        </div>
        <label className="block text-sm font-medium">
          รายละเอียด
          <textarea name="description" value={form.description || ""} onChange={updateField} rows="4" className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400" />
        </label>
        <label className="block text-sm font-medium">
          รูปสินค้า
          <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400" />
          <span className="mt-1 block text-xs font-normal text-zinc-500">รองรับไฟล์รูปภาพขนาดไม่เกิน 5 MB</span>
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            name="image_url"
            type="url"
            value={form.image_url || form.image || ""}
            onChange={updateField}
            placeholder="https://... หรือ /static/..."
            className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2 font-normal focus:outline-none focus:border-zinc-400"
          />
          <span className="mt-1 block text-xs font-normal text-zinc-500">เลือกไฟล์หรือใส่ลิงก์อย่างใดอย่างหนึ่ง</span>
        </label>
        {imagePreview && <img src={imagePreview} alt="ตัวอย่างสินค้า" className="h-32 w-32 rounded-md border border-zinc-200 object-cover" />}
        {error && <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3">{error}</p>}
        <button type="submit" disabled={loading} className="bg-zinc-900 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-black disabled:opacity-50">
          {loading ? "กำลังบันทึก..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
