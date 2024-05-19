import React, { useState } from "react";
import "../styles/leaderBoard.css";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const LeaderBoard = () => {
  // const token = JSON.parse(sessionStorage.getItem('token'))
  const [showLeaderBoard, setshowLeaderBoard] = useState(false);
  const [expenses, setExpenses] = useState([]);

  //geting expense for the leader board
  const get_total_Expense = async () => {
    const res = await axios(BASE_URL + "user/get_total_expense");
    setExpenses(res.data);
    console.log(res.data);
  };

  const showLeaderBoardHandler = () => {
    setshowLeaderBoard((prev) => !prev);
    get_total_Expense();
  };

  return (
    <>
      <div className="leaderboard-main">
        <button
          className={`${showLeaderBoard ? "btn-bg" : ""}`}
          onClick={showLeaderBoardHandler}
        >
          show Leader Board
        </button>

        {showLeaderBoard && (
          <div className="leaderboard-content">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">name</th>
                  <th scope="col">Total Expense</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0
                  ? expenses.map(({ username, total_expense }, index) => {
                      index = index + 1;
                      // const createdAt = createdAt.toLocaleDateString();
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <th scope="row">{index}</th>
                            <td>{username}</td>
                            <td>{total_expense}</td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                  : "no expense found"}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default LeaderBoard;
