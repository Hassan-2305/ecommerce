import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Heart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cartCount, openDrawer, wishlist, goTo } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      {/* Promo Banner */}
      <div className="promo-banner">
        Free shipping on all orders over $75 &nbsp;·&nbsp; Use code <strong>ATELIER10</strong> for 10% off
      </div>

      <nav className={`sticky-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <div className="nav-left">
            <button className="btn-icon mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={20} />
            </button>
            <div className="nav-links desktop-only">
              <button className="nav-link" onClick={() => goTo('shop')}>Shop</button>
              <span className="nav-divider">|</span>
              <button className="nav-link" onClick={() => goTo('shop')}>Ceramics</button>
              <button className="nav-link" onClick={() => goTo('shop')}>Textiles</button>
              <button className="nav-link" onClick={() => goTo('shop')}>Apothecary</button>
              <button className="nav-link" onClick={() => goTo('shop')}>Print</button>
            </div>
          </div>

          <div className="nav-logo" onClick={() => goTo('shop')} style={{ cursor: 'pointer' }}>
            ATELIER.
          </div>

          <div className="nav-right">
            <button className="btn-icon" onClick={() => setSearchOpen(s => !s)}>
              <Search size={20} />
            </button>
            <button className="btn-icon nav-wishlist" onClick={() => goTo('wishlist')}>
              <Heart size={20} />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </button>
            <button className="btn-icon nav-cart" onClick={openDrawer}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <div className="container">
            <div className="search-inner">
              <Search size={18} className="search-icon-sm" />
              <input
                autoFocus={searchOpen}
                type="text"
                placeholder="Search products…"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="search-input"
              />
              <button className="btn-icon" onClick={() => { setSearchOpen(false); setSearchVal(''); }}>
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <button className="nav-link" onClick={() => { goTo('shop'); setMenuOpen(false); }}>All Products</button>
            <button className="nav-link" onClick={() => { goTo('shop'); setMenuOpen(false); }}>Ceramics</button>
            <button className="nav-link" onClick={() => { goTo('shop'); setMenuOpen(false); }}>Textiles</button>
            <button className="nav-link" onClick={() => { goTo('shop'); setMenuOpen(false); }}>Apothecary</button>
            <button className="nav-link" onClick={() => { goTo('shop'); setMenuOpen(false); }}>Print</button>
          </div>
        )}
      </nav>
    </>
  );
};
