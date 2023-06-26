import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [currentFrankQty, setCurrentFrankQty] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState(false);
  const [shippingRate, setShippingRate] = useState(9.99);
  const [checkingOut, setCheckingOut] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (activeCoupon) {
      setCheckoutDiscount(subtotal / 2);
    }
  }, [subtotal]);

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

    setSubtotal(prevPrice => prevPrice + frank.price * qty);
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
      setSubtotal(prevTotal => prevTotal + frankToUpdate.price);
      setTotalQty(prevQty => prevQty + 1);
    }

    if (operation === 'decrease' && frankToUpdate.qty > 1) {
      const updatedCart = cartItems?.map(item => {
        if (item._id === itemId && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
      setSubtotal(prevTotal => prevTotal - frankToUpdate.price);
      setTotalQty(prevQty => prevQty - 1);
    }
  };

  const removeItem = id => {
    const item = cartItems?.find(item => item._id === id);
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    setSubtotal(prevPrice => prevPrice - item.price * item.qty);
    setTotalQty(prevQty => prevQty - item.qty);
  };

  const handleDiscount = () => {
    if (couponCode.trim().toLowerCase() === 'festivus') {
      setActiveCoupon(true);
      setCheckoutDiscount(subtotal / 2);
      setCouponCode('');
    }
  };

  const handleEnterDiscount = e => {
    if (e.key === 'Enter' && couponCode.trim().toLowerCase() === 'festivus') {
      setActiveCoupon(true);
      setCheckoutDiscount(subtotal / 2);
      setCouponCode('');
    }
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        subtotal,
        totalQty,
        currentFrankQty,
        couponCode,
        checkoutDiscount,
        activeCoupon,
        shippingRate,
        clientSecret,
        increaseQty,
        decreaseQty,
        addToCart,
        changeCartItemQty,
        handleDiscount,
        setCouponCode,
        removeItem,
        setCheckingOut,
        setClientSecret,
        handleEnterDiscount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
