
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { motion } from 'framer-motion';
import ModelSelector from '../../components/Shop/ModelSelector';
import { useToast } from '../../context/ToastContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();
    const preSelectedModelId = searchParams.get('model');

    const { products, addToCart, masterData } = useShop();
    const [selectedModelId, setSelectedModelId] = useState('');

    // Find product from list (since we fetch all on load)
    const product = products.find(p => p.id === id);

    // Effect to handle auto-selection from URL or default
    useEffect(() => {
        if (product && masterData && masterData.models && masterData.models.length > 0) {
            // 1. Try to select from URL param
            if (preSelectedModelId) {
                // Check if this product actually supports the pre-selected model
                const isSupported = product.variants?.some(v => v.modelId === preSelectedModelId);
                if (isSupported) {
                    setSelectedModelId(preSelectedModelId);
                    return;
                }
            }

            // 2. If no valid URL param, we could optionally default to the first available variant
            // if (product.variants && product.variants.length > 0) {
            //     setSelectedModelId(product.variants[0].modelId);
            // }
        }
    }, [product, masterData, preSelectedModelId]);

    if (!product) return <div className="pt-24 text-center text-white">Loading product or not found...</div>;

    // Derived State
    const selectedVariant = product.variants?.find(v => v.modelId === selectedModelId);
    const price = selectedVariant ? selectedVariant.price : product.basePrice;

    // Get pretty name for the selected model
    const modelObj = masterData.models.find(m => m.id === selectedModelId);
    const modelName = modelObj ? modelObj.name : '';

    const handleAddToCart = () => {
        if (!selectedModelId) {
            showToast("Please select a model first!", "error");
            return;
        }
        addToCart(product, 1, { model: modelName, modelId: selectedModelId, price: price });
    };

    return (
        <div className="pt-24 min-h-screen container mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900 rounded-2xl p-8 flex items-center justify-center border border-gray-800 relative overflow-hidden group cursor-zoom-in"
                    onMouseMove={(e) => {
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;
                        e.currentTarget.style.setProperty('--x', `${x}%`);
                        e.currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                >
                    <div
                        className="w-full max-w-md h-[500px] flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[2]"
                        style={{
                            transformOrigin: 'var(--x) var(--y)',
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>
                </motion.div>

                {/* Details Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col justify-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">{product.name}</h1>
                    <p className="text-neon-cyan text-3xl font-mono mb-6 font-bold">
                        ₹{price}
                    </p>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Elevate your setup with the {product.name} skin.
                        Precision cut for your specific gear, ensuring protection and style.
                        Premium 3M material, easy bubble-free application.
                    </p>

                    {/* Model Selector */}
                    <div className="mb-8">
                        <ModelSelector
                            variants={product.variants || []}
                            masterData={masterData}
                            selectedModelId={selectedModelId}
                            onSelect={setSelectedModelId}
                        />
                        {!selectedModelId && <p className="text-yellow-500 text-sm mt-3">Please select your console model to see the price.</p>}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedModelId}
                        className={`w-full py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(176,38,255,0.3)]
                            ${selectedModelId
                                ? 'bg-neon-violet text-white hover:bg-white hover:text-black hover:scale-105 transform'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                            }`}
                    >
                        {selectedModelId ? 'ADD TO CART' : 'SELECT MODEL FIRST'}
                    </button>

                    <ul className="mt-8 space-y-2 text-sm text-gray-500">
                        <li className="flex items-center gap-2">✓ Precision Cut</li>
                        <li className="flex items-center gap-2">✓ No Residue Removal</li>
                        <li className="flex items-center gap-2">✓ Water & Scratch Resistant</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
