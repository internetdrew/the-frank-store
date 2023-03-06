import ProductCard from './ProductCard';

const Products = ({ products }) => {
  // const products = Array(9).fill('frank');
  return (
    <>
      <section className='mx-8 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 w-full md:p-8'>
          {products.map((prod, i) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
