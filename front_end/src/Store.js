import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer, productDetailsReducer, newReviewReducer, productReducer, newProductReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { profileReducer, userReducer, forgetPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';
import { myOrderReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducer';



const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails : orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct : newProductReducer,
  product: productReducer,
  allOrders : allOrdersReducer,
  order : orderReducer,
  allUsers : allUsersReducer,
  userDetails : userDetailsReducer,
  productReviews : productReviewsReducer,
  review: reviewReducer
});


const savedCartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const savedShippingInfo = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {};


 const  initialState = {
  cart: {
    cartItems: savedCartItems,
    shippingInfo:savedShippingInfo  
  }
};

// console.log('initialstate', initialState)

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware: [...middleware],
});


export default store;