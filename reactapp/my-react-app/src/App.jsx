import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/contact';
import Products from './component/Products';
import Customers from './component/Customers';
import ProductDetail from './component/ProductDetail';
import Login from './component/Login';
import Register from './component/Register';
import AdminPage from './component/AdminPage';
import ProductChart from './component/ProductChart';
import OrdersMonthlyChart from './component/OrdersMonthlyChart';
import StockCategoryChart from './component/StockCategoryChart';
import { Icon } from './component/ui';

const primaryNav = [
  { to: '/', label: 'หน้าแรก', icon: 'home', end: true },
  { to: '/products', label: 'เมนูขนม', icon: 'package' },
  { to: '/about', label: 'เรื่องราวของเรา', icon: 'info' },
  { to: '/customers', label: 'ลูกค้า', icon: 'users' },
];

const analyticsNav = [
  { to: '/chart', label: 'สินค้าแยกตามหมวด' },
  { to: '/orders-chart', label: 'ออเดอร์รายเดือน' },
  { to: '/stock-chart', label: 'สต็อกคงเหลือ' },
];
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand" aria-label="Sweet Bakery หน้าแรก">
            <span className="brand-mark"><Icon name="sparkle" size={21} /></span>
            <span className="brand-copy">
              <strong>Sweet</strong><em>Bakery</em>
              <small>CAFE & BAKESHOP</small>
            </span>
          </Link>

          <nav className="site-nav" aria-label="เมนูหลัก">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <Icon name={item.icon} size={16} /><span>{item.label}</span>
              </NavLink>
            ))}
            <div className="nav-popover">
              <button
                type="button"
                className={`nav-link nav-link-button${analyticsOpen ? ' active' : ''}`}
                onClick={() => setAnalyticsOpen((open) => !open)}
                aria-expanded={analyticsOpen}
                aria-haspopup="menu"
              >
                <Icon name="chart" size={16} /><span>สถิติ</span><Icon name="chevron" size={14} />
              </button>
              {analyticsOpen && (
                <div className="analytics-menu" role="menu">
                  {analyticsNav.map((item) => (
                    <NavLink key={item.to} to={item.to} role="menuitem" onClick={() => setAnalyticsOpen(false)}>
                      {item.label}<Icon name="arrow" size={14} />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon name="phone" size={16} /><span>ติดต่อ</span>
            </NavLink>
          </nav>

          <div className="header-actions">
            {token ? (
              <>
                {role === 'admin' && <NavLink to="/admin/products" className="admin-link"><Icon name="menu" size={16} />หลังบ้าน</NavLink>}
                <button onClick={handleLogout} className="logout-button" type="button" aria-label="ออกจากระบบ">
                  <Icon name="logout" size={16} /><span>ออกจากระบบ</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" aria-label="เข้าสู่ระบบ" className="login-link"><span>เข้าสู่ระบบ</span><Icon name="arrow" size={16} /></NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/chart" element={<ProductChart />} />
          <Route path="/orders-chart" element={<OrdersMonthlyChart />} />
          <Route path="/stock-chart" element={<StockCategoryChart />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span><strong>Sweet Bakery</strong> · อบด้วยใจตั้งแต่ปี 2018</span>
        <span>support@example.com · +66 012 345 6789</span>
      </footer>
    </div>
  );
}

export default App;
