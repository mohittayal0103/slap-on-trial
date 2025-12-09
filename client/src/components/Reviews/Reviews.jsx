import React from 'react';

const Reviews = () => {
    return (
        <section id="reviews" className="py-20 bg-dark-card/50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">What DJs Are Saying</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex text-neon-teal mb-4">★★★★★</div>
                            <p className="text-gray-300 mb-6">"Absolutely game changing. My DDJ-400 looks brand new and the texture feels amazing."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                                <div>
                                    <h4 className="font-bold">DJ Mark</h4>
                                    <p className="text-sm text-gray-500">Club Resident</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
