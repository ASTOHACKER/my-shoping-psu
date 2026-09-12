import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Greeting from './component/greeting';
import Counter from './component/counter';
import FormExample from './component/FormExample';
import DataFetcher from './component/DataFetcher';
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f7f6] text-zinc-900">
      <header className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[14px] font-semibold tracking-tight">Sweet Bakery</span>
            <nav className="flex items-center gap-1 text-sm overflow-auto">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/products', label: 'Products' },
                { to: '/customers', label: 'Customers' },
                { to: '/chart', label: 'Product Chart' },
                { to: '/orders-chart', label: 'Orders Chart' },
                { to: '/stock-chart', label: 'Stock Chart' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md ${isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {token ? (
              <div className="flex items-center gap-2">
                {role === 'admin' && <NavLink to="/admin/products" className="text-sm text-zinc-600 hover:text-zinc-900 px-3 py-1.5">Admin</NavLink>}
                <button onClick={handleLogout} className="text-sm text-zinc-600 hover:text-zinc-900 px-3 py-1.5 border border-zinc-200 rounded-md bg-white">Logout</button>
              </div>
            ) : (
              <NavLink to="/login" className="text-sm bg-zinc-900 text-white px-4 py-1.5 rounded-md hover:bg-black">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white border border-zinc-200 rounded-lg">
          <div className="p-5 sm:p-7">
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
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-sm font-semibold text-zinc-700 mb-3">Lab Components</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-zinc-200 rounded-lg p-5">
              <Greeting name="na" messages={5} />
              <div className="my-4 border-t border-zinc-100" />
              <Counter />
            </div>
            <div className="bg-white border border-zinc-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold mb-3">Form Example</h3>
              <FormExample />
            </div>
            <div className="bg-white border border-zinc-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold mb-3">Data Fetcher</h3>
              <DataFetcher />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-4 sm:px-6 py-6 text-xs text-zinc-500 border-t border-zinc-200 mt-8 flex flex-col sm:flex-row justify-between gap-2">
        <span>Sweet Bakery Cafe — Since 2018</span>
        <span>support@example.com · +66 012 345 6789</span>
      </footer>
    </div>
  );
}

export default App;
