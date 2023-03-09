import { useState, useRef } from 'react';
import { useStateContext } from '@/context/StateContext';
import CartItem from '@/components/CartItem';

const Cart = () => {
  const [activeCoupon, setActiveCoupon] = useState(false);
  const {
    cartItems,
    totalPrice,
    handleDiscount,
    setCouponCode,
    couponCode,
    checkoutDiscount,
  } = useStateContext();

  const inputRef = useRef(null);

  const cartLabels = ['', 'product', 'price', 'quantity', 'total'];
  // const discount = activeCoupon ? (totalPrice / 2).toFixed(2) : 0;
  const deliveryFee = cartItems.length === 0 ? 0 : 9.99;
  const finalTotal = totalPrice + deliveryFee - checkoutDiscount;

  return (
    <div className='mt-32 mx-20'>
      <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'>
        Your Shopping Cart
      </h1>
      <div className='grid md:grid-cols-3 gap-20 mt-16 '>
        <div className='col-span-2'>
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
            <div>
              {cartItems.map(item => (
                <CartItem key={item?._id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className='border-2 rounded-xl p-4'>
          <h2 className='font-semibold text-lg'>Order Summary</h2>
          <div className='flex items-center justify-between gap-6 mb-10 mt-2'>
            <input
              type='text'
              ref={inputRef}
              value={couponCode}
              placeholder='Discount code'
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
          <div className='flex items-center justify-between font-semibold'>
            <p>Subtotal</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between font-semibold'>
            <p>Discount</p>
            <p>-${checkoutDiscount.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between font-semibold border-b-2 pb-2'>
            <p>Newman Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>
          <div className='flex items-center justify-between font-semibold'>
            <p>Total</p>
            <p>${finalTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
