
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);


    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const closeCart = () => setIsCartOpen(false);
    const openCart = () => setIsCartOpen(true);
    const [masterData, setMasterData] = useState({ console_types: [], brands: [], models: [] });

    // Fetch products and master data on load
    useEffect(() => {
        fetchProducts();
        fetchMasterData();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMasterData = async () => {
        try {
            const res = await axios.get('/api/master-data');
            setMasterData(res.data);
        } catch (err) {
            console.error("Error fetching master data:", err);
        }
    };

    const addToCart = (product, quantity = 1, options = {}) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options));
            if (existing) {
                return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity, options }];
        });
        setIsCartOpen(true); // Auto open cart when added
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    };

    return (
        <ShopContext.Provider value={{ products, cart, masterData, addToCart, removeFromCart, updateQuantity, loading, fetchProducts, isCartOpen, toggleCart, closeCart, openCart }}>
            {children}
        </ShopContext.Provider>
    );
};
