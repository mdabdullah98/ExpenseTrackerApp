import React, { useState } from "react";

import { AiOutlineCloudDownload } from "react-icons/ai";

import { BASE_URL, headers } from "../../utils/utils.js";

import ExpenseChild from "../displayExpense/ExpenseChild";

import IncomeChild from "../displayExpense/IncomeChild";

import Total from "../displayExpense/Total";

import axios from "axios";

import Pagination from "./Pagination.jsx";

import "../../styles/expense.css";

const Expense = ({
  deleteExpenseHandler,
  expenseHeading,
  expense,
  income,
  user,
  userPaymentStatus,
}) => {
  const [status, setStatus] = useState(null);

  //foe the current page and it will chnage according oto buuton click
  const [currentPage, setCurrentPage] = useState(1);

  //thisis for how many element would on current page
  const [postPerPage, setPostPerPage] = useState(5);

  const total_expense = user.total_expense;

  const total_income = user.total_income;

  const expenseDate = expense.find((expense) => expense.date);

  const downloadexpenseHandler = async () => {
    setStatus(null);
    try {
      const { data } = await axios(
        BASE_URL + `user/download_expense/${user.id}`
      );
      setStatus("file saved succesfull");

      if (data.success) {
        let a = document.createElement("a");
        a.href = data.fileUrl;
        a.download = "myExpense.csv";
        a.click();
      }
    } catch (err) {
      setStatus(err.message);
    }
  };

  const lastPage = currentPage * postPerPage;
  const firstPage = lastPage - postPerPage;
  const paginationArr = expense?.slice(firstPage, lastPage);

  return (
    <>
      <div className="expense-income-details">
        <h4>Day to Day {expenseHeading}</h4>
        <h6 className="text-center mt-2">
          {expenseDate && (
            <>
              <span className="me-2">
                {new Date(expenseDate.date).toLocaleDateString("en-us", {
                  month: "long",
                })}
              </span>
              <span>{new Date(expenseDate.date).getDate()}</span>
            </>
          )}
        </h6>

        <div className="expense-cards">
          {userPaymentStatus?.payment_status && (
            <button
              className="btn download-btn border-2 border-info"
              onClick={downloadexpenseHandler}
            >
              <a href="#">
                <AiOutlineCloudDownload />
              </a>
              Download
            </button>
          )}
          <p className="error-handle text-danger mb-3">{status}</p>
          <table className="table table-hover" id="table">
            <thead>
              <tr className="table-info">
                <th scope="col">Date</th>
                <th scope="col">Desceription</th>
                <th scope="col">Catagory</th>
                <th scope="col">Expenses</th>
                <th scope="col">income</th>
              </tr>
            </thead>
            <tbody>
              <ExpenseChild expense={paginationArr} />
              <IncomeChild income={income} />
            </tbody>
          </table>

          <Total
            expense={expense}
            total_expense={total_expense}
            total_income={total_income}
          />
          <Pagination
            setCurrentPage={setCurrentPage}
            totalPage={expense?.length}
            postPerPage={postPerPage}
            currentPage={currentPage}
            setPostPerPage={setPostPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Expense;
