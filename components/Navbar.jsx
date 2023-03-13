import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const { totalQty } = useStateContext();

  return (
    <nav className='fixed top-0 right-0 left-0 flex items-center p-2 2xl:px-64 z-10 bg-gradient-to-b from-stone-100 via-stone-50'>
      <div className='p-5'>
        <Link
          href='/'
          className='text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'
        >
          The Frank Store
        </Link>
      </div>
      <div className='flex items-center p-5 text-lg ml-auto'>
        <div className='hidden border-r-2 pr-4 border-gray-300'>
          <FiSearch className='cursor-pointer' />
        </div>
        <div className='pl-4 w-24'>
          <button className='cursor-pointer font-semibold'>
            <Link href={'/cart'}>Cart ({totalQty})</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
