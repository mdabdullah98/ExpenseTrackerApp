import { useState } from "react";

import "../../styles/addExpense.css";

import { GrAdd } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";

import ExpenseForm from "./ExpenseForm";

import { BASE_URL } from "../../utils/utils";
import {
  displayForm,
  expenseMode,
  incomeMode,
} from "../../store/slices/addExpenseSlice";

import axios from "axios";

const AddExpense = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.addExpense.mode);

  const gettoken = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      return token;
    }
    return null;
  };

  const [input, setInput] = useState({
    earnings: null,
    spent: null,
    describe: null,
    catagory: null,
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const fullformEnable = () => {
    dispatch(displayForm());
  };

  const expenseHandler = () => {
    dispatch(expenseMode());
  };

  const earningHandler = () => {
    dispatch(incomeMode());
  };

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const sumbitExpense = async (e) => {
    e.preventDefault();

    try {
      const token = gettoken();
      setSubmitStatus(null);
      let url;

      if (mode.expense) {
        url = BASE_URL + "user/expense";
      } else if (mode.income) {
        url = BASE_URL + "user/income";
      } else {
        return;
      }

      const { data } = await axios.post(url, {
        input: input,
        token: token,
      });
      if (data.succes) setSubmitStatus(data.message);

      //routing to home after succes full post request
    } catch (err) {
      setSubmitStatus("someting went wrong please try again");
    }
    setTimeout(() => {
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <>
      <div className="add-expense">
        <h5 className="text-center h5 m-0 bg-info text-light">
          {" "}
          Add Expense and Income
        </h5>
        {submitStatus && (
          <p className="expense_submit_status text-success fs-4 text-capitalize ">
            {submitStatus}
          </p>
        )}

        <ExpenseForm
          addExpense={mode.addExpense}
          expense={mode.expense}
          income={mode.income}
          fullformEnable={fullformEnable}
          expenseHandler={expenseHandler}
          earningHandler={earningHandler}
          inputHandler={inputHandler}
          sumbitExpense={sumbitExpense}
          submitStatus={submitStatus}
        />
        <div className={`add-exp-button ${mode.addExpense ? "active" : ""}`}>
          <button onClick={fullformEnable}>
            <GrAdd />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
