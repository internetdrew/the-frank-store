import { client, urlFor } from '@/lib/sanityClient';

const FrankDetails = ({ frank }) => {
  console.log(frank);
  return (
    <section className='p-4 sm:p-28 mt-20'>
      <div>
        <h1>
          <strong>{frank.title}</strong> Frank
        </h1>
        <img src='' alt='' />
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
  console.log(query);
  const frank = await client.fetch(query);

  return {
    props: {
      frank,
    },
  };
};
