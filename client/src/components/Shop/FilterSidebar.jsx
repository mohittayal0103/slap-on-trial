
import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';

const FilterSidebar = ({ onFilterChange, isOpen, onClose }) => {
    const { masterData } = useShop();
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Reset logic: Type change -> Reset Brand & Model. Brand change -> Reset Model.
    useEffect(() => {
        setSelectedBrand('');
        setSelectedModel('');
        onFilterChange({ type: selectedType, brand: '', model: '' });
    }, [selectedType]);

    useEffect(() => {
        setSelectedModel('');
        onFilterChange({ type: selectedType, brand: selectedBrand, model: '' });
    }, [selectedBrand]);

    useEffect(() => {
        onFilterChange({ type: selectedType, brand: selectedBrand, model: selectedModel });
    }, [selectedModel]);

    // Derived lists based on selection
    const filteredBrands = selectedType
        ? masterData.brands.filter(brand =>
            masterData.models.some(m => m.brandId === brand.id && m.typeId === selectedType)
        )
        : masterData.brands;

    const filteredModels = selectedBrand
        ? masterData.models.filter(m => m.brandId === selectedBrand && (selectedType ? m.typeId === selectedType : true))
        : [];

    return (
        <>
            {/* Desktop Sidebar (Always visible on large screens) */}
            <div className="hidden lg:flex flex-col w-64 pr-8 sticky top-24 h-[calc(100vh-6rem)]">
                <div className="flex-shrink-0 bg-black z-10 pb-2 border-b border-gray-700 mb-6">
                    <h3 className="text-xl font-bold text-neon-teal">Filter By</h3>
                </div>

                <div className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pb-10">
                    {/* Console Type */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Console Type</label>
                        <div className="space-y-2">
                            {masterData.console_types.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id === selectedType ? '' : type.id)}
                                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${selectedType === type.id
                                        ? 'bg-neon-violet text-white font-bold shadow-[0_0_10px_rgba(176,38,255,0.4)]'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Brand</label>
                        <div className="space-y-2">
                            {filteredBrands.map(brand => (
                                <button
                                    key={brand.id}
                                    onClick={() => setSelectedBrand(brand.id === selectedBrand ? '' : brand.id)}
                                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${selectedBrand === brand.id
                                        ? 'bg-neon-violet text-white font-bold shadow-[0_0_10px_rgba(176,38,255,0.4)]'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    {brand.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Model */}
                    <AnimatePresence>
                        {(selectedBrand || filteredModels.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <label className="block text-sm font-bold text-gray-400 mb-2">Model</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {filteredModels.length > 0 ? (
                                        filteredModels.map(model => (
                                            <button
                                                key={model.id}
                                                onClick={() => setSelectedModel(model.id === selectedModel ? '' : model.id)}
                                                className={`block w-full text-left px-3 py-2 rounded transition-colors text-sm ${selectedModel === model.id
                                                    ? 'bg-neon-violet text-white font-bold shadow-[0_0_10px_rgba(176,38,255,0.4)]'
                                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                    }`}
                                            >
                                                {model.name}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm">Select a Brand first</div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        className="fixed inset-0 z-[60] bg-black lg:hidden flex flex-col p-6"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-neon-teal">Filters</h2>
                            <button onClick={onClose} className="text-white">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Reusing logic for mobile (simplified for brevity, usually refactor to shared component) */}
                        <div className="space-y-6 overflow-y-auto flex-1">
                            {/* Console Type */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Console Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {masterData.console_types.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setSelectedType(type.id === selectedType ? '' : type.id)}
                                            className={`px-3 py-2 rounded border border-gray-700 ${selectedType === type.id ? 'bg-neon-violet border-neon-violet' : ''
                                                }`}
                                        >
                                            {type.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Brand</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {filteredBrands.map(brand => (
                                        <button
                                            key={brand.id}
                                            onClick={() => setSelectedBrand(brand.id === selectedBrand ? '' : brand.id)}
                                            className={`px-3 py-2 rounded border border-gray-700 ${selectedBrand === brand.id ? 'bg-neon-cyan text-black border-neon-cyan' : ''
                                                }`}
                                        >
                                            {brand.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Model */}
                            {(selectedBrand) && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Model</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {filteredModels.map(model => (
                                            <button
                                                key={model.id}
                                                onClick={() => setSelectedModel(model.id === selectedModel ? '' : model.id)}
                                                className={`px-3 py-2 rounded border border-gray-700 text-left ${selectedModel === model.id ? 'bg-neon-violet text-white border-neon-violet' : ''
                                                    }`}
                                            >
                                                {model.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full bg-neon-teal text-black font-bold py-3 rounded mt-4"
                        >
                            Apply Filters
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FilterSidebar;
