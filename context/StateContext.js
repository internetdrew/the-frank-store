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
    setCheckoutDiscount(totalPrice / 2);
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
    const frankInCart = cartItems?.find(cartItem => cartItem?._id === itemId);
    const otherItemsInCart = cartItems?.filter(
      cartItem => cartItem?._id !== itemId
    );

    if (operation === 'increase') {
      frankInCart.qty += 1;
      setTotalPrice(prevTotal => prevTotal + frankInCart.price);
      setTotalQty(prevQty => prevQty + 1);
    }

    if (operation === 'decrease') {
      if (frankInCart.qty > 1) {
        frankInCart.qty -= 1;
        setTotalQty(prevQty => prevQty - 1);
        setTotalPrice(prevTotal => prevTotal - frankInCart.price);
      }
    }
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
        increaseQty,
        decreaseQty,
        addToCart,
        changeCartItemQty,
        handleDiscount,
        setCouponCode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
