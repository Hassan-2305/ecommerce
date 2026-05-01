import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistPage } from './components/WishlistPage';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const AppInner = () => {
  const { activePage } = useCart();

  return (
    <div className="app-root">
      <Navbar />

      {activePage === 'shop' && (
        <main>
          <Hero />
          <ProductGrid />
        </main>
      )}

      {activePage === 'checkout' && (
        <main style={{ paddingTop: '5rem' }}>
          <CheckoutPage />
        </main>
      )}

      {activePage === 'wishlist' && (
        <main style={{ paddingTop: '5rem' }}>
          <WishlistPage />
        </main>
      )}

      {activePage === 'shop' && <Footer />}

      <CartDrawer />
      <ProductModal />
      <Toast />
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}

export default App;
