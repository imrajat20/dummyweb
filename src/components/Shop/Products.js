import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy_items = [
  {id: 'p1', title: 'The book', price: 6, description: 'This is a first product'},
  {id: 'h2', title: 'New book', price: 10, description: 'This is a second product'}
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
       {dummy_items.map((product) => (
         <ProductItem
         key={product.id}
         id={product.id}
         title={product.title}
         price={product.price}
         description={product.description}
       />
      ))}
      </ul>
    </section>
  );
};

export default Products;
