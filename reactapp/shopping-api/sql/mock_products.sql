-- ==============================================================================
-- Mock Data for Products Table (Preparation for Data Visualization / Charts)
-- Categories: Computer, Smartphone, Tablet, Accessories (at least 3-4 items each)
-- ==============================================================================

-- 1. Ensure image column exists
ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT;

-- 2. Clean up single/invalid test data (e.g., test items with < 2 items per category)
DELETE FROM products WHERE category = 'ผัก';

-- 3. Insert / Update products
INSERT INTO products (id, name, category, description, price, stock, image)
VALUES
  -- Dessert (Existing 3 items)
  (1, 'เค้กช็อกโกแลต', 'Dessert', 'เค้กช็อกโกแลตหน้านิ่ม หอมหวาน อร่อยเข้มข้น', 85.00, 20, 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600'),
  (2, 'ครัวซองต์เนยสด', 'Dessert', 'ครัวซองต์เนยสดแท้ อบสดใหม่ กรอบนอกนุ่มใน', 65.00, 20, 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=600'),
  (3, 'มาการอง', 'Dessert', 'มาการองหลากรสชาติ หวานละมุน สไตล์ฝรั่งเศส', 120.00, 20, 'https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=600'),

  -- Computer (4 items)
  (4, 'MacBook Air M2 (13.6-inch)', 'Computer', 'ชิป Apple M2 CPU 8-core GPU 8-core RAM 8GB SSD 256GB หน้าจอ Liquid Retina แบตอึด 18 ชม.', 34900.00, 15, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'),
  (5, 'Dell XPS 15 9530', 'Computer', 'Intel Core i7-13700H RAM 16GB SSD 512GB RTX 4050 จอแสดงผล OLED 3.5K สำหรับงานกราฟิก', 59900.00, 10, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'),
  (6, 'ASUS ROG Strix G16', 'Computer', 'โน้ตบุ๊กเกมมิ่ง Intel Core i9-13980HX RAM 16GB SSD 1TB RTX 4070 จอ 240Hz ระบายความร้อนทรงพลัง', 54900.00, 8, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'),
  (7, 'Lenovo ThinkPad X1 Carbon Gen 11', 'Computer', 'อัลตร้าบุ๊กธุรกิจ น้ำหนักเบา 1.12 กก. Intel Core i7 RAM 16GB SSD 1TB ทนทานมาตรฐานกองทัพ', 49900.00, 12, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80'),

  -- Smartphone (4 items)
  (8, 'iPhone 15 Pro Max (256GB)', 'Smartphone', 'บอดี้ไทเทเนียม ชิป A17 Pro จอ Super Retina XDR 6.7 นิ้ว กล้อง 48MP ซูมออปติคัล 5 เท่า', 44900.00, 25, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'),
  (9, 'Samsung Galaxy S24 Ultra (256GB)', 'Smartphone', 'Galaxy AI ในตัว ปากกา S Pen ชิป Snapdragon 8 Gen 3 จอ Dynamic AMOLED 2X กล้อง 200MP', 43900.00, 20, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80'),
  (10, 'Google Pixel 8 Pro (128GB)', 'Smartphone', 'ชิป Google Tensor G3 ถ่ายภาพระดับโปรด้วยพลัง AI Magic Editor ระบบ Android แท้', 32900.00, 14, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'),
  (11, 'Xiaomi 14 Ultra (512GB)', 'Smartphone', 'กล้องเลนส์ Leica Summilux เซนเซอร์ขนาด 1 นิ้ว ชิป Snapdragon 8 Gen 3 ชาร์จไว 90W', 39990.00, 18, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'),

  -- Tablet (4 items)
  (12, 'iPad Pro 11 นิ้ว M4 (256GB)', 'Tablet', 'ชิป Apple M4 บางเฉียบเพียง 5.3 มม. จอ Ultra Retina XDR Tandem OLED รองรับ Apple Pencil Pro', 39900.00, 16, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80'),
  (13, 'iPad Air 11 นิ้ว M2 (128GB)', 'Tablet', 'ชิป Apple M2 จอภาพ Liquid Retina 11 นิ้ว รองรับ Magic Keyboard และพอร์ต USB-C', 23900.00, 30, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80'),
  (14, 'Samsung Galaxy Tab S9 (128GB)', 'Tablet', 'จอ Dynamic AMOLED 2X 11 นิ้ว 120Hz มาพร้อม S Pen กันน้ำและฝุ่น IP68 ชิป Snapdragon 8 Gen 2', 28900.00, 15, 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=600&q=80'),
  (15, 'Xiaomi Pad 6 (256GB)', 'Tablet', 'หน้าจอคมชัด 11 นิ้ว WQHD+ 144Hz ชิป Snapdragon 870 ลำโพงสเตอริโอ 4 ตัว แบตเตอรี่ 8840mAh', 10990.00, 22, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'),

  -- Accessories (4 items)
  (16, 'AirPods Pro (รุ่นที่ 2) USB-C', 'Accessories', 'ตัดเสียงรบกวนดีขึ้น 2 เท่า ชิป H2 ระบบเสียงตามตำแหน่ง เคสชาร์จ MagSafe พอร์ต USB-C', 8990.00, 40, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80'),
  (17, 'Logitech MX Master 3S Wireless Mouse', 'Accessories', 'เมาส์ไร้สายบลูทูธ สวิตช์เงียบ Quiet Click เซนเซอร์ 8000 DPI ล้อเลื่อนแม่เหล็ก MagSpeed', 3990.00, 35, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'),
  (18, 'Keychron K2 Wireless Mechanical Keyboard V2', 'Accessories', 'คีย์บอร์ดกลไกไร้สาย 75% สวิตช์ Gateron G Pro สลับใช้ macOS และ Windows ได้ ไฟ RGB', 3490.00, 28, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'),
  (19, 'Anker 737 Power Bank (24,000mAh 140W)', 'Accessories', 'พาวเวอร์แบงก์ชาร์จเร็วสองทิศทาง 140W หน้าจอดิจิทัลอัจฉริยะ ชาร์จโน้ตบุ๊กและสมาร์ตโฟนได้พร้อมกัน', 4590.00, 25, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  stock = EXCLUDED.stock,
  image = EXCLUDED.image;

-- 4. Reset serial sequence to the maximum id
SELECT setval(
  pg_get_serial_sequence('products', 'id'),
  GREATEST((SELECT MAX(id) FROM products), 1)
);

-- 5. Verification Query
SELECT category, COUNT(*) FROM products GROUP BY category ORDER BY category;
