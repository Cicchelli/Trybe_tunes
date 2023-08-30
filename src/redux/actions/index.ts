// // Coloque aqui suas actions

export interface Action<T extends string, P = undefined> {
  type: T;
  payload?: P;
}

export type SetEmailAction = Action<"SET_EMAIL", string>;
export const setEmailAction = (email: string): SetEmailAction => ({
  type: "SET_EMAIL",
  payload: email,
});

export interface Expense {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: Record<
    string,
    {
      code: string;
      codein: string;
      name: string;
      high: string;
      low: string;
      varBid: string;
      pctChange: string;
      bid: string;
      ask: string;
      timestamp: string;
      create_date: string;
    }
  >;
}

export interface WalletState {
  currencies: string[];
  expenses: Expense[];
  totalExpenses: number;
  editor: boolean;
  idToEdit: number;
}

export type AddExpenseAction = Action<"ADD_EXPENSE", Expense>;
export const addExpenseAction = (expense: Expense): AddExpenseAction => ({
  type: "ADD_EXPENSE",
  payload: expense,
});

export type SetCurrenciesAction = Action<"SET_CURRENCIES", string[]>;
export const setCurrenciesAction = (
  currencies: string[]
): SetCurrenciesAction => ({
  type: "SET_CURRENCIES",
  payload: currencies,
});

export type DeleteExpenseAction = Action<"DELETE_EXPENSE", number>;
export const deleteExpenseAction = (
  expenseId: number
): DeleteExpenseAction => ({
  type: "DELETE_EXPENSE",
  payload: expenseId,
});

export type EditExpenseAction = Action<"EDIT_EXPENSE", Expense>;
export const editExpenseAction = (expense: Expense): EditExpenseAction => ({
  type: "EDIT_EXPENSE",
  payload: expense,
});

export type FinishEditingAction = Action<"FINISH_EDITING">;
export const finishEditingAction = (): FinishEditingAction => ({
  type: "FINISH_EDITING",
});
