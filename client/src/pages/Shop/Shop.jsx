import React, { useEffect, useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import FilterSidebar from '../../components/Shop/FilterSidebar';
import { FaFilter } from 'react-icons/fa';

const Shop = () => {
    const { products, loading, fetchProducts, masterData } = useShop();
    const [filters, setFilters] = useState({ type: '', brand: '', model: '' });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter Logic
    const filteredProducts = products;
    // Note: Since skins are generic across models in this DB structure (variant based), 
    // the "Product" itself matches if it has a variant for the selected model, 
    // or if the user is filtering by Brand/Type, we check if the product *can* support a model of that brand/type.
    // However, given the current simple schema where "Product" = "Design", 
    // and "Variants" = "Specific Model Support", ANY design supports ANY model technically (in this business logic).
    // BUT the user request says "filter out unmatched options". 
    // IF specific designs were limited to specific brands, we would filter here.
    // FOR NOW: We will assume all designs are available for all models. 
    // So selecting a filter effectively PRE-SELECTS that model when they click a product?
    // OR, if designs *were* specific, we'd filter products.
    // Let's assume for this "Skin" shop, designs are universal.
    // The filter mainly serves to help them find their DEVICE first, then see designs.
    // Actually, maybe we should filter if a design isn't available for a model?
    // In our DB, all products have the same 3 mock variants.
    // Let's implement robust filtering: A product is shown IF it has a variant matching the selected Model.
    // If only Brand is selected, show if it has ANY variant for that brand.

    // Better Logic:
    // If Model selected: Show products having variant with modelId.
    // If Brand selected: Show products having variant with model belonging to that brand.
    // If Type selected: Show products having variant with model belonging to that type.

    const displayProducts = products.filter(product => {
        if (!filters.type && !filters.brand && !filters.model) return true;

        // Check if product has variants matching the criteria
        const hasMatchingVariant = product.variants.some(variant => {
            const modelFunc = masterData.models.find(m => m.id === variant.modelId);
            if (!modelFunc) return false; // Variant model not in master data?

            const matchType = filters.type ? modelFunc.typeId === filters.type : true;
            const matchBrand = filters.brand ? modelFunc.brandId === filters.brand : true;
            const matchModel = filters.model ? modelFunc.id === filters.model : true;

            return matchType && matchBrand && matchModel;
        });

        return hasMatchingVariant;
    });


    if (loading) return <div className="pt-24 text-center text-white">Loading Store...</div>;

    return (
        <div className="pt-24 px-4 container mx-auto pb-10 flex gap-8">
            {/* Sidebar (Desktop) */}
            <FilterSidebar
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                onFilterChange={setFilters}
            />

            <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-display uppercase tracking-wider">
                        Select Your Vibe
                    </h1>
                    <button
                        className="lg:hidden flex items-center gap-2 text-neon-teal border border-neon-teal px-4 py-2 rounded"
                        onClick={() => setIsMobileFilterOpen(true)}
                    >
                        <FaFilter /> Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProducts.map(product => (
                        <Link key={product.id} to={`/product/${product.id}${filters.model ? `?model=${filters.model}` : ''}`} className="group">
                            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-transform hover:scale-[1.02] duration-300">
                                <div className="h-64 overflow-hidden bg-gray-900 flex items-center justify-center relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h2 className="text-2xl font-bold text-white mb-1">{product.name}</h2>
                                        <p className="text-neon-cyan font-mono">
                                            {/* Show dynamic price range or base price */}
                                            From ₹{product.basePrice}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <button className="w-full bg-neon-violet/20 border border-neon-violet text-neon-violet py-2 rounded font-bold hover:bg-neon-violet hover:text-white transition-all">
                                        Configure Skin
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {displayProducts.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <p className="text-xl">No skins found for this configuration.</p>
                        <button onClick={() => setFilters({ type: '', brand: '', model: '' })} className="text-neon-teal mt-4 hover:underline">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
