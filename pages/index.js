import banner from '@/backend/schemas/banner';
import { Navbar, Banner, Franks, Footer, Layout } from '@/components';
import { client } from '@/lib/sanityClient';

const Home = ({ franks, bannerInfo, bannerFrankInfo }) => {
  return (
    <>
      <Banner bannerInfo={bannerInfo} bannerFrankInfo={bannerFrankInfo} />
      <Franks franks={franks} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const query = '*[_type == "frank"]';
  const franks = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"][0]';
  const bannerInfo = await client.fetch(bannerQuery);

  const bannerFrankQuery = '*[_type == "banner"][0]{relatedFrank->}';
  const bannerFrankInfo = await client.fetch(bannerFrankQuery);

  return {
    props: {
      franks,
      bannerInfo,
      bannerFrankInfo,
    },
  };
};
