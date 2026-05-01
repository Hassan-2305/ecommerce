import React from 'react';
import { useCart } from '../context/CartContext';
// social icons via SVG since lucide-react doesn't export them in this version

export const Footer = () => {
  const { goTo } = useCart();
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">ATELIER.</div>
            <p className="footer-brand-desc">Curated objects for the modern space. Elevate your everyday rituals with artisanal home goods crafted with intention.</p>
            <div style={{ display:'flex', gap:'.75rem', marginTop:'1.25rem' }}>
              {['IG','TW','FB'].map((s, i) => (
                <button key={i} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.6)', width:36, height:36, border:'none', cursor:'pointer', borderRadius:'50%', fontSize:'.75rem', fontWeight:700, fontFamily:'inherit' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <span onClick={() => goTo('shop')}>All Products</span>
            <span onClick={() => goTo('shop')}>Ceramics</span>
            <span onClick={() => goTo('shop')}>Textiles</span>
            <span onClick={() => goTo('shop')}>Apothecary</span>
            <span onClick={() => goTo('shop')}>Print</span>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">Our Story</a>
            <a href="#">Journal</a>
            <a href="#">Stockists</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-newsletter">
            <h4 style={{ fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.1em', opacity:.45, marginBottom:'1rem' }}>Newsletter</h4>
            <p>Sign up for curated updates, new arrivals, and 10% off your first order.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ATELIER. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
