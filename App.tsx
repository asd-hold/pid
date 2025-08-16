import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { initializeTheme } from './features/theme-switcher/themeSlice';
import { fetchCart } from './features/cart/cartSlice';
import { fetchFavourites } from './features/favourites/favouritesSlice';
import { initializeCurrency } from './features/currency/currencySlice';
import { initializeMockData } from './shared/lib/mockData';

// Layout components
import { Header } from './widgets/header/Header';
import { Footer } from './widgets/footer/Footer';
import { Toaster } from './components/ui/toaster';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { Home } from './pages/home/Home';
import NotFound from './pages/NotFound';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Profile } from './pages/profile/Profile';
import { Cart } from './pages/cart/Cart';
import { Catalog } from './pages/catalog/Catalog';
import { Favourites } from './pages/favourites/Favourites';
import { ProductDetail } from './pages/product/ProductDetail';
import { Categories } from './pages/categories/Categories';

// Placeholder pages (will be implemented later)
import { PlaceholderPage } from './pages/PlaceholderPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize app state
    dispatch(initializeTheme());
    
    // Initialize mock data with a slight delay to avoid blocking initial render
    setTimeout(() => {
      initializeMockData();
    }, 100);
    
    // Initialize Redux state after mock data is ready
    setTimeout(() => {
      dispatch(fetchCart());
      dispatch(fetchFavourites());
      dispatch(initializeCurrency());
    }, 200);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/checkout" element={<PlaceholderPage title="Checkout" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<PlaceholderPage title="Order History" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-product" element={<PlaceholderPage title="Create Product" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default App;
