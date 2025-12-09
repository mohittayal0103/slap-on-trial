
import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useShop();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + (parseInt(item.options?.price || item.price || 0) * item.quantity), 0);

    return (
        <div className="pt-24 px-4 container mx-auto pb-10 text-white">
            <h1 className="text-3xl font-bold mb-8 font-display">Your Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-20 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-xl mb-4">Your cart is empty.</p>
                    <Link to="/shop" className="bg-neon-violet px-6 py-2 rounded text-white hover:bg-neon-blue transition">Start Shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item, idx) => (
                            <div key={idx} className="bg-gray-800 p-4 rounded-lg flex gap-4 items-center border border-gray-700">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-400">For: {item.options.model}</p>
                                    <div className="flex justify-between items-center w-full mt-2">
                                        <div className="flex items-center gap-3 bg-gray-900 rounded border border-gray-700 px-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white px-2 py-1 font-bold">-</button>
                                            <span className="text-sm text-gray-200">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white px-2 py-1 font-bold">+</button>
                                        </div>
                                        <div className="text-neon-cyan font-mono">₹{(item.options?.price || item.price) * item.quantity}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-400 text-sm underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg h-fit border border-gray-800 sticky top-24">
                        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between mb-6">
                            <span className="text-gray-400">Shipping</span>
                            <span className="text-green-400">Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold mb-6 pt-4 border-t border-gray-700">
                            <span>Total</span>
                            <span className="text-neon-cyan">₹{total}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-neon-blue py-3 rounded font-bold text-white hover:bg-blue-600 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
