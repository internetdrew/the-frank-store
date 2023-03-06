import frank from '/public/frank-banner.png';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className='m-10'>
      <div className='flex flex-col items-center justify-center bg-white rounded-2xl cursor-pointer'>
        <div className='flex-1'>
          <Image src={frank} className='h-full object-cover' />
        </div>
      </div>
      <div className='w-full'>
        <h3 className='text-xl mt-2 font-extrabold'>"{product.title}" Frank</h3>
        <small>Test</small>
        <h4 className='text-xl font-semibold text-orange-600'>
          ${product.price}
        </h4>
      </div>
    </div>
  );
};

export default ProductCard;
