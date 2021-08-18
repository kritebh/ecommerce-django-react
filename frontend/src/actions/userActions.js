/* AXIOS */
import axios from "axios";

/* ACTION TYPES */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

/* ACTION CREATOR USED IN USER LOGIN IN LoginScreen COMPONENT & HEADER */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    /* MAKE POST REQUEST TO GET BACK THE USER TOKEN */
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );

    /* IF POST REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    /* SETTING VALUE OF USER INFO IN LOCAL STORAGE SO WE KNOW USER IS LOGGED IN */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN USER LOGOUT IN LoginScreen COMPONENT & HEADER */
export const logout = () => (dispatch) => {
  /* REMOVE USER INFO FORM LOCAL STORAGE */
  localStorage.removeItem("userInfo");

  /* DISPATCH TO REMOVE USER INFO FORM STORE */
  dispatch({
    type: USER_LOGOUT,
  });
};

/* ACTION CREATOR USED IN USER REGISTRATION IN RegisterScreen COMPONENT & HEADER */
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    /* MAKE POST REQUEST TO GET BACK THE USER TOKEN */
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register/",
      { name: name, email: email, password: password },
      config
    );

    /* IF POST REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    /* AFTER REGISTRATION WE WANT TO IMMEDIATELY LOGIN THE USER */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    /* SETTING VALUE OF USER INFO IN LOCAL STORAGE SO WE KNOW USER IS LOGGED IN */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
