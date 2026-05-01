import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // product object
  const [activePage, setActivePage] = useState('shop'); // 'shop' | 'checkout' | 'wishlist'

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const openModal = (product) => setActiveModal(product);
  const closeModal = () => setActiveModal(null);
  const goTo = (page) => setActivePage(page);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToast({ message, id, type });
    setTimeout(() => setToast(t => t?.id === id ? null : t), 3000);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const updateQuantity = useCallback((id, quantity) => {
    setCartItems(prev => quantity <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, quantity } : i));
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    showToast('Item removed from cart');
  }, [showToast]);

  const clearCart = useCallback(() => setCartItems([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const has = prev.find(i => i.id === product.id);
      if (has) { showToast('Removed from wishlist'); return prev.filter(i => i.id !== product.id); }
      showToast('Added to wishlist ♥');
      return [...prev, product];
    });
  }, [showToast]);

  const isWishlisted = (id) => wishlist.some(i => i.id === id);

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeItem, clearCart,
      cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      isDrawerOpen, openDrawer, closeDrawer,
      toast, activeModal, openModal, closeModal,
      activePage, goTo,
    }}>
      {children}
    </CartContext.Provider>
  );
};
