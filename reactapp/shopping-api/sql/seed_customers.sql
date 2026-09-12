INSERT INTO customers (id, name, email, phone, city)
VALUES
  (1, 'John Doe', 'john@example.com', '081-234-5678', 'Bangkok'),
  (2, 'สมชาย ใจดี', 'somchai@example.com', '082-345-6789', 'Chiang Mai'),
  (3, 'สุนิสา วงศ์สุข', 'sunisa@example.com', '083-456-7890', 'Phuket'),
  (4, 'อนุชา พรหมดี', 'anucha@example.com', '084-567-8901', 'Khon Kaen'),
  (5, 'มาลี ศรีทอง', 'malee@example.com', '085-678-9012', 'Nakhon Ratchasima'),
  (6, 'David Smith', 'david@example.com', '086-789-0123', 'Pattaya')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  city = EXCLUDED.city;

SELECT setval(
  pg_get_serial_sequence('customers', 'id'),
  GREATEST((SELECT MAX(id) FROM customers), 1)
);
