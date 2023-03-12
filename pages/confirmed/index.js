import Image from 'next/image';
import newman from '/public/newman.gif';

const Confirmation = () => {
  return (
    <div className='relative bounce-in-top'>
      <div className='mt-32 md:mt-40 flex flex-col items-center gap-10 p-4'>
        <h1 className='text-center text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'>
          Thank you for your order!
        </h1>
        <Image
          src={newman}
          alt='Kramer and Newman driving a delivery truck gif'
          width='auto'
          height='auto'
          priority
          className='shadow-xl'
        />
        <p className='text-center font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'>
          It should be there... eventually...
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
