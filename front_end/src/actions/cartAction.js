import { ADD_TO_CART,  REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constaints/cartConstant";
import axios from 'axios';



//ADD_TO_CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => { //getState - Accessingthe state
        const { data } = await axios.get(`/api/v1/product/${id}`);
 dispatch({
    type : ADD_TO_CART,
    payload:{
        product : data.product._id,
name : data.product.name,
        price : data.product.price,
        image : data.product.images[0].url,
        stock : data.product.stock,
        quantity
    }
 });
 localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
   //Saving on the localstorage so it will not remove in every refresh in browser. Will remove after the order placed. State will empty on every refresh
}



//remove cart
export const removeItems = (id)=> async (dispatch, getState)=>{
        dispatch({
                type: REMOVE_CART_ITEM,
                payload: id,
        });
        localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems));
}


//SHIPPING INFO

export const saveShippingInfo =(data)=> async (dispatch)=>{
        dispatch({
                type: SAVE_SHIPPING_INFO,
                payload : data,
        });
        
localStorage.setItem('shippingInfo', JSON.stringify(data))
}