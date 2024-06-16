import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import cartSlice from '../../store/cartSlice';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartHandler = () => {
    dispatch(cartSlice.actions.toggleCart());
  };
  const numberOfItmes = useSelector(state => state.cart.totalQuantity);
  
  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfItmes}</span>
    </button>
  );
};

export default CartButton;
