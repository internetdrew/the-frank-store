import Head from 'next/head';
import { Navbar, Footer } from '@/components';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>The Frank Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
