/* AXIOS */
import axios from "axios";

/* ACTION TYPES */
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

/* ACTION CREATOR USED IN CartScreen COMPONENT */
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

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
