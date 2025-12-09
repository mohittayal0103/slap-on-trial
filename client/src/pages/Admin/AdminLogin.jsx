
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/admin/login`, { username, password });
            if (res.data.success) {
                // In a real app, store token. For now, simple redirect.
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-neon-blue text-center">Admin Access</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-neon-blue outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:border-neon-blue outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-neon-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Enter Portal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
