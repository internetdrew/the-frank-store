import { Navbar, Banner, ProductCards, Footer } from '@/components';

const Home = () => {
  return (
    <main>
      <header>
        <Navbar />
        <Banner />
      </header>
      <main>
        <ProductCards />
      </main>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
