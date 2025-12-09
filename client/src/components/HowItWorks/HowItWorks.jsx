import React from 'react';

const HowItWorks = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="w-16 h-16 rounded-full bg-neon-violet/20 text-neon-violet flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                        <h3 className="text-xl font-bold mb-2">Choose Your Model</h3>
                        <p className="text-gray-400">Select your specific DJ console model from our extensive list.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                        <h3 className="text-xl font-bold mb-2">Pick Your Skin</h3>
                        <p className="text-gray-400">Browse our premium designs or customize your own.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                        <h3 className="text-xl font-bold mb-2">Peel, Slap On, Play</h3>
                        <p className="text-gray-400">Easy bubble-free application. Ready to perform in minutes.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
