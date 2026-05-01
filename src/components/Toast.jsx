import React from 'react';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

export const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="toast-container">
      <div key={toast.id} className="toast">
        <div className="toast-icon"><Check size={13} strokeWidth={3} /></div>
        <p>{toast.message}</p>
      </div>
    </div>
  );
};
