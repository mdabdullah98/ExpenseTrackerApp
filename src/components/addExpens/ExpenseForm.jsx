import React from "react";

import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";

const ExpenseForm = ({
  addExpense,
  income,
  expense,
  fullformEnable,
  expenseHandler,
  earningHandler,
  inputHandler,
  sumbitExpense,
}) => {
  return (
    <>
      <form
        className={`expense-form ${addExpense ? "active" : ""}`}
        onSubmit={sumbitExpense}
      >
        <div className=" ">
          <span className="close-form" onClick={fullformEnable}>
            <AiOutlineCloseCircle />
          </span>
        </div>

        <div className="expense-earning">
          <button
            type="button"
            onClick={expenseHandler}
            className={`${expense}`}
          >
            expense
          </button>
          <button
            type="button"
            onClick={earningHandler}
            className={`${income}`}
          >
            Income
          </button>
        </div>
        <div>
          <label htmlFor="spent">{income ? "earnings" : "Spent"}</label>
          <input
            type="text"
            name={income ? "earnings" : "spent"}
            id="spent"
            placeholder="Amount here"
            onChange={inputHandler}
            required
            autoComplete="on"
          />
        </div>

        <div>
          <label htmlFor="describe">describe here </label>
          <input
            type="text"
            name="describe"
            id="describe"
            placeholder="describe here"
            onChange={inputHandler}
            required
            autoComplete="on"
          />
        </div>

        {!income ? (
          <div>
            <label htmlFor="catagory">catagory </label>
            <select name="catagory" id="catagory" onChange={inputHandler}>
              <option value="">Select</option>
              <option value="food">food</option>
              <option value="rent">rent</option>
              <option value="parking">parking</option>
              <option value="library">library</option>
              <option value="fuel">fuel</option>
              <option value="travel">travel</option>
              <option value="shopping">shopping</option>
              <option value="bike_car_service">Bike / car service</option>
              <option value="electricity_bill">electricity bill</option>
              <option value="wifi_bill">wifi bill</option>
              <option value="mobile bill">mobile bill</option>
              {/* <option value="travel"></option> */}
            </select>
          </div>
        ) : (
          ""
        )}
        <div className="checkbox">
          <label>
            <AiOutlineCheck />
            <input type="submit" className="visually-hidden" />
          </label>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
