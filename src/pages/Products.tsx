
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { api, Product, Category } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { Search, ShoppingCart, Filter } from "lucide-react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { addToCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products based on category and search query
  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  const handleCategoryChange = async (category: Category | "all") => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  // Format price as USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="product-card">
        <div className="p-4">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Discover our products</h1>

      {/* Search and filter section */}
      <div className="search-filter-container">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="dropdown-container" ref={dropdownRef}>
          <button 
            className="filter-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Filter className="filter-icon" />
            {selectedCategory === "all" ? "All Categories" : selectedCategory}
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-label">Categories</div>
              <div className="dropdown-separator"></div>
              <button 
                className="dropdown-item"
                onClick={() => handleCategoryChange("all")}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className="dropdown-item"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {/* Product grid */}
      {isLoading ? (
        <div className="products-grid">
          {renderSkeletons()}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="empty-results">
              <p className="empty-message">No products found matching your criteria.</p>
              <button 
                className="clear-button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="products-grid animate-fade-in">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                      />
                    </div>
                    <div className="product-content">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-price">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                  <div className="product-footer">
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="cart-icon" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
