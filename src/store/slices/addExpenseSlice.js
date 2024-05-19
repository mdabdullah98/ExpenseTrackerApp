import { createSlice } from "@reduxjs/toolkit";

const addExpenseSlice = createSlice({
  name: "addExpense",
  initialState: {
    mode: {
      addExpense: false,
      expense: "active",
      income: "",
    },
  },
  reducers: {
    displayForm: (state) => {
      state.mode.addExpense = !state.mode.addExpense;
    },
    expenseMode: (state) => {
      state.mode.expense = "active";
      state.mode.income = "";
    },
    incomeMode: (state) => {
      state.mode.expense = "";
      state.mode.income = "active";
    },
  },
  extraReducers: {},
});

export const { displayForm, expenseMode, incomeMode } = addExpenseSlice.actions;
export default addExpenseSlice.reducer;
