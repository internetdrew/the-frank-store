import Head from 'next/head';
import { Navbar, Footer } from '@/components';

const Layout = ({ children }) => {
  return (
    <div className='h-screen flex flex-col'>
      <Head>
        <title>The Frank Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='flex-1'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
