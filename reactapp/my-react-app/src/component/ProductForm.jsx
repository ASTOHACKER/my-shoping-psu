import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, authHeaders } from "./api";
import { Icon } from "./ui";

const emptyProduct = { name: "", category: "", description: "", price: "", stock: 0, image_url: "" };

export default function ProductForm({ product, title, submitLabel }) {
  const [form, setForm] = useState(product || emptyProduct);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image_url || product?.image || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEditing = Boolean(product?.id);
  useEffect(() => { setForm(product || emptyProduct); setImageFile(null); setImagePreview(product?.image_url || product?.image || ""); }, [product]);
  const updateField = (event) => { const { name, value } = event.target; setForm((current) => ({ ...current, [name]: value })); if (name === "image_url" && !imageFile) setImagePreview(value); };
  const handleImageChange = (event) => { const file = event.target.files?.[0] || null; setImageFile(file); if (file) setImagePreview(URL.createObjectURL(file)); };
  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const body = new FormData(); body.append("name", form.name); body.append("category", form.category); body.append("description", form.description || ""); body.append("price", String(Number(form.price))); body.append("stock", String(Number(form.stock || 0)));
      if (imageFile) body.append("image", imageFile); else if (form.image_url) body.append("image_url", form.image_url);
      await apiRequest(isEditing ? `/api/products/${product.id}` : "/api/products", { method: isEditing ? "PUT" : "POST", headers: authHeaders(), body });
      window.alert(isEditing ? "แก้ไขสินค้าสำเร็จ" : "บันทึกสินค้าสำเร็จ"); navigate("/admin/products");
    } catch (requestError) { setError(requestError.message); } finally { setLoading(false); }
  };

  return (
    <section className="form-panel">
      <div className="form-panel-head"><div><p className="eyebrow">Product details</p><h2>{title}</h2><p>กรอกข้อมูลสินค้าให้ครบถ้วนก่อนนำขึ้นหน้าร้าน</p></div><button type="button" onClick={() => navigate("/admin/products")} className="cancel-button">ยกเลิก</button></div>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field"><label htmlFor="product-name">ชื่อสินค้า <span aria-hidden="true">*</span></label><input id="product-name" name="name" value={form.name} onChange={updateField} required /></div>
        <div className="field"><label htmlFor="product-category">หมวดหมู่ <span aria-hidden="true">*</span></label><input id="product-category" name="category" value={form.category} onChange={updateField} required /></div>
        <div className="field"><label htmlFor="product-price">ราคา <span aria-hidden="true">*</span></label><input id="product-price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} required /></div>
        <div className="field"><label htmlFor="product-stock">จำนวนคงเหลือ</label><input id="product-stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={updateField} /></div>
        <div className="field form-full"><label htmlFor="product-description">รายละเอียด</label><textarea id="product-description" name="description" value={form.description || ""} onChange={updateField} rows="4" placeholder="เล่าเสน่ห์ของขนมชิ้นนี้สั้น ๆ" /></div>
        <div className="field form-full image-upload"><label htmlFor="product-image">รูปสินค้า</label><input id="product-image" name="image" type="file" accept="image/*" onChange={handleImageChange} /><span className="image-help">รองรับไฟล์รูปภาพขนาดไม่เกิน 5 MB</span>{imagePreview && <img src={imagePreview} alt="ตัวอย่างสินค้า" className="image-preview" />}</div>
        <div className="field form-full"><label htmlFor="product-image-url">Image URL <span className="font-normal">(ถ้ามี)</span></label><input id="product-image-url" name="image_url" type="url" value={form.image_url || form.image || ""} onChange={updateField} placeholder="https://... หรือ /static/..." /><span className="image-help">เลือกไฟล์หรือใส่ลิงก์อย่างใดอย่างหนึ่ง</span></div>
        {error && <p className="form-message form-full" role="alert">{error}</p>}
        <div className="form-footer form-full"><button type="button" onClick={() => navigate("/admin/products")} className="cancel-button">ยกเลิกการแก้ไข</button><button type="submit" disabled={loading} className="button-primary">{loading ? "กำลังบันทึก..." : submitLabel}<Icon name="arrow" size={15} /></button></div>
      </form>
    </section>
  );
}
