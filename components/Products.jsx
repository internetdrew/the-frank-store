import ProductCard from './ProductCard';

const Products = () => {
  return (
    <>
      <section className='mx-8 mt-10'>
        <div className='grid grid-cols-3 w-full'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </>
  );
};

export default Products;
