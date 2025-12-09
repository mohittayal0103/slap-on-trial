import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const { cart, toggleCart } = useShop();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-black/90 pb-1 h-10 w-10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                        <img src="/assets/skins/logo.png" alt="Slap On Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-neon-violet to-neon-teal bg-clip-text text-transparent italic">
                        Slap On!
                    </span>
                </Link>
                <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
                    <Link
                        to="/"
                        className={`hover:text-neon-teal transition-colors ${location.pathname === '/' ? 'text-neon-teal font-bold' : ''
                            }`}
                    >
                        HOME
                    </Link>
                    <Link
                        to="/shop"
                        className={`hover:text-neon-teal transition-colors ${location.pathname === '/shop' ? 'text-neon-teal font-bold' : ''
                            }`}
                    >
                        SHOP
                    </Link>
                    <Link to="/admin" className="text-gray-600 hover:text-white transition-colors">ADMIN</Link>
                </div>

                <div className="flex items-center space-x-6">
                    <button onClick={toggleCart} className="relative text-white hover:text-neon-violet transition-colors">
                        <FaShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {/* Shop Now button removed as per request */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
