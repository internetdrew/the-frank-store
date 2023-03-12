import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanityClient';

const Banner = ({ bannerInfo, bannerFrankInfo: { relatedFrank } }) => {
  return (
    <section className='flex flex-col justify-center md:flex-row items-center mx-4 mt-32 p-2 bg-gradient-to-b from-yellow-300 via-red-400 to-red-600 rounded-2xl'>
      <div className='p-5 text-white'>
        <div className='max-w-xl font-bold mb-4'>
          <p className='uppercase text-lg'>Frank of the month</p>
          <h2 className='uppercase text-sm sm:text-2xl mb-2'>
            <strong>{relatedFrank?.title}</strong> Frank
          </h2>
          <blockquote className='normal-case text-3xl sm:text-5xl'>
            "{relatedFrank?.quote}"
          </blockquote>
        </div>
        <div className='flex'>
          <button className='px-6 py-2 bg-slate-900 rounded-full font-semibold text-lg'>
            <Link href={`/frank/${relatedFrank?.slug?.current}`}>Shop Now</Link>
          </button>
        </div>
      </div>
      <div className='flex-shrink-0'>
        <Image
          src={urlFor(bannerInfo?.image).url()}
          width={400}
          height={400}
          priority
          alt='Photo of Frank Costanza'
        />
      </div>
    </section>
  );
};

export default Banner;
