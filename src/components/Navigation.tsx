
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, LogOut, Menu, X, User } from "lucide-react";
import "./Navigation.css";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo and Brand */}
          <div className="header-logo">
            <Link 
              to="/" 
              className="logo-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart className="logo-icon" />
              Cartify
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {isAuthenticated && (
              <>
                <Link to="/" className="nav-link">
                  Products
                </Link>
                <Link to="/cart" className="cart-link">
                  <ShoppingCart className="cart-icon" />
                  {itemCount > 0 && (
                    <span className="cart-badge">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <div className="user-info">
                  <User className="user-icon" />
                  {user}
                </div>
                <button 
                  className="logout-button"
                  onClick={handleLogout} 
                >
                  <LogOut className="logout-icon" />
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="nav-link"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button-container">
            <button 
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="mobile-menu-icon" />
              ) : (
                <Menu className="mobile-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {isAuthenticated && (
            <>
              <Link 
                to="/" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart ({itemCount})
              </Link>
              <div className="mobile-user-info">
                Signed in as {user}
              </div>
              <button 
                className="mobile-logout-button"
                onClick={handleLogout} 
              >
                <LogOut className="logout-icon" />
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <Link 
              to="/login" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
