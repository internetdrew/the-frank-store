import banner from '@/backend/schemas/banner';
import { Navbar, Banner, Products, Footer } from '@/components';
import { client } from '@/lib/sanityClient';

const Home = ({ franks, bannerInfo }) => {
  console.log(franks);
  return (
    <main>
      <header>
        <Navbar />
        <Banner bannerInfo={bannerInfo} />
      </header>
      <main>
        <Products products={franks} />
      </main>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = '*[_type == "frank"]';
  const franks = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerInfo = await client.fetch(bannerQuery);

  return {
    props: {
      franks,
      bannerInfo,
    },
  };
};
