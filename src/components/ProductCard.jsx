import React, { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, openModal } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={`product-card ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="card-badges">
        {product.badge && <span className={`badge-tag badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        {product.salePercent && <span className="badge-tag badge-sale">-{product.salePercent}%</span>}
      </div>

      {/* Wishlist */}
      <button
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        aria-label="Wishlist"
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <div className="card-img-wrap" onClick={() => openModal(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${product.id}/600/800`; }}
        />
        <div className="card-img-overlay">
          <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); openModal(product); }}>
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <h3 className="card-title" onClick={() => openModal(product)}>{product.name}</h3>

        <div className="card-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill={i < (product.rating || 4) ? '#c5a059' : 'none'} stroke="#c5a059" />
          ))}
          <span className="card-reviews">({product.reviews || Math.floor(Math.random() * 80 + 10)})</span>
        </div>

        <div className="card-footer">
          <div className="card-price">
            {product.salePercent ? (
              <>
                <span className="price-sale">${Math.round(product.price * (1 - product.salePercent / 100))}</span>
                <span className="price-original">${product.price}</span>
              </>
            ) : (
              <span className="price-main">${product.price}</span>
            )}
          </div>
          <button
            className={`add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label="Add to cart"
          >
            {added ? '✓' : <ShoppingBag size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
};
