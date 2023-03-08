import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';

const CartItem = ({ item }) => {
  console.log(item);
  return (
    <div className='grid grid-cols-6 border-b-2 py-4 items-center'>
      <div className='h-28 w-28 rounded-xl overflow-hidden'>
        <Image
          src={urlFor(item.image).url()}
          width={600}
          height={600}
          priority
          className='w-full h-full object-cover'
        />
      </div>
      <div className='font-semibold col-span-2'>{item.title} Frank</div>
      <div className='font-semibold'>${item.price}</div>
      <div className='font-semibold'>{item?.qty}</div>
      <div className='font-semibold'>${(item.price * item.qty).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
