
import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash } from 'react-icons/fa';

const CartSidebar = () => {
    const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity } = useShop();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + (parseInt(item.options?.price || item.price || 0) * item.quantity), 0);

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-2xl font-bold font-display text-white">Your Cart ({cart.length})</h2>
                            <button onClick={closeCart} className="text-gray-400 hover:text-white transition-colors">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 mt-20">
                                    <p>Your cart feels light.</p>
                                    <button onClick={closeCart} className="mt-4 text-neon-violet hover:underline">Continue Shopping</button>
                                </div>
                            ) : (
                                cart.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 bg-gray-800 p-3 rounded-lg border border-gray-700">
                                        <div className="w-20 h-20 bg-gray-900 rounded overflow-hidden flex items-center justify-center">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-white">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-400">Model: {item.options.model}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center gap-3 bg-gray-900 rounded border border-gray-700 px-2">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white px-1 font-bold">-</button>
                                                    <span className="text-sm text-gray-200">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white px-1 font-bold">+</button>
                                                </div>
                                                <span className="font-mono text-neon-cyan">₹{(item.options?.price || item.price) * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-800 bg-gray-900">
                                <div className="flex justify-between mb-4 text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-colors"
                                >
                                    CHECKOUT NOW
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
