import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constaints/cartConstant";




export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product //product = product object id
      );
      if (isItemExist) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item], //Add to cart if the product is not in the cart
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
