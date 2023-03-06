import FrankCard from './FrankCard';

const Products = ({ franks }) => {
  return (
    <>
      <section className='mx-8 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 w-full md:p-8'>
          {franks.map(frank => (
            <FrankCard key={frank._id} frank={frank} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
