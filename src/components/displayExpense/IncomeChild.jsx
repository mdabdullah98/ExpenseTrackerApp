import React from "react";

const IncomeChild = ({ income }) => {
  return (
    <>
      {income?.length > 0
        ? income.map(({ earnings, date, income_description }, index) => {
            index = index + 1;
            return (
              <React.Fragment key={index}>
                <tr>
                  <th scope="row">{new Date(date).toLocaleDateString()}</th>
                  <td>{income_description}</td>
                  <td>{income_description}</td>
                  <td className="fw-bold">0.00</td>
                  <td>{earnings}</td>
                </tr>
              </React.Fragment>
            );
          })
        : ""}
    </>
  );
};

export default IncomeChild;
