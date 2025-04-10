
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api, Product } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { ArrowLeft, ShoppingCart, Star, Plus, Minus } from "lucide-react";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productData = await api.getProduct(parseInt(id));
        setProduct(productData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Format price as USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<Star key={i} className="star star-filled" />);
      } else {
        stars.push(<Star key={i} className="star star-empty" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <div className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">Products</Link>
        </div>
        <div className="breadcrumb-separator">/</div>
        <div className="breadcrumb-item">
          <span>{product?.title || "Product Details"}</span>
        </div>
      </div>

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="back-icon" />
        Back
      </button>

      {isLoading ? (
        <div className="product-container">
          <div className="product-image-section">
            <div className="skeleton skeleton-image"></div>
          </div>
          <div className="product-info-section">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-rating"></div>
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      ) : error ? (
        <div className="error-card">
          <div className="error-content">
            <div className="error-message">
              <h2 className="error-title">Error</h2>
              <p className="error-text">{error}</p>
              <button 
                onClick={() => navigate("/")} 
                className="to-products-button"
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      ) : product && (
        <div className="product-container animate-fade-in">
          <div className="product-image-section">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="rating-container">
              <div className="stars-container">
                {renderStarRating(product.rating.rate)}
              </div>
              <span className="rating-text">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="product-price">
              {formatPrice(product.price)}
            </div>
            
            <div className="description-container">
              <h3 className="description-title">Description</h3>
              <p className="description-text">{product.description}</p>
            </div>
            
            <div className="quantity-container">
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <div className="quantity-value">
                  {quantity}
                </div>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-button"
            >
              <ShoppingCart className="cart-icon" />
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
