import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanityClient';

const FrankCard = ({ frank }) => {
  return (
    <div className='hover:scale-105 transition-all duration-300 bg-none ease-out'>
      <Link href={`/franks/${frank?.slug?.current}`}>
        <div className='flex flex-col items-center justify-center rounded-3xl overflow-hidden cursor-pointer  w-full h-full'>
          <div className='flex-1'>
            <Image
              src={urlFor(frank.image).url()}
              width={700}
              height={900}
              priority
              className='w-full h-full object-cover'
              alt={frank.title}
            />
          </div>
        </div>
      </Link>
      <div className='w-full flex-1'>
        <h3 className='text-xl mt-2 -mb-2 font-extrabold'>
          {frank.title} Frank
        </h3>
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
