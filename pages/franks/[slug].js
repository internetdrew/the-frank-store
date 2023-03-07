import { useState } from 'react';
import { client, urlFor } from '@/lib/sanityClient';
import Image from 'next/image';
import { RageMeter } from '@/components';

const FrankDetails = ({ frank }) => {
  const { description, season, episode, image, quote, price, rage, title } =
    frank;

  return (
    <section className='p-4 lg:p-32 mt-32 lg:mt-10'>
      <div className='grid sm:grid-cols-2 gap-14 p-4'>
        <Image
          src={urlFor(image).url()}
          alt={`image for ${title} frank`}
          className='object-cover h-full rounded-3xl overflow-hidden w-full shadow-2xl'
          width={900}
          height={900}
          priority
        />
        <div className='flex flex-col'>
          <h1 className='text-5xl'>
            <strong>{title}</strong> Frank
          </h1>
          <div className='flex items-center text-xl mt-2'>
            <RageMeter rageLevel={rage} />
          </div>
          <p className='text-2xl mt-4'>{description}</p>
          <div className='flex justify-center'>
            <button className='w-full mt-10 bg-gradient-to-r from-yellow-500 to-red-600 py-4 rounded-full text-white font-semibold text-xl'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrankDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "frank"]`;
  const franks = await client.fetch(query);
  const paths = franks?.map(frank => ({
    params: {
      slug: frank?.slug?.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "frank" && slug.current == '${slug}'][0]`;
  const frank = await client.fetch(query);

  return {
    props: {
      frank,
    },
  };
};
