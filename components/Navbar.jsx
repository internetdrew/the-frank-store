import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full flex items-center justify-between p-2 sm:px-6  z-10 bg-gradient-to-b from-stone-100 via-stone-50'>
      <div className='p-5'>
        <Link href='/' className='text-xl sm:text-2xl font-bold'>
          The Frank Collection
        </Link>
      </div>
      <div className='flex items-center p-5 text-xl'>
        <div className='hidden sm:inline-flex border-r-2 pr-4 border-gray-300'>
          <FiSearch className='cursor-pointer' />
        </div>
        <div className='pl-4'>
          <p className='cursor-pointer'>Cart (0)</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
