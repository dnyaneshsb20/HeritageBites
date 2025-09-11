import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterDrawer from './components/FilterDrawer';
import CategoryTabs from './components/CategoryTabs';
import ProductCard from './components/ProductCard';
import FeaturedFarmers from './components/FeaturedFarmers';
import ProductDetailModal from './components/ProductDetailModal';
import SearchBar from './components/SearchBar';

const IngredientMarketplace = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    states: [],
    certifications: [],
    priceRanges: []
  });

  // Mock product data
  const allProducts = [
    {
      id: 1,
      name: "Organic Turmeric Powder",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1609501676725-7186f734b2e1?w=400&h=400&fit=crop"
      ],
      price: 180,
      originalPrice: 220,
      unit: "500g",
      units: ["250g", "500g", "1kg"],
      rating: 4.8,
      reviewCount: 156,
      stock: 25,
      category: "spices",
      isOrganic: true,
      isFeatured: true,
      discount: 18,
      farmer: {
        name: "Ramesh Kumar",
        location: "Rajasthan",
        description: "Third-generation turmeric farmer specializing in organic cultivation using traditional methods."
      },
      certifications: ["Organic", "Fair Trade"],
      description: "Premium quality organic turmeric powder sourced directly from certified organic farms in Rajasthan. Known for its high curcumin content and vibrant golden color."
    },
    {
      id: 2,
      name: "Basmati Rice - Aged 2 Years",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      price: 450,
      originalPrice: 500,
      unit: "5kg",
      units: ["1kg", "5kg", "10kg"],
      rating: 4.9,
      reviewCount: 203,
      stock: 15,
      category: "grains",
      isOrganic: true,
      farmer: {
        name: "Harpreet Singh",
        location: "Punjab"
      },
      certifications: ["Organic", "Traditional"]
    },
    {
      id: 3,
      name: "Cold-Pressed Mustard Oil",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
      price: 320,
      unit: "1L",
      units: ["500ml", "1L", "2L"],
      rating: 4.7,
      reviewCount: 89,
      stock: 8,
      category: "oils",
      isOrganic: true,
      farmer: {
        name: "Suresh Patil",
        location: "Maharashtra"
      },
      certifications: ["Organic", "Cold-Pressed"]
    },
    {
      id: 4,
      name: "Red Chili Powder - Kashmiri",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
      price: 280,
      originalPrice: 320,
      unit: "250g",
      rating: 4.6,
      reviewCount: 134,
      stock: 32,
      category: "spices",
      isOrganic: false,
      isFeatured: true,
      discount: 12,
      farmer: {
        name: "Meera Devi",
        location: "Kashmir"
      },
      certifications: ["Traditional", "Pesticide Free"]
    },
    {
      id: 5,
      name: "Organic Black Gram (Urad Dal)",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop",
      price: 220,
      unit: "1kg",
      rating: 4.5,
      reviewCount: 67,
      stock: 18,
      category: "pulses",
      isOrganic: true,
      farmer: {
        name: "Lakshmi Devi",
        location: "Kerala"
      },
      certifications: ["Organic"]
    },
    {
      id: 6,
      name: "Finger Millet (Ragi) Flour",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
      price: 150,
      unit: "1kg",
      rating: 4.4,
      reviewCount: 45,
      stock: 22,
      category: "millets",
      isOrganic: true,
      farmer: {
        name: "Govind Rao",
        location: "Karnataka"
      },
      certifications: ["Organic", "Traditional"]
    },
    {
      id: 7,
      name: "Dried Curry Leaves",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
      price: 120,
      unit: "100g",
      rating: 4.3,
      reviewCount: 78,
      stock: 35,
      category: "herbs",
      isOrganic: true,
      farmer: {
        name: "Ravi Kumar",
        location: "Tamil Nadu"
      },
      certifications: ["Organic", "Sun-Dried"]
    },
    {
      id: 8,
      name: "Coconut Oil - Virgin",
      image: "https://images.unsplash.com/photo-1520950237264-6fe6e6c5b1b8?w=400&h=400&fit=crop",
      price: 380,
      unit: "1L",
      rating: 4.8,
      reviewCount: 192,
      stock: 12,
      category: "oils",
      isOrganic: true,
      isFeatured: true,
      farmer: {
        name: "Priya Nair",
        location: "Kerala"
      },
      certifications: ["Organic", "Virgin", "Cold-Pressed"]
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const productsPerPage = 12;

  // Filter and search logic
  useEffect(() => {
    let filtered = [...allProducts];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(product => product?.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.farmer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.farmer?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => filters?.categories?.includes(product?.category));
    }

    if (filters?.certifications?.length > 0) {
      filtered = filtered?.filter(product =>
        product?.certifications?.some(cert => 
          filters?.certifications?.some(filterCert => 
            cert?.toLowerCase()?.includes(filterCert?.toLowerCase())
          )
        )
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      default: // popularity
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [activeCategory, searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRecipeSearch = (recipeName) => {
    // Mock recipe-based ingredient search
    const recipeIngredients = {
      'butter chicken': ['turmeric', 'garam masala', 'cream', 'tomato'],
      'biryani': ['basmati rice', 'saffron', 'cardamom', 'bay leaves'],
      'dal tadka': ['urad dal', 'turmeric', 'cumin', 'mustard oil']
    };

    const ingredients = recipeIngredients?.[recipeName?.toLowerCase()] || [];
    if (ingredients?.length > 0) {
      const searchTerm = ingredients?.join(' ');
      setSearchQuery(searchTerm);
    }
  };

  const handleAddToCart = async (product) => {
    setCartItems(prev => {
      const existingItem = prev?.find(item => item?.id === product?.id);
      if (existingItem) {
        return prev?.map(item =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + (product?.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product?.quantity || 1 }];
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleToggleWishlist = (productId, isWishlisted) => {
    if (isWishlisted) {
      setWishlistItems(prev => [...prev, productId]);
    } else {
      setWishlistItems(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleFarmerClick = (farmer) => {
    console.log('Farmer clicked:', farmer);
    // Navigate to farmer profile or show farmer details
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      states: [],
      certifications: [],
      priceRanges: []
    });
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <Helmet>
        <title>Ingredient Marketplace - DishCover | Authentic Indian Ingredients</title>
        <meta name="description" content="Discover authentic indigenous ingredients directly from verified farmers. Shop organic spices, grains, oils, and traditional ingredients for your Indian recipes." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Category Navigation */}
        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <FilterDrawer
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFilterChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar 
                  onSearch={handleSearch}
                  onRecipeSearch={handleRecipeSearch}
                />
              </div>

              {/* Featured Farmers */}
              <FeaturedFarmers onFarmerClick={handleFarmerClick} />

              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="lg:hidden"
                  >
                    Filters
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    {filteredProducts?.length} products found
                    {searchQuery && (
                      <span> for "{searchQuery}"</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : currentProducts?.length > 0 ? (
                <div className={`grid gap-6 mb-8 ${
                  viewMode === 'grid' ?'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :'grid-cols-1'
                }`}>
                  {currentProducts?.map((product) => (
                    <ProductCard
                      key={product?.id}
                      product={{
                        ...product,
                        isWishlisted: wishlistItems?.includes(product?.id)
                      }}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(5, totalPages))]?.map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          onClick={() => setCurrentPage(pageNum)}
                          size="sm"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};

export default IngredientMarketplace;