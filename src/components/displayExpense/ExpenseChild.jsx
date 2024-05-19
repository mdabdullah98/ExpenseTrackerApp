import React from "react";

const ExpenseChild = ({ expense }) => {
  return (
    <>
      {expense?.length > 0
        ? expense.map(({ spent, describe, catagory, id, date }, index) => {
            index = index + 1;
            return (
              <React.Fragment key={index}>
                <tr>
                  <th scope="row">{new Date(date).toLocaleDateString()}</th>
                  <td data-t="">{describe}</td>
                  <td>{catagory}</td>
                  <td>{spent}</td>
                  <td className="fw-bold">0.00</td>

                  {/* <td>
                              <div className="border-0 ">
                                <button
                                  className="btn btn-sm btn-outline-danger "
                                  onClick={() => deletExpense(id)}
                                >
                                  delete
                                </button>
                              </div>
                            </td> */}
                </tr>
              </React.Fragment>
            );
          })
        : " "}
    </>
  );
};

export default ExpenseChild;
