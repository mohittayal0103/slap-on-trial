import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
    const { products } = useShop();

    return (
        <section id="products" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    Featured <span className="text-neon-teal">Skins</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.filter(p => p.featured).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden bg-dark-card border border-white/10 hover:border-neon-violet transition-all hover:shadow-[0_0_20px_rgba(176,38,255,0.3)]"
                        >
                            <div className="aspect-square bg-gray-900 flex items-center justify-center overflow-hidden p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p className="font-bold mb-4 text-brand-yellow">₹{product.price || product.basePrice || '999'}</p>
                                <Link to={`/product/${product.id}`} className="block w-full py-3 rounded-lg border border-neon-violet text-neon-violet hover:bg-neon-violet hover:text-white transition-all font-semibold uppercase tracking-wider text-sm text-center">
                                    View Skin
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {products.length === 0 && (
                    <div className="text-center text-gray-500">Loading awesome skins...</div>
                )}
            </div>
        </section>
    );
};

export default ProductShowcase;
