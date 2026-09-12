CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- สำหรับฐานข้อมูลที่มีตาราง customers อยู่แล้ว (สร้างค้างไว้ก่อนหน้า)
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE customers ADD COLUMN IF NOT EXISTS city VARCHAR(100);
