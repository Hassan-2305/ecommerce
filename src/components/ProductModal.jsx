import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ChevronLeft, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal = () => {
  const { activeModal, closeModal, addToCart, toggleWishlist, isWishlisted } = useCart();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  if (!activeModal) return null;
  const p = activeModal;
  const wishlisted = isWishlisted(p.id);
  const salePrice = p.salePercent ? Math.round(p.price * (1 - p.salePercent / 100)) : null;

  const images = [p.image, p.image2 || p.image, p.image3 || p.image].filter(Boolean);

  const handleAdd = () => {
    addToCart(p, qty);
    closeModal();
  };

  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="product-modal">
        <button className="modal-close" onClick={closeModal}><X size={22} /></button>

        <div className="modal-grid">
          {/* Images */}
          <div className="modal-images">
            <div className="modal-main-img">
              <img src={images[imgIdx]} alt={p.name}
                onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${p.id}/700/900`; }} />
              {images.length > 1 && (
                <>
                  <button className="img-nav prev" onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}><ChevronLeft size={20} /></button>
                  <button className="img-nav next" onClick={() => setImgIdx(i => (i + 1) % images.length)}><ChevronRight size={20} /></button>
                </>
              )}
            </div>
            <div className="modal-thumbs">
              {images.map((img, i) => (
                <button key={i} className={`thumb ${imgIdx === i ? 'active' : ''}`} onClick={() => setImgIdx(i)}>
                  <img src={img} alt="" onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${p.id}${i}/120/120`; }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="modal-details">
            <span className="modal-cat">{p.category}</span>
            <h2 className="modal-name">{p.name}</h2>

            <div className="modal-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < (p.rating || 4) ? '#c5a059' : 'none'} stroke="#c5a059" />)}
              <span className="modal-review-count">({p.reviews || 42} reviews)</span>
            </div>

            <div className="modal-price">
              {salePrice ? (
                <><span className="modal-sale-price">${salePrice}</span><span className="modal-orig-price">${p.price}</span><span className="sale-badge">Save {p.salePercent}%</span></>
              ) : (
                <span className="modal-main-price">${p.price}</span>
              )}
            </div>

            <p className="modal-desc">{p.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Handcrafted with care using the finest materials sourced from ethical suppliers.</p>

            <div className="modal-qty-row">
              <span className="modal-label">Quantity</span>
              <div className="modal-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}><X size={12} style={{ transform: 'rotate(45deg)' }} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn modal-add-btn" onClick={handleAdd}>
                <ShoppingBag size={17} /> Add to Cart
              </button>
              <button className={`modal-wish-btn ${wishlisted ? 'active' : ''}`} onClick={() => toggleWishlist(p)}>
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="modal-perks">
              <div className="perk"><Truck size={16} /><span>Free shipping over $75</span></div>
              <div className="perk"><RefreshCw size={16} /><span>30-day returns</span></div>
              <div className="perk"><Shield size={16} /><span>Secure checkout</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
