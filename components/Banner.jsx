import banner from '@/backend/schemas/banner';
import Image from 'next/image';
import Link from 'next/link';
import frank from '/public/frank-banner.png';

const Banner = ({ bannerInfo, bannerFrankInfo }) => {
  console.log(bannerFrankInfo.relatedFrank);
  return (
    <section className='grid sm:grid-cols-2 mx-4 sm:mx-8 mt-32 p-2 sm:p-8 bg-gradient-to-b from-yellow-300 via-red-400 to-red-600 rounded-2xl relative'>
      <div className='sm:ml-20 mb-64 sm:mb-0 sm:mt-8 p-5 space-y-2 text-white'>
        <div className='max-w-xl font-bold mb-4 text-center sm:text-left'>
          <p className='uppercase text-lg'>Featured Frank</p>
          <h2 className='uppercase text-sm sm:text-2xl mb-2'>
            <span className='font-bold'>{bannerInfo.smallText}</span> Frank
          </h2>
          <blockquote className='normal-case text-3xl sm:text-5xl'>
            "{bannerInfo.largeText}"
          </blockquote>
        </div>
        <div className='flex items-center justify-center sm:justify-start'>
          <button className='px-6 py-2 bg-slate-900 rounded-full font-semibold text-lg'>
            <Link href={`${bannerFrankInfo?.relatedFrank?.slug?.current}`}>
              Shop Now
            </Link>
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center absolute bottom-0 md:right-64'>
        <Image
          src={frank}
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
