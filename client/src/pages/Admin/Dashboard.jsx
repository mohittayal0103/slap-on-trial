import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/api/orders');
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await axios.post('/api/orders/update-status', { orderId, status: newStatus });
            fetchOrders();
            showToast(`Order status updated to ${newStatus}`, "success");
        } catch (err) {
            showToast('Failed to update status', "error");
        }
    };

    const addTracking = async (orderId) => {
        const link = prompt("Enter Tracking Link:");
        if (link) {
            try {
                await axios.post('/api/orders/update-status', { orderId, status: 'Shipped', trackingLink: link });
                fetchOrders();
                showToast("Order shipped & tracking added!", "success");
            } catch (err) {
                showToast('Failed to update tracking', "error");
            }
        }
    }

    if (loading) return <div className="pt-24 text-center">Loading Dashboard...</div>;

    return (
        <div className="container mx-auto pt-24 px-4 pb-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold font-display text-white">Admin Dashboard</h1>
                <div className="space-x-4">
                    <button onClick={fetchOrders} className="bg-gray-700 text-white px-4 py-2 rounded">Refresh</button>
                    {/* Placeholder for Add Product Link */}
                    <button className="bg-neon-violet text-white px-4 py-2 rounded">Add Product</button>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 overflow-x-auto">
                <h2 className="text-2xl mb-4 font-bold border-b border-gray-700 pb-2">Recent Orders</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Items</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="6" className="p-4 text-center text-gray-500">No orders found.</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-750">
                                    <td className="p-3 font-mono text-sm text-gray-300">{order.id}</td>
                                    <td className="p-3">
                                        <div className="font-bold">{order.name}</div>
                                        <div className="text-xs text-gray-400">{order.email}</div>
                                    </td>
                                    <td className="p-3">
                                        {order.items && order.items.map((item, idx) => (
                                            <div key={idx} className="text-sm">
                                                {item.name} <span className="text-gray-500">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-3 font-mono">₹{order.total}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold 
                                            ${order.status === 'Placed' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                                            ${order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500' : ''}
                                            ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : ''}
                                        `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        {order.status === 'Placed' && (
                                            <button
                                                onClick={() => addTracking(order.id)}
                                                className="text-xs bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded"
                                            >
                                                Ship + Track
                                            </button>
                                        )}
                                        {order.status === 'Shipped' && (
                                            <button
                                                onClick={() => updateStatus(order.id, 'Delivered')}
                                                className="text-xs bg-green-600 hover:bg-green-500 px-2 py-1 rounded"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
