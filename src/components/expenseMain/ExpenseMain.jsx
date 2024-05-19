import { useEffect, useState } from "react";

import axios from "axios";

import Expense from "../displayExpense/expense";

import LeaderBoard from "../LeaderBoard";

import { BASE_URL } from "../../utils/utils";

const ExpenseMain = ({ userPaymentStatus }) => {
  const [expense, setExpenseIncome] = useState([]);

  const [income, setIncome] = useState([]);

  const [user, setUser] = useState([]);

  const token = JSON.parse(sessionStorage.getItem("token"));

  const getExpenses = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "user/getExpenseAndIncome", {
        headers: { Authorization: ` ${token}` },
      });

      if (data.expenseAndIncome) {
        setExpenseIncome(data.expenseAndIncome.expenses);
        setIncome(data.expenseAndIncome.incomes);
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpenseHandler = async (id) => {
    const res = await axios.delete(BASE_URL + `user/deleteExpense/${id}`);
    setExpenseIncome(expense.filter((exp) => exp.id !== res.data.id));
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <>
      <Expense
        expenseHeading={"expense"}
        expense={expense}
        incomeHeading={"income"}
        income={income}
        deleteExpenseHandler={deleteExpenseHandler}
        user={user}
        userPaymentStatus={userPaymentStatus}
      />
      <LeaderBoard />
    </>
  );
};

export default ExpenseMain;
