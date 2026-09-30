import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'tt_bookstore_cart';

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return Array.isArray(action.payload) ? action.payload : [];
    case 'ADD': {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) => (i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...state, { ...action.item, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'SET_QTY':
      return state
        .map((i) => (i.id === action.id ? { ...i, quantity: Math.max(0, action.qty) } : i))
        .filter((i) => i.quantity > 0);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const count = items.reduce((n, i) => n + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const value = {
    items,
    count,
    total,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    add: (item) => {
      dispatch({ type: 'ADD', item });
      setIsOpen(true);
    },
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}