import { useStateContext } from '@/context/StateContext';
import CartItem from '@/components/CartItem';

const Cart = () => {
  const { cartItems } = useStateContext();
  const cartLabels = ['', 'product', 'price', 'quantity', 'total'];
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

        <div className='border-2 rounded-xl p-2'>
          <h2 className='font-semibold text-lg'>Order Summary</h2>
        </div>
      </div>
    </div>
  );
};

export default Cart;
