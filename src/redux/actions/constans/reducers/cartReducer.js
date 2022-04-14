import { ActionTypes } from "../action-types";

const initialState = {
  cart: [],
};
export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
};
