// Esse reducer será responsável por tratar as informações da pessoa usuária

import { AnyAction } from "redux";

const initialState = {
  email: "",
};

const userReducer = (state = initialState, action: AnyAction) => {
  if (action.type === "SET_EMAIL") {
    return {
      ...state,
      email: action.payload,
    };
  }
  return state;
};

export default userReducer;
