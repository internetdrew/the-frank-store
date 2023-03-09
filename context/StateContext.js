import frank from '@/backend/schemas/frank';
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [currentFrankQty, setCurrentFrankQty] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState(false);

  useEffect(() => {
    if (activeCoupon) setCheckoutDiscount(totalPrice / 2);
  }, [totalPrice]);

  const addToCart = (frank, qty) => {
    const frankAlreadyInCart = cartItems?.some(item => item?._id === frank._id);

    if (!frankAlreadyInCart) {
      frank.qty = qty;
      setCartItems(prevItems => {
        return [...prevItems, { ...frank }];
      });
    }

    if (frankAlreadyInCart) {
      const sameFrank = cartItems?.find(item => item._id === frank._id);
      const updatedCartItems = cartItems?.map(frankInCart => {
        if (sameFrank) {
          return { ...frankInCart, qty: frankInCart.qty + qty };
        }
      });
      setCartItems(updatedCartItems);
    }

    setTotalPrice(prevPrice => prevPrice + frank.price * qty);
    setTotalQty(prevQty => prevQty + qty);

    toast.success(
      `${qty} ${frank?.title} Frank${qty > 1 ? 's' : ''} added to cart.`,
      {
        duration: 3000,
      }
    );
    setCurrentFrankQty(1);
  };

  const increaseQty = () => {
    setCurrentFrankQty(prevQty => prevQty + 1);
  };
  const decreaseQty = () => {
    setCurrentFrankQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const changeCartItemQty = (itemId, operation) => {
    const frankToUpdate = cartItems?.find(cartItem => cartItem?._id === itemId);
    const otherItemsInCart = cartItems?.filter(
      cartItem => cartItem?._id !== itemId
    );

    if (operation === 'increase') {
      // frankToUpdate.qty += 1; // Should document this
      const updatedCart = cartItems?.map(item => {
        if (item._id === itemId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
      setTotalPrice(prevTotal => prevTotal + frankToUpdate.price);
      setTotalQty(prevQty => prevQty + 1);
    }

    if (operation === 'decrease') {
      const updatedCart = cartItems?.map(item => {
        if (item._id === itemId && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
      setTotalPrice(prevTotal => prevTotal - frankToUpdate.price);
      setTotalQty(prevQty => prevQty - 1);
    }
  };

  const removeItem = id => {
    const item = cartItems?.find(item => item._id === id);
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    setTotalPrice(prevPrice => prevPrice - item.price * item.qty);
    setTotalQty(prevQty => prevQty - item.qty);
  };

  const handleDiscount = () => {
    if (couponCode.trim().toLowerCase() === 'festivus') {
      setActiveCoupon(true);
      setCheckoutDiscount(totalPrice / 2);
      setCouponCode('');
    }
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQty,
        currentFrankQty,
        couponCode,
        checkoutDiscount,
        activeCoupon,
        increaseQty,
        decreaseQty,
        addToCart,
        changeCartItemQty,
        handleDiscount,
        setCouponCode,
        removeItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
