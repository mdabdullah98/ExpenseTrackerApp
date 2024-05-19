import React from "react";

const Total = ({ total_income, total_expense, expense }) => {
  return (
    <>
      <div className="w-100 d-flex justify-content-end align-items-center my-2 ">
        <h6 className="fs-4 me-5">Total </h6>
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <span className="text-success  border-bottom border-dark pb-1 px-3">
            Credit {total_income}
          </span>
          <span className="text-danger">Debit {total_expense}</span>
        </div>

        {expense && expense.length > 0 && (
          <div>
            <span className="mx-1"> = </span>
            <span
              className={`${
                total_expense > total_income ? "text-danger" : "text-success"
              } me-2`}
            >
              {total_income > total_expense ? " Savings" : "Loss"}
            </span>
            <span className="me-2">
              {Math.abs(total_expense - total_income)}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Total;
