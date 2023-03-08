import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQuantity(prevQty => prevQty + 1);
  };
  const decreaseQty = () => {
    setQuantity(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={(cartItems, totalPrice, totalQty, qty, increaseQty, decreaseQty)}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
