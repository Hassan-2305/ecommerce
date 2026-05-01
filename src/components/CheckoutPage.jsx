import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, ArrowLeft, Lock } from 'lucide-react';

const steps = ['Cart', 'Information', 'Shipping', 'Payment'];

export const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart, goTo } = useCart();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: '', first: '', last: '', address: '', city: '', zip: '', country: '',
    shipping: 'standard',
    card: '', expiry: '', cvv: '', name: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const shipping = form.shipping === 'express' ? 12 : form.shipping === 'overnight' ? 22 : 0;
  const total = cartTotal + shipping;

  if (done) return (
    <div className="checkout-success">
      <CheckCircle size={72} strokeWidth={1.2} />
      <h2 className="font-serif">Order Confirmed!</h2>
      <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
      <button className="btn" onClick={() => { clearCart(); goTo('shop'); }}>Back to Shop</button>
    </div>
  );

  return (
    <div className="checkout-page">
      <div className="container">
        <button className="back-link" onClick={() => goTo('shop')}><ArrowLeft size={16} /> Back to shop</button>

        <div className="checkout-layout">
          {/* Form Side */}
          <div className="checkout-form-side">
            <div className="checkout-logo font-serif">ATELIER.</div>

            {/* Steps */}
            <div className="checkout-steps">
              {steps.map((s, i) => (
                <React.Fragment key={s}>
                  <span className={`checkout-step ${i <= step ? 'done' : ''} ${i === step ? 'active' : ''}`} onClick={() => i < step && setStep(i)}>
                    {s}
                  </span>
                  {i < steps.length - 1 && <span className="step-sep">/</span>}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <div className="form-section">
                <h3 className="form-heading">Contact Information</h3>
                <input className="form-input" placeholder="Email address" value={form.email} onChange={e => set('email', e.target.value)} />
                <div className="form-row">
                  <input className="form-input" placeholder="First name" value={form.first} onChange={e => set('first', e.target.value)} />
                  <input className="form-input" placeholder="Last name" value={form.last} onChange={e => set('last', e.target.value)} />
                </div>
                <input className="form-input" placeholder="Address" value={form.address} onChange={e => set('address', e.target.value)} />
                <div className="form-row">
                  <input className="form-input" placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
                  <input className="form-input" placeholder="ZIP code" value={form.zip} onChange={e => set('zip', e.target.value)} />
                </div>
                <input className="form-input" placeholder="Country" value={form.country} onChange={e => set('country', e.target.value)} />
                <button className="btn form-next-btn" onClick={() => setStep(2)}>Continue to Shipping</button>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h3 className="form-heading">Shipping Method</h3>
                {[
                  { id: 'standard', label: 'Standard Shipping', sub: '5–7 business days', price: 'Free' },
                  { id: 'express', label: 'Express Shipping', sub: '2–3 business days', price: '$12.00' },
                  { id: 'overnight', label: 'Overnight', sub: 'Next business day', price: '$22.00' },
                ].map(opt => (
                  <label key={opt.id} className={`shipping-option ${form.shipping === opt.id ? 'selected' : ''}`}>
                    <input type="radio" name="shipping" value={opt.id} checked={form.shipping === opt.id} onChange={() => set('shipping', opt.id)} />
                    <div className="shipping-info">
                      <span className="shipping-label">{opt.label}</span>
                      <span className="shipping-sub">{opt.sub}</span>
                    </div>
                    <span className="shipping-price">{opt.price}</span>
                  </label>
                ))}
                <button className="btn form-next-btn" onClick={() => setStep(3)}>Continue to Payment</button>
              </div>
            )}

            {step === 3 && (
              <div className="form-section">
                <h3 className="form-heading"><Lock size={15} style={{ display: 'inline', marginRight: 6 }} />Payment</h3>
                <input className="form-input" placeholder="Name on card" value={form.name} onChange={e => set('name', e.target.value)} />
                <input className="form-input" placeholder="Card number" maxLength={19} value={form.card} onChange={e => set('card', e.target.value)} />
                <div className="form-row">
                  <input className="form-input" placeholder="MM / YY" value={form.expiry} onChange={e => set('expiry', e.target.value)} />
                  <input className="form-input" placeholder="CVV" maxLength={4} value={form.cvv} onChange={e => set('cvv', e.target.value)} />
                </div>
                <button className="btn form-next-btn" onClick={() => setDone(true)}>
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="checkout-summary-side">
            <h3 className="summary-heading">Order Summary</h3>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-img-wrap">
                    <img src={item.image} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${item.id}/100/100`; }} />
                    <span className="summary-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <span>{item.name}</span>
                    <span className="summary-cat">{item.category}</span>
                  </div>
                  <span className="summary-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="summary-row total-row"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
