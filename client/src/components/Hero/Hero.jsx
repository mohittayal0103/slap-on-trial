import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/hero.png';

const Hero = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [displayedSubtext, setDisplayedSubtext] = useState('');
    const fullText = 'Make Your Console';
    const fullSubtext = 'Unstoppable';
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                // Start typing subtext after main text is done
                let subtextIndex = 0;
                const subtextInterval = setInterval(() => {
                    if (subtextIndex <= fullSubtext.length) {
                        setDisplayedSubtext(fullSubtext.slice(0, subtextIndex));
                        subtextIndex++;
                    } else {
                        clearInterval(subtextInterval);
                        setShowCursor(false);
                    }
                }, 80);
            }
        }, 100);

        // Blinking cursor effect
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {displayedText}
                        {displayedText === fullText && <br />}
                        {displayedText === fullText && (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-neon-violet">
                                {displayedSubtext}
                                {showCursor && displayedSubtext.length < fullSubtext.length && (
                                    <span className="animate-pulse">|</span>
                                )}
                            </span>
                        )}
                        {displayedText.length < fullText.length && showCursor && (
                            <span className="animate-pulse">|</span>
                        )}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0">
                        Customise | Personalize | Protect | Flex <br />
                        Shipping Worldwide From India.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/shop" className="bg-neon-teal text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:scale-105 inline-block">
                            Shop Now
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-neon-violet/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
                    <img src={heroImage} alt="DJ Console Skin" className="w-full max-w-2xl mx-auto drop-shadow-2xl rounded-2xl transform hover:rotate-2 transition-transform duration-500" />
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-violet/10 rounded-full blur-[120px] -z-10"></div>
        </section>
    );
};

export default Hero;
