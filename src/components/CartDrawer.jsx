import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const { isDrawerOpen, closeDrawer, cartItems, updateQuantity, removeItem, cartTotal, cartCount, goTo } = useCart();

  const handleCheckout = () => {
    closeDrawer();
    goTo('checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={closeDrawer} />
      <div className={`cart-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Your Cart</h2>
            {cartCount > 0 && <p className="drawer-count">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>}
          </div>
          <button onClick={closeDrawer} className="btn-icon"><X size={22} /></button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={52} strokeWidth={1} />
              <p>Your cart is empty</p>
              <button className="btn" onClick={closeDrawer}>Continue Shopping</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name}
                    onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${item.id}/200/200`; }} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <span className="cart-item-name">{item.name}</span>
                    <button onClick={() => removeItem(item.id)} className="btn-icon cart-remove"><X size={14} /></button>
                  </div>
                  <span className="cart-item-cat">{item.category}</span>
                  <div className="cart-item-bottom">
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
                    </div>
                    <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-promo">
              <input type="text" placeholder="Promo code" className="promo-input" />
              <button className="promo-btn">Apply</button>
            </div>
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <span className="subtotal-amt">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="drawer-note">Shipping & taxes calculated at checkout</p>
            <button className="btn checkout-btn" onClick={handleCheckout}>
              Checkout <ArrowRight size={16} />
            </button>
            <button className="continue-btn" onClick={closeDrawer}>Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
};
