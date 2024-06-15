import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import cartSlice from '../../store/cartSlice';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartHandler = () => {
    dispatch(cartSlice.actions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
