import ProductCard from './ProductCard';

const Products = () => {
  const products = Array(9).fill('frank');
  return (
    <>
      <section className='mx-8 mt-10'>
        <div className='grid grid-cols-3 w-full p-8'>
          {products.map(prod => (
            <ProductCard />
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
