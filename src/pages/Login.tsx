import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { ShoppingCart, Info } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await login({ username, password });
    if (success) {
      // Redirect to the page they were trying to access, or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-container">
            <ShoppingCart className="login-logo" />
          </div>
          <h2 className="login-title">Welcome to Cartify</h2>
          <p className="login-description">Demo store using Fake Store API</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-content">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={
                  errors.username ? "form-input input-error" : "form-input"
                }
              />
              {errors.username && (
                <p className="error-text">{errors.username}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password ? "form-input input-error" : "form-input"
                }
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <div className="credentials-info">
              <p>Demo credentials (pre-filled):</p>
              <p>
                Username: <span className="font-medium">johnd</span>
              </p>
              <p>
                Password: <span className="font-medium">m38rmF$</span>
              </p>
            </div>
          </div>
          <div className="login-footer">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Sign in to Demo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
