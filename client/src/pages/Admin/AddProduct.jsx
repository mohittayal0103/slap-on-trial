import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { useToast } from '../../context/ToastContext';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '', // e.g. Skin
        consoleType: '', // e.g. CDJ
        brand: '', // e.g. Pioneer
        model: '', // e.g. CDJ-3000
        image: '/assets/skins/og-blue.png' // Default or select from list
    });
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/products`, formData);
            showToast('Product Added Successfully!', "success");
            navigate('/admin/dashboard');
        } catch (err) {
            showToast('Error adding product', "error");
        }
    };

    return (
        <div className="pt-24 px-4 container mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg max-w-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1">Skin Name</label>
                        <input name="name" onChange={handleChange} className="w-full bg-gray-900 p-2 rounded border border-gray-700" placeholder="e.g. Aurora" required />
                    </div>
                    <div>
                        <label className="block mb-1">Price (₹)</label>
                        <input name="price" type="number" onChange={handleChange} className="w-full bg-gray-900 p-2 rounded border border-gray-700" placeholder="e.g. 1500" required />
                    </div>
                    <div>
                        <label className="block mb-1">Console Type</label>
                        <select name="consoleType" onChange={handleChange} className="w-full bg-gray-900 p-2 rounded border border-gray-700">
                            <option value="">Select Type</option>
                            <option value="CDJ">CDJ / Media Player</option>
                            <option value="Mixer">Mixer</option>
                            <option value="Controller">Controller</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Brand</label>
                        <input name="brand" onChange={handleChange} className="w-full bg-gray-900 p-2 rounded border border-gray-700" placeholder="e.g. Pioneer" />
                    </div>
                    <div>
                        <label className="block mb-1">Model</label>
                        <input name="model" onChange={handleChange} className="w-full bg-gray-900 p-2 rounded border border-gray-700" placeholder="e.g. CDJ-3000" />
                    </div>
                    <div>
                        <label className="block mb-1">Image Path</label>
                        <select name="image" onChange={handleChange} className="w-full bg-gray-900 p-2 rounded border border-gray-700">
                            <option value="/assets/skins/og-blue.png">OG Blue</option>
                            <option value="/assets/skins/og-black.png">OG Black</option>
                            <option value="/assets/skins/og-white.png">OG White</option>
                            <option value="/assets/skins/matter.png">Matter</option>
                            <option value="/assets/skins/aurora.png">Aurora</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-neon-green text-black font-bold py-2 px-4 rounded w-full hover:bg-green-400">Add to Catalog</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
