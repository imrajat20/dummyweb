import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import cartSlice from '../../store/cartSlice';
import { useDispatch } from 'react-redux';

const ProductItem = (props) => {
  const { title, price, description } = props;

  const newdetails = [
    {title: title,
    price: price,
    description: description,
}];
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(cartSlice.actions.addItem(newdetails));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
