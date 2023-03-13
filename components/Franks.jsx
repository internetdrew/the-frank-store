import FrankCard from './FrankCard';

const Franks = ({ franks }) => {
  return (
    <>
      <section className='p-4 sm:p-28 mt-20 lg:mt-0'>
        <h1 className='text-center text-4xl font-bold mb-12 lg:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'>
          Shop your favorite Frank Costanza moments
        </h1>
        <div className='grid gap-16 gap-y-36 md:grid-cols-2 lg:grid-cols-3 w-full'>
          {franks.map(frank => (
            <FrankCard key={frank._id} frank={frank} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Franks;
