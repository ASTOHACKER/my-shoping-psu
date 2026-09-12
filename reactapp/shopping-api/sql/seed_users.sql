-- Demo users for local development.
-- Users use password: 1234
INSERT INTO users (username, password, fullname, role)
VALUES
  ('alice', '$2b$10$HaFIIQkQkVVwcQkNA/OsaOTaBMR6luCFiA3CztF95Mm80y/d.MKjO', 'Alice User', 'user'),
  ('narudom', '$2b$10$HaFIIQkQkVVwcQkNA/OsaOTaBMR6luCFiA3CztF95Mm80y/d.MKjO', 'Narudom User', 'user'),
  ('tester', '$2b$10$HaFIIQkQkVVwcQkNA/OsaOTaBMR6luCFiA3CztF95Mm80y/d.MKjO', 'Tester Admin', 'admin')
ON CONFLICT (username) DO UPDATE SET
  password = EXCLUDED.password,
  fullname = EXCLUDED.fullname,
  role = EXCLUDED.role;

SELECT setval(
  pg_get_serial_sequence('users', 'id'),
  GREATEST((SELECT MAX(id) FROM users), 1)
);
