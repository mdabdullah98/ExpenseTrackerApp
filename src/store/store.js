import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/user";
import addExpenseSliceReducer from "./slices/addExpenseSlice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    addExpense: addExpenseSliceReducer,
  },
});
export default store;
