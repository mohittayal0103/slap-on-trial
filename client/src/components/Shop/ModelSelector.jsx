
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

const ModelSelector = ({ variants, masterData, selectedModelId, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Enrich variants with master data details
    const options = variants.map(variant => {
        const model = masterData.models.find(m => m.id === variant.modelId);
        if (!model) return null;
        const brand = masterData.brands.find(b => b.id === model.brandId);
        const type = masterData.console_types.find(t => t.id === model.typeId);

        return {
            ...variant,
            modelName: model.name,
            brandName: brand ? brand.name : '',
            typeName: type ? type.name : '',
            fullLabel: `${type ? type.name : ''} • ${brand ? brand.name : ''} • ${model.name}`
        };
    }).filter(Boolean); // Remove nulls

    const selectedOption = options.find(o => o.modelId === selectedModelId);

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">
                Select Your Console Model
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all text-left group ${isOpen
                        ? 'bg-gray-900 border-neon-violet shadow-[0_0_15px_rgba(176,38,255,0.2)]'
                        : 'bg-black border-gray-700 hover:border-gray-500'
                    }`}
            >
                <div>
                    {selectedOption ? (
                        <div>
                            <div className="text-white font-bold text-lg">{selectedOption.modelName}</div>
                            <div className="text-xs text-gray-400 mt-1">
                                {selectedOption.typeName} • {selectedOption.brandName}
                            </div>
                        </div>
                    ) : (
                        <span className="text-gray-400 font-medium">-- Choose Model --</span>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {selectedOption && (
                        <span className="text-neon-cyan font-mono font-bold">₹{selectedOption.price}</span>
                    )}
                    <FaChevronDown className={`text-neon-violet transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-80 overflow-y-auto custom-scrollbar"
                    >
                        {options.length > 0 ? (
                            options.map((option) => (
                                <button
                                    key={option.modelId}
                                    onClick={() => {
                                        onSelect(option.modelId);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between p-4 border-b border-gray-800 last:border-none transition-colors hover:bg-gray-800 ${selectedModelId === option.modelId ? 'bg-gray-800/50' : ''
                                        }`}
                                >
                                    <div className="text-left">
                                        <div className={`font-bold ${selectedModelId === option.modelId ? 'text-neon-violet' : 'text-white'
                                            }`}>
                                            {option.modelName}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {option.typeName} <span className="text-gray-600">|</span> {option.brandName}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-neon-cyan font-mono font-bold">₹{option.price}</span>
                                        {selectedModelId === option.modelId && <FaCheck className="text-neon-violet" />}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">No models available</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModelSelector;
