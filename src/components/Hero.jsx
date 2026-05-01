import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const { goTo } = useCart();

  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
          alt="Minimalist interior"
          className="hero-img"
        />
        <div className="hero-overlay" />
      </div>
      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-eyebrow">New Collection — SS 2025</p>
          <h1 className="hero-h1">Curated objects<br />for the modern space.</h1>
          <p className="hero-sub">Artisanal home goods crafted with intention. Designed to elevate your everyday rituals.</p>
          <div className="hero-btns">
            <button className="btn hero-btn-primary" onClick={() => goTo('shop')}>
              Shop Collection <ArrowRight size={16} />
            </button>
            <button className="btn-ghost" onClick={() => goTo('shop')}>Explore Lookbook</button>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="container hero-stats-inner">
          <div className="hero-stat"><span className="stat-num">2,400+</span><span className="stat-label">Happy Customers</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="stat-num">32</span><span className="stat-label">Curated Products</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="stat-num">100%</span><span className="stat-label">Ethically Sourced</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="stat-num">4.9★</span><span className="stat-label">Average Rating</span></div>
        </div>
      </div>
    </section>
  );
};
