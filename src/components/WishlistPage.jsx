import React from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart, goTo } = useCart();

  return (
    <div className="wishlist-page">
      <div className="container">
        <button className="back-link" onClick={() => goTo('shop')}><ArrowLeft size={16} /> Back to shop</button>
        <div className="wishlist-header">
          <h2 className="font-serif">My Wishlist</h2>
          <span className="shop-count">{wishlist.length} items saved</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="cart-empty" style={{ minHeight: '40vh' }}>
            <Heart size={52} strokeWidth={1} />
            <p>Your wishlist is empty</p>
            <button className="btn" onClick={() => goTo('shop')}>Discover Products</button>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
              <button className="btn" onClick={() => { wishlist.forEach(p => addToCart(p)); }}>
                <ShoppingBag size={16} /> Add All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
