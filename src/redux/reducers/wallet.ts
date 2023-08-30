// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from "redux";
import { WalletState } from "../actions";

const initialState: WalletState = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  editor: false,
  idToEdit: 0,
};

const walletReducer = (
  state = initialState,
  action: AnyAction
): WalletState => {
  console.log("Reducer action:", action);
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        totalExpenses: state.totalExpenses + action.payload.value,
      };
    }
    case "SET_CURRENCIES": {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case "DELETE_EXPENSE": {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
        totalExpenses: state.totalExpenses - action.payload.value,
      };
    }
    case "EDIT_EXPENSE": {
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
        editor: true,
        idToEdit: action.payload.id,
      };
    }
    case "FINISH_EDITING": {
      return {
        ...state,
        editor: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default walletReducer;
