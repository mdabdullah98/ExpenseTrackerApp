import { useState, useEffect } from "react";

import { CiMenuFries } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

import AddExpense from "../addExpens/addExpense";

import ExpenseMain from "../expenseMain/ExpenseMain";

import AlreadyUser from "../AlreadyUser";

import { getUser } from "./homeUtils";

import brand_logo from "../../assets/brand_logo.jpg";
import dayToDayExpense from "../../assets/day-to-day-expenses.png";

import { BASE_URL } from "../../utils/utils";

import axios from "axios";

import "../../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(true);

  const [user, setUser] = useState({});

  const token = JSON.parse(sessionStorage.getItem("token"));

  const menuShow = () => {
    setMenu((prev) => !prev);
  };

  const logouthandler = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // checkoutHandler which do post request for the rezorpay
  const checkoutHandler = async (e) => {
    e.preventDefault();
    const url = BASE_URL + "api/user";

    const { data: order } = await axios.post(
      `${url}/checkout/create_order`,
      user
    );

    //razorpay option
    const options = {
      key: user.key_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Techer Technology",
      description: "Test Transaction",
      image: brand_logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        await axios.post(`${url}/paymentVerification`, {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          username: user.username,
          email: user.email,
        });
        alert("You Are Now a Premium User");
        window.location.reload();
      },
      prefill: {
        name: user.username,
        email: user.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#de9b14",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
    razor.on("payment.failed", function (response) {
      alert("payment failed please try again later");
    });
  };

  useEffect(() => {
    getUser(token)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="outer-main">
        <div className={`main-expense-div ${menu ? "active" : ""}`}>
          <div className="brand-logo d-flex justify-content-center align-items-center my-3">
            <div className="content d-flex justify-content-center align-items-center mx-3">
              <img src={dayToDayExpense} alt="expense avatar" width={100} />
              <h1 className="ms-2 p-2">welcome to day-to-day expenses</h1>
            </div>
            <div className="login-logout">
              {token ? (
                <>
                  <div>
                    <button
                      className="logout-btn btn btn-outline-danger"
                      onClick={logouthandler}
                    >
                      logout
                    </button>
                  </div>

                  {user?.payment_status == "" ||
                  user?.payment_status == "pending" ? (
                    <div>
                      <button
                        className="btn btn-outline-info"
                        onClick={checkoutHandler}
                      >
                        buy premium
                      </button>
                    </div>
                  ) : (
                    <p className="premium">Premium User</p>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="menu" onClick={menuShow}>
          <CiMenuFries />
        </div>
      </div>

      {token && <AddExpense />}
      {token && <ExpenseMain userPaymentStatus={user} />}
      {!token && <AlreadyUser />}
    </>
  );
};

export default Home;
