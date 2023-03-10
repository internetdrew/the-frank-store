import Head from 'next/head';
import { Navbar, Footer } from '@/components';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col max-w-7xl items-center'>
      <Head>
        <title>The Frank Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='flex-1'>{children}</main>
      <footer className='mt-20'>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
