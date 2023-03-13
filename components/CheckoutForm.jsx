import { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useStateContext } from '@/context/StateContext';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const {
    subtotal,
    checkoutDiscount,
    shippingRate,
    setClientSecret,
    setCheckingOut,
  } = useStateContext();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/confirmed',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setCheckingOut(true);
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='mt-4'>
      <p className='text-gray-700 mb-2 text-center'>
        Use credit card <strong>4242 4242 4242 4242</strong> for full checkout
        flow!
      </p>
      <LinkAuthenticationElement
        id='link-authentication-element'
        onChange={e => setEmail(e.value)}
      />
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id='submit'
        className='w-full text-white font-semibold bg-orange-500 py-2 rounded-full text-lg mt-4'
      >
        <span id='button-text'>{isLoading ? 'Processing...' : 'Pay now'}</span>
      </button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
}
