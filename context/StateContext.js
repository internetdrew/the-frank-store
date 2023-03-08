import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);
  return (
    <Context.Provider value={(cartItems, totalPrice, totalQty, qty)}>
      {children}
    </Context.Provider>
  );
};
