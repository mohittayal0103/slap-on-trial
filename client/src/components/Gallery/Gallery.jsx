import React from 'react';
import { motion } from 'framer-motion';

const images = [
    '/assets/skins/og-blue.png',
    '/assets/skins/og-black.png',
    '/assets/skins/matter.png',
    '/assets/skins/aurora.png'
];

const Gallery = () => {
    return (
        <section className="py-20 bg-dark-card/30">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    #SlapOn<span className="text-neon-teal">Squad</span>
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="aspect-square bg-gray-900 rounded-xl overflow-hidden hover:opacity-80 transition-opacity cursor-pointer relative group flex items-center justify-center p-2"
                        >
                            <img src={img} alt="Gallery" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-bold">@dj_user{i + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
