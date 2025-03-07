// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Categories from './components/Categories';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Categories onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/category/:category"
          element={
            isAuthenticated ? <Products /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/product/:id"
          element={
            isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
