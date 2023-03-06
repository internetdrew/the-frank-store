import frank from '/public/frank-banner.png';
import Image from 'next/image';

import { urlFor } from '@/lib/sanityClient';

const ProductCard = ({ product }) => {
  return (
    <div className='m-6 sm:m-10'>
      <div className='flex flex-col items-center justify-center bg-white rounded-3xl cursor-pointer'>
        <div className='flex-1'>
          <Image
            src={urlFor(product.image).url()}
            width={300}
            height={400}
            className='object-cover'
            alt={product.title}
          />
        </div>
      </div>
      <div className='w-full flex-1'>
        <h3 className='text-xl mt-2 font-extrabold'>"{product.title}" Frank</h3>
        <small>
          Season {product.season}, Episode {product.episode}
        </small>
        <h4 className='text-xl font-semibold text-orange-600'>
          ${product.price}
        </h4>
      </div>
    </div>
  );
};

export default ProductCard;
