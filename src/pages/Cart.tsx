
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import "./Cart.css";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleUpdateQuantity = (productId: number, change: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      alert("Order placed successfully! Thank you for your purchase.");
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  // Format price as USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-content">
            <div className="empty-cart-message">
              <ShoppingBag className="empty-cart-icon" />
              <h2 className="empty-cart-title">Your cart is empty</h2>
              <p className="empty-cart-text">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/" className="browse-button">Browse Products</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items-section">
            <div className="cart-items-card">
              <div className="cart-items-header">
                <h2 className="cart-items-title">Shopping Cart ({items.length} items)</h2>
              </div>
              <div className="cart-items-content">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-container">
                      <div className="cart-item-image-container">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="cart-item-image"
                        />
                      </div>
                      <div className="cart-item-info">
                        <Link to={`/product/${item.id}`} className="cart-item-title">
                          {item.title}
                        </Link>
                        <p className="cart-item-price">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-button"
                            onClick={() => handleUpdateQuantity(item.id, -1, item.quantity)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <div className="quantity-value">
                            {item.quantity}
                          </div>
                          <button
                            className="quantity-button"
                            onClick={() => handleUpdateQuantity(item.id, 1, item.quantity)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          className="remove-button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-separator"></div>
                  </div>
                ))}
              </div>
              <div className="cart-items-footer">
                <Link to="/" className="continue-button">
                  Continue Shopping
                </Link>
                <button 
                  className="clear-button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-card">
              <div className="summary-header">
                <h2 className="summary-title">Order Summary</h2>
                <p className="summary-description">
                  Complete your purchase by checking out
                </p>
              </div>
              <div className="summary-content">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">{formatPrice(total)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">Free</span>
                </div>
                <div className="summary-separator"></div>
                <div className="summary-total-row">
                  <span className="summary-total-label">Total</span>
                  <span className="summary-total-value">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="summary-footer">
                <button 
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    "Processing..."
                  ) : (
                    <>
                      Checkout <ArrowRight className="arrow-icon" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
