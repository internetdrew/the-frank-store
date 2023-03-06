import frank from '/public/frank-banner.png';
import Image from 'next/image';

import { urlFor } from '@/lib/sanityClient';

const FrankCard = ({ frank }) => {
  return (
    <div className='m-6 sm:m-10 '>
      <div className='flex flex-col items-center justify-center bg-white rounded-3xl cursor-pointer overflow-hidden w-full h-full'>
        <div className='flex-1 '>
          <Image
            src={urlFor(frank.image).url()}
            width={700}
            height={900}
            className='w-full h-full object-cover'
            alt={frank.title}
          />
        </div>
      </div>
      <div className='w-full flex-1'>
        <h3 className='text-xl mt-2 font-extrabold'>"{frank.title}" Frank</h3>
        <small>
          Season {frank.season}, Episode {frank.episode}
        </small>
        <h4 className='text-xl font-semibold text-orange-600'>
          ${frank.price}
        </h4>
      </div>
    </div>
  );
};

export default FrankCard;
