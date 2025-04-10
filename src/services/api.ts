
const API_URL = 'https://fakestoreapi.com';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type Category = string;

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export const api = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed. Please check your credentials and try again.');
    }

    return response.json();
  },

  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products. Please try again later.');
    }

    return response.json();
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product details. Please try again later.');
    }

    return response.json();
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories. Please try again later.');
    }

    return response.json();
  },

  getProductsByCategory: async (category: Category): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products for this category. Please try again later.');
    }

    return response.json();
  },
};
