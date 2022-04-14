// import { createSearchParams } from "react-router-dom";
import { ActionTypes } from "../action-types";

export const setCart = (cart) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cart,
  };
};

export const selectedCart = (cart) => {
  return {
    type: ActionTypes.SELECTED_CART,
    payload: cart,
  };
};
