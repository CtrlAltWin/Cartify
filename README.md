
# Cartify - E-Commerce Shopping App

A simple e-commerce application built with React and plain CSS.

## Overview

Cartify is a lightweight e-commerce application that allows users to browse products, view product details, add items to their cart, and manage their shopping experience. The application features user authentication, responsive design, and a clean user interface.

## Features

- **User Authentication**: Secure login functionality
- **Product Browsing**: View a list of available products
- **Product Details**: Examine detailed information about specific products
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Responsive Design**: Optimized for mobile and desktop viewing

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Plain CSS**: For styling (no utility frameworks)
- **JavaScript**: Programming language (no TypeScript)
- **Fetch API**: For data fetching
- **Context API**: For state management

## Project Structure

```
cartify/
├── public/              # Static files
├── src/                 # Source files
│   ├── components/      # Reusable components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.js           # Main App component
│   └── main.js          # Entry point
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd cartify
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Development

The project uses Vite for fast development and building. Available scripts:

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally

## License

This project is licensed under the MIT License - see the LICENSE file for details.
