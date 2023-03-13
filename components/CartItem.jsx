import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';

const CartItem = ({ item }) => {
  const { changeCartItemQty, removeItem } = useStateContext();
  return (
    <div className='border-b-2 p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-10'>
      <div className='rounded-xl overflow-hidden h-40 w-40'>
        <Image
          src={urlFor(item?.image)?.url()}
          alt='photo of frank costanza'
          width={600}
          height={600}
          priority
          className='w-full h-full object-cover'
        />
      </div>
      <div className='font-semibold text-center text-lg flex-2'>
        {item?.title} Frank
      </div>
      <div className='flex-1'>
        <div className='font-semibold'>${item?.price}</div>
      </div>

      <div className='flex-1 flex'>
        <button
          type='button'
          className='p-2 text-red-500'
          onClick={() => changeCartItemQty(item?._id, 'decrease')}
        >
          <AiOutlineMinus />
        </button>
        <p className='p-2 font-bold'>{item?.qty}</p>
        <button
          type='button'
          className='p-2 text-green-700'
          onClick={() => changeCartItemQty(item?._id, 'increase')}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div className='font-semibold'>
        ${(item?.price * item?.qty).toFixed(2)}
      </div>
      {/* <div
          className='absolute text-xl text-red-600 cursor-pointer right-2'
          onClick={() => removeItem(item?._id)}
        >
          <span>
            <AiFillDelete />
          </span>
        </div> */}
    </div>
  );
};

export default CartItem;
