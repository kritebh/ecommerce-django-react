/* AXIOS */
import axios from "axios";

/* ACTION TYPES */
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

/* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrderScreen COMPONENT  */
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS, WE NEED TO BE LOGGED IN TO PLACE ORDER
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    /* MAKING API CALL TO SAVE THE ORDER DETAILS */
    const { data } = await axios.post(`/api/orders/add/`, order, config);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // REST CART INFO STORED IN STATE & LOCAL STORAGE AFTER ORDER PLACED
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrderScreen COMPONENT  */
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO GET THE ORDER DETAILS */
    const { data } = await axios.get(`/api/orders/${id}/`, config);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN MAKING PAYMENT IN OrderScreen COMPONENT  */
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO SAVE THE PAYMENT DETAILS */
    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
