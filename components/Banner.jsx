import Image from 'next/image';
import Link from 'next/link';
import frank from '/public/frank-banner.png';

const Banner = () => {
  return (
    <section className='grid sm:grid-cols-2 mx-4 sm:mx-8 mt-32 p-2 sm:p-8 bg-gradient-to-b from-yellow-300 via-red-400 to-red-600 rounded-2xl relative'>
      <div className='sm:ml-20 mb-64 sm:mb-0 sm:mt-8 p-5 space-y-2 text-white'>
        <div className='max-w-md mb-4 text-center sm:text-left'>
          <h2 className='uppercase text-sm sm:text-xl mb-2'>
            This months featured frank
          </h2>
          <blockquote className='normal-case text-3xl sm:text-5xl'>
            Grab up to 60% off on selected products
          </blockquote>
        </div>
        <div className='flex items-center justify-center sm:justify-start'>
          <button className='px-6 py-2 bg-slate-900 rounded-full font-semibold text-lg'>
            <Link href={''}>Shop Now</Link>
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center absolute bottom-0 md:right-64'>
        <Image
          src={frank}
          width={300}
          height={300}
          priority
          alt='Photo of Frank Costanza'
        />
      </div>
    </section>
  );
};

export default Banner;
