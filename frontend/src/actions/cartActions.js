/* AXIOS */
import axios from "axios";

/* ACTION TYPES */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

/* ACTION CREATOR USED IN CartScreen COMPONENT */

/* FOR ADDING PRODUCTS TO CART */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // FETCHING PRODUCT DATA
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* FOR REMOVING PRODUCTS FROM CART */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* ACTION CREATOR USED IN ShippingScreen COMPONENT */
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // SETTING VALUE OF ADDRESS IN LOCAL STORAGE
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
