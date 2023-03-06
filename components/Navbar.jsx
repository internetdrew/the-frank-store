import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full flex items-center justify-between px-4 sm:p-6 text-md sm:text-xl bg-slate-50 z-10'>
      <div className='p-5'>
        <Link href='/'>Quite Frank-ly</Link>
      </div>
      <div className='flex items-center p-5'>
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
