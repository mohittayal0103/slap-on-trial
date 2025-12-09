
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import Home from './pages/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/Shop/ProductDetail';
import Cart from './pages/Shop/Cart';
import Checkout from './pages/Shop/Checkout';

import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import AddProduct from './pages/Admin/AddProduct';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-violet selection:text-white flex flex-col">
        <Navbar />
        <CartSidebar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
