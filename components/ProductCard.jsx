import frank from '/public/frank-banner.png';
import Image from 'next/image';

const ProductCard = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-red-200'>
        <Image src={frank} />
      </div>
    </div>
  );
};

export default ProductCard;
