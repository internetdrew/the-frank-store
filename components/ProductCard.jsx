import frank from '/public/frank-banner.png';
import Image from 'next/image';

const ProductCard = () => {
  return (
    <div className='m-10'>
      <div className='flex flex-col items-center justify-center bg-white rounded-2xl'>
        <div>
          <Image src={frank} className='h-full object-cover' />
        </div>
      </div>
      <div className='w-full'>
        <h3 className='text-xl mt-2 font-extrabold'>Frank Name</h3>
        <h4 className='text-xl font-semibold text-orange-600'>$199.99</h4>
      </div>
    </div>
  );
};

export default ProductCard;
