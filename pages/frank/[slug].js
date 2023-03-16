import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanityClient';
import { RageMeter } from '@/components';
import { AiOutlineMinus, AiOutlinePlus, AiFillCaretLeft } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { useStateContext } from '@/context/StateContext';

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

const FrankDetails = ({ frank }) => {
  const { description, season, episode, image, quote, price, rage, title } =
    frank;
  const { increaseQty, decreaseQty, currentFrankQty, addToCart } =
    useStateContext();

  return (
    <section className='p-4 md:p-32 mt-36 lg:mt-10 flex flex-col'>
      <div className='grid lg:grid-cols-2 gap-14 p-4'>
        <div className='h-full'>
          <Image
            src={urlFor(image).url()}
            alt={`image for ${title} frank`}
            className='object-cover h-full rounded-3xl overflow-hidden w-full shadow-2xl'
            width={300}
            height={300}
            priority
          />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-5xl'>
            <strong>{title}</strong> Frank
          </h1>
          <small>
            Season {season}, Episode {episode}
          </small>
          <div className='flex items-center text-xl mt-1'>
            <RageMeter franksRageLevel={rage} />
          </div>
          <p className='text-2xl mt-8'>{description}</p>
          <h2 className='text-2xl font-bold text-orange-600 mt-4'>${price}</h2>

          {/* Quantity */}
          <div className='flex items-center justify-between mt-10 lg:mt-auto'>
            <h2 className='text-2xl font-semibold'>Qty:</h2>
            <div className='flex items-center justify-between text-xl border py-2 px-8 rounded-full font-bold'>
              <button
                className='text-red-500 border-r pr-4'
                onClick={decreaseQty}
              >
                <AiOutlineMinus />
              </button>
              <p className='w-8 text-center'>{currentFrankQty}</p>
              <button
                className='text-green-700 border-l pl-4'
                onClick={increaseQty}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          <button
            className='w-full flex-2 bg-gradient-to-r from-yellow-500 to-red-600 py-4 rounded-full text-white font-semibold mt-10 text-xl shadow-lg'
            onClick={() => addToCart(frank, currentFrankQty)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Link
        href={'/'}
        className='ml-auto mt-4 pr-6 p-2 font-semibold text-lg flex items-center'
      >
        <BsChevronLeft className='text-lg mr-2' />
        Continue shopping
      </Link>
    </section>
  );
};

export default FrankDetails;
