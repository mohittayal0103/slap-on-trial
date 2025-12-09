import React, { useState } from 'react';
import { motion } from 'framer-motion';
import beforeImage from '../../assets/images/before.png';
import afterImage from '../../assets/images/after.png';

const BeforeAfter = () => {
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleDrag = (e) => {
        const rect = e.currentTarget.getBoundingClientRect(); // Use currentTarget for the div
        const x = e.clientX - rect.left;
        const width = rect.width;
        const position = Math.max(0, Math.min(100, (x / width) * 100));
        setSliderPosition(position);
    };

    return (
        <section className="py-20 bg-dark-card/30">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-16"
                >
                    The <span className="text-neon-violet">Transformation</span>
                </motion.h2>

                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-col-resize"
                    onMouseMove={handleDrag}
                    onTouchMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect(); // Use currentTarget for the div
                        const x = e.touches[0].clientX - rect.left;
                        const width = rect.width;
                        const position = Math.max(0, Math.min(100, (x / width) * 100));
                        setSliderPosition(position);
                    }}
                >
                    {/* After Image (Background) */}
                    <img src={afterImage} alt="After Skin" className="absolute inset-0 w-full h-full object-cover" />

                    {/* Before Image (Foreground, Clipped) */}
                    <div
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    >
                        <img src={beforeImage} alt="Before Skin" className="absolute inset-0 w-full h-full object-cover" />
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black font-bold text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10">Before</div>
                    <div className="absolute top-4 right-4 bg-neon-violet/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10">After</div>
                </div>

                <p className="mt-6 text-gray-400">Drag the slider to see the difference</p>
            </div>
        </section>
    );
};

export default BeforeAfter;
