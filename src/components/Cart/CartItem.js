import { useDispatch, useSelector } from 'react-redux';
import classes from './CartItem.module.css';
import cartSlice from '../../store/cartSlice';

const CartItem = (props) => {
  const { title, price , total} = props.item;

  const dispatch = useDispatch();

  const increaseHandler = () => {
    dispatch(cartSlice.actions.increase());
  };
  const decreaseHandler = () => {
    dispatch(cartSlice.actions.decrease());
  };

  const counter = useSelector(state => state.cart.counter);

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          {/* ${total.toFixed(2)}{' '} */}
          ${total}
          <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      {  <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{counter}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseHandler}>-</button>
          <button onClick={increaseHandler}>+</button>
        </div>
      </div>}
    </li>
  );
};

export default CartItem;
