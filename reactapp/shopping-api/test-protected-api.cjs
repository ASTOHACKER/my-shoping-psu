const BASE = "http://localhost:5000";

async function waitForServer() {
  for (let i = 0; i < 20; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch (_) {
      await new Promise((res) => setTimeout(res, 500));
    }
  }
  throw new Error("Server did not start within 10 seconds");
}

(async () => {
  await waitForServer();

  // Case 1: ไม่มี Token
  const r1 = await fetch(`${BASE}/api/customers`);
  console.log("[1] GET /api/customers (no token)       ->", r1.status, JSON.stringify(await r1.json()));

  // Case 2: Token ปลอม
  const r2 = await fetch(`${BASE}/api/customers`, {
    headers: { Authorization: "Bearer fake.token.value" },
  });
  console.log("[2] GET /api/customers (invalid token)  ->", r2.status, JSON.stringify(await r2.json()));

  // Login เพื่อรับ JWT
  const lr = await fetch(`${BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "tester", password: "1234" }),
  });
  const loginData = await lr.json();
  console.log("[3] POST /api/login (tester/1234)       ->", lr.status, loginData.success ? "success, JWT received" : JSON.stringify(loginData));

  // Case 3: มี Token ถูกต้อง
  const r3 = await fetch(`${BASE}/api/customers`, {
    headers: { Authorization: `Bearer ${loginData.token}` },
  });
  const data3 = await r3.json();
  console.log("[4] GET /api/customers (valid token)    ->", r3.status, `${Array.isArray(data3) ? data3.length : 0} customers from PostgreSQL`);
  console.log("    row[0]:", JSON.stringify(data3[0]));

  // ทดสอบรหัสผ่านผิด
  const lw = await fetch(`${BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "tester", password: "wrongpass" }),
  });
  console.log("[5] POST /api/login (wrong password)    ->", lw.status, JSON.stringify(await lw.json()));
})().catch((e) => {
  console.error("TEST ERR:", e.message);
  process.exitCode = 1;
});
