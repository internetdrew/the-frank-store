import { loadStripe } from '@stripe/stripe-js';
import { useStateContext } from '@/context/StateContext';

const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY);

const { cartItems } = useStateContext();
console.log(cartItems);

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
