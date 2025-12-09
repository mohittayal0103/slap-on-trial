import React from 'react';
import { FaShieldAlt, FaPalette, FaRulerCombined, FaTint, FaFire, FaStickyNote } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    { icon: <FaShieldAlt />, title: "Scratch Protection", desc: "Premium lamination that guards your gear against scratches, spills, and daily wear.", color: "text-neon-teal" },
    { icon: <FaPalette />, title: "Stunning Designs", desc: "Transform your setup with high-definition prints and premium textures.", color: "text-neon-violet" },
    { icon: <FaRulerCombined />, title: "Perfect Fit", desc: "Laser-cut precision for every button, fader, and knob on your specific model.", color: "text-white" },
    { icon: <FaTint />, title: "Bubble-free", desc: "Easy peel-and-stick application with air-release technology.", color: "text-green-400" },
    { icon: <FaStickyNote />, title: "No Residue", desc: "Removes cleanly when you want to switch styles, leaving no sticky mess.", color: "text-white" },
    { icon: <FaFire />, title: "Heat Resistant", desc: "Durable material that withstands the heat of long DJ sets.", color: "text-red-500" },
];

const Features = () => {
    return (
        <section id="features" className="py-10 bg-dark-card/50">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    Why Your Console Needs a <span className="text-neon-violet">Slap On!</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-teal/50 transition-all hover:-translate-y-2 group"
                        >
                            <div className={`text-4xl mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>{feature.icon}</div>
                            <h3 className={`text-xl font-bold mb-4 ${feature.color}`}>{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
