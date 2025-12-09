
import React from 'react';

const Contact = () => {
    return (
        <section className="bg-black py-20 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-gray-900/50 p-8 rounded-2xl border border-gray-800">

                    {/* Visiting Card Image */}
                    <div className="flex-1 max-w-lg">
                        <img
                            src="/assets/skins/visiting card.png"
                            alt="Visiting Card"
                            className="w-full rounded-xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Extracted Details - Placeholders to be filled by user */}
                    <div className="flex-1 text-left space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold font-display text-neon-violet mb-2">Skins For All DJ Gear</h2>
                            <p className="text-xl text-gray-300 italic">"Slap It On! - Make It Yours!"</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-start gap-3">
                                <span className="text-neon-cyan font-bold">EMAIL:</span>
                                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white transition-colors">marketing.slapon@gmail.com</a>
                            </div>
                            <div className="flex items-center justify-start gap-3">
                                <span className="text-neon-cyan font-bold">PHONE:</span>
                                <span className="text-gray-300">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center justify-start gap-3">
                                <span className="text-neon-cyan font-bold">INSTAGRAM:</span>
                                <span className="text-gray-300">@slapon.in</span>
                            </div>
                        </div>

                        {/* <p className="text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
                            *This section is generated based on your visiting card. Please update the text above with the exact details from the card.*
                        </p> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
