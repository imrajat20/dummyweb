import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect} from 'react';
import uiSlice from './store/uiSlice';
import React from 'react';
import Notification from './components/UI/Notifications';
import { fetchCartData } from './store/cartSlice';

function App() {
  const isInitial = true;

  const cartShown = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData)
  },[dispatch])

  useEffect(() => {
    const sendCartData = async() => {
      dispatch(uiSlice.actions.setNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));
     const response = await fetch('https://ecommerce-web-c8b78-default-rtdb.firebaseio.com/cart.json',{
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      if (!response.ok) {
        // throw new Error('Sending cart data failed');
        dispatch(uiSlice.actions.setNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        }))
      }
      // const responseData = await response.json();
      dispatch(uiSlice.actions.setNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }))
    };

    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch(
      error => {
        dispatch(uiSlice.actions.setNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        }))
      }
    );
  }, [cart, dispatch])

  return (
    <React.Fragment>
     { notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
      { cartShown && <Cart />}
      <Products />
    </Layout>
    </React.Fragment>
  );
}

export default App;
