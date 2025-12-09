import React from 'react';

const SupportedModels = () => {
    return (
        <section id="models" className="py-20 bg-dark-card/30">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-16">Supported Models</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {['Pioneer DDJ-400', 'DDJ-1000', 'DDJ-FLX4', 'XDJ-RX3', 'Denon Prime 4', 'CDJ-3000'].map((model) => (
                        <div key={model} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-neon-violet/20 hover:border-neon-violet transition-all cursor-default">
                            <span className="font-semibold text-gray-300">{model}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SupportedModels;
