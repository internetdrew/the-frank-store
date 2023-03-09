import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';

const CartItem = ({ item }) => {
  const { changeCartItemQty } = useStateContext();
  return (
    <div className='grid grid-cols-6 border-b-2 py-4 items-center'>
      <div className='h-28 w-28 rounded-xl overflow-hidden'>
        <Image
          src={urlFor(item.image).url()}
          alt='photo of frank costanza'
          width={600}
          height={600}
          priority
          className='w-full h-full object-cover'
        />
      </div>
      <div className='font-semibold col-span-2'>{item.title} Frank</div>
      <div className='font-semibold'>${item.price}</div>
      {/* Quantity Toggle */}
      <div className='font-semibold flex'>
        <div className='border-2 flex rounded-full px-2'>
          <button
            type='button'
            className='p-2'
            onClick={() => changeCartItemQty(item?._id, 'decrease')}
          >
            <AiOutlineMinus />
          </button>
          <p className='p-2'>{item.qty}</p>
          <button
            type='button'
            className='p-2'
            onClick={() => changeCartItemQty(item?._id, 'increase')}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      {/* End Quantity Toggle */}
      <div className='font-semibold'>${(item.price * item.qty).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
