import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { SlidersHorizontal, X } from 'lucide-react';

const categories = ['All', 'Ceramics', 'Textiles', 'Apothecary', 'Print'];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
  { label: 'Newest', value: 'newest' },
];

export const ProductGrid = ({ searchQuery = '' }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState(250);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    list = list.filter(p => {
      const effectivePrice = p.salePercent ? Math.round(p.price * (1 - p.salePercent / 100)) : p.price;
      return effectivePrice <= priceRange;
    });
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, sort, searchQuery, priceRange]);

  return (
    <section className="shop-section">
      <div className="container">
        <div className="shop-header">
          <div>
            <h2 className="shop-title">Our Collection</h2>
            <p className="shop-count">{filtered.length} products</p>
          </div>
          <div className="shop-controls">
            <div className="price-filter">
              <label>Max Price: <strong>${priceRange}</strong></label>
              <input type="range" min={15} max={250} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="price-slider" />
            </div>
            <div className="sort-wrap">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="cat-pills">
          {categories.map(c => (
            <button key={c} className={`cat-pill ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No products found.</p>
            <button className="btn" onClick={() => { setActiveCategory('All'); setPriceRange(250); }}>Reset Filters</button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  );
};
