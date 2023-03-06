import FrankCard from './FrankCard';

const Franks = ({ franks }) => {
  return (
    <>
      <section className='p-4 sm:p-28 mt-20'>
        <div className='grid grid-cols-1 gap-16 gap-y-36 md:grid-cols-3 w-full'>
          {franks.map(frank => (
            <FrankCard key={frank._id} frank={frank} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Franks;
