
import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const Checkout = () => {
    const { cart, setCart } = useShop();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', address: '', phone: '', paymentMethod: 'cod'
    });

    const total = cart.reduce((acc, item) => acc + (parseInt(item.options?.price || item.price || 0) * item.quantity), 0);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.paymentMethod === 'razorpay') {
            // Mock Razorpay Flow
            const confirmed = window.confirm("Mock Razorpay Payment: Click OK to authorize payment of ₹" + total);
            if (!confirmed) return;
        }

        const orderData = {
            items: cart,
            total,
            ...formData
        };

        try {
            const res = await axios.post(`${API_URL}/orders`, orderData);
            if (res.data.success) {
                showToast("Order Placed Successfully!", "success");

                // Delay redirect to let user see the toast
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 2000);
            }
        } catch (err) {
            showToast("Order failed! Please try again.", "error");
        }
    };

    return (
        <div className="pt-24 px-4 container mx-auto pb-10 text-white max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 font-display">Checkout</h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Full Name" required onChange={handleChange} className="bg-gray-900 border border-gray-600 p-3 rounded text-white" />
                        <input name="phone" placeholder="Phone Number" required onChange={handleChange} className="bg-gray-900 border border-gray-600 p-3 rounded text-white" />
                    </div>
                    <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 p-3 rounded text-white" />
                    <textarea name="address" placeholder="Shipping Address" required rows="3" onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 p-3 rounded text-white"></textarea>

                    <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 pt-4">Payment Method</h2>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 p-3 bg-gray-900 rounded border border-gray-700 cursor-pointer hover:border-neon-blue">
                            <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="text-neon-blue focus:ring-neon-blue" />
                            <span>Cash on Delivery (COD)</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 bg-gray-900 rounded border border-gray-700 cursor-pointer hover:border-neon-blue">
                            <input type="radio" name="paymentMethod" value="razorpay" checked={formData.paymentMethod === 'razorpay'} onChange={handleChange} className="text-neon-blue focus:ring-neon-blue" />
                            <span>Razorpay (UPI, Card, Netbanking)</span>
                        </label>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total to Pay</span>
                            <span className="text-neon-green">₹{total}</span>
                        </div>
                        <button type="submit" className="w-full bg-neon-green text-black font-bold py-4 rounded hover:bg-green-400 transition text-lg">
                            PLACE ORDER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
