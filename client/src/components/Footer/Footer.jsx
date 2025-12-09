import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-violet to-neon-teal bg-clip-text text-transparent mb-6">Slap On!</h3>
                        <p className="text-gray-400 mb-6">Premium protection and style for your DJ gear. Made for DJs, by Designers.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-neon-violet transition-colors text-xl"><FaInstagram /></a>
                            <a href="#" className="text-white hover:text-neon-violet transition-colors text-xl"><FaYoutube /></a>
                            <a href="#" className="text-white hover:text-neon-violet transition-colors text-xl"><FaFacebook /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Shop</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">All Skins</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
                        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold transition-all w-full justify-center mb-4">
                            <FaWhatsapp className="text-xl" /> Chat on WhatsApp
                        </button>
                        <p className="text-gray-400 text-sm">
                            Questions? We're here to help 24/7.
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Slap On! All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
