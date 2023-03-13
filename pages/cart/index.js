import { useRef, useState, useEffect } from 'react';
import { useStateContext } from '@/context/StateContext';
import { CartItem, CheckoutForm } from '@/components';
import getStripe from '@/lib/getStripe';
import { toast } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';

const Cart = () => {
  const {
    cartItems,
    subtotal,
    handleDiscount,
    setCouponCode,
    couponCode,
    checkoutDiscount,
    activeCoupon,
    shippingRate,
    checkingOut,
    clientSecret,
    setClientSecret,
  } = useStateContext();

  const inputRef = useRef(null);
  const cartLabels = ['', 'product', 'price', 'qty', 'total'];
  const dynamicShipping = cartItems.length ? shippingRate : 0;

  const stripePromise = getStripe();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ subtotal, checkoutDiscount, shippingRate }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='mt-32'>
      <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'>
        Your Shopping Cart
      </h1>
      <div className='flex flex-col xl:flex-row xl:gap-4 mt-16'>
        <div>
          <div>
            <div className='grid grid-cols-6 border-b-2'>
              {cartLabels.map((section, i) => {
                const str =
                  section === 'product'
                    ? 'capitalize font-semibold text-lg col-span-2'
                    : 'capitalize font-semibold text-lg';

                return (
                  <div key={i} className={str}>
                    {section}
                  </div>
                );
              })}
            </div>
            <div className='lg:h-96 overflow-y-scroll'>
              <div>
                {cartItems.map(item => (
                  <CartItem key={item?._id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='border-2 rounded-xl p-4 flex-flex-col'>
          <h2 className='font-semibold text-lg mb-2'>Order Summary</h2>
          {activeCoupon ? (
            <p className='text-center text-gray-500 py-5'>
              Discount active for 50% off
            </p>
          ) : (
            <div className='flex items-center justify-between gap-6 mb-10 mt-2 transition-all duration-300'>
              <input
                type='text'
                ref={inputRef}
                value={couponCode}
                placeholder='Try discount code "festivus"'
                className='rounded-full pl-4 pr-2 py-2 border-2 w-full outline-none'
                onChange={e => setCouponCode(e.target.value)}
              />
              <button
                type='button'
                className='py-2 px-4 bg-orange-500 rounded-full font-semibold text-white'
                onClick={handleDiscount}
              >
                Apply
              </button>
            </div>
          )}
          <div className='flex items-center justify-between font-semibold'>
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          {activeCoupon ? (
            <div className='flex items-center justify-between font-semibold'>
              <p>Discount</p>
              <p>-${checkoutDiscount.toFixed(2)}</p>
            </div>
          ) : null}
          <div className='flex items-center justify-between font-semibold border-b-2 pb-1'>
            <p>Newman Delivery Fee</p>
            <p>${dynamicShipping}</p>
          </div>
          <div className='flex items-center justify-between font-semibold mt-2'>
            <p>Total</p>
            <p>${(subtotal + dynamicShipping - checkoutDiscount).toFixed(2)}</p>
          </div>
          <div className='mt-auto'>
            {clientSecret && (
              <Elements
                key={clientSecret}
                options={options}
                stripe={stripePromise}
              >
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
