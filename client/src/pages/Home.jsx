
import React from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import ProductShowcase from '../components/ProductShowcase/ProductShowcase';
import SupportedModels from '../components/SupportedModels/SupportedModels';
import BeforeAfter from '../components/BeforeAfter/BeforeAfter';
import Reviews from '../components/Reviews/Reviews';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Gallery from '../components/Gallery/Gallery';
import Contact from '../components/Contact/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <ProductShowcase />
            <HowItWorks />
            {/* <SupportedModels /> */}
            <BeforeAfter />
            <Reviews />
            <Contact />
            {/* <Gallery /> */}
        </>
    );
};

export default Home;
