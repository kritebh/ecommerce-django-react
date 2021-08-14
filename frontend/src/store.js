/* REDUX */
import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

/* IMPORTING REDUCERS */
import { productListReducer } from "./reducers/productReducers";

/* REDUCER */
const reducer = combineReducers({ productList: productListReducer });

const initialState = {};

const middleware = [thunk];

/* REDUX STORE */
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
