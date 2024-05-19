import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utils/utils";

import axios from "axios";

import Input from "./Input.jsx";

import Form from "./Form.jsx";

import "../../styles/signup.css";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [showPasswordFeild, setShowPasswordFeild] = useState(true);

  const [loader, setLoader] = useState(false);

  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    email: null,
    username: null,
  });

  const [inputListener, setInputListener] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const onchangeInputHandler = (e) => {
    setInputListener((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const verifyEmaildHandler = async () => {
    setLoader((prev) => !prev);

    setError(null);

    setUser(null);

    try {
      if (inputListener.email === null) {
        setError("please type valid email");
        return;
      }
      const { data } = await axios.post(
        BASE_URL + "user/forgot-password/verify-email",
        {
          email: inputListener.email,
        }
      );
      console.log(data.success);

      if (data.success && data.username) {
        setShowPasswordFeild(false);
        setUser({
          email: data.email,
          username: data.username,
        });
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoader((prev) => !prev);
    }
  };

  const resetPasswordHandler = async () => {
    setLoader((prev) => !prev);

    setError(null);

    try {
      if (
        inputListener.password === null ||
        inputListener.confirmPassword === null
      ) {
        setError("Password feild should not be empty ");
        return null;
      }

      if (inputListener.password !== inputListener.confirmPassword) {
        setError("Password does not match");
        return null;
      }

      const { data } = await axios.post(
        BASE_URL + "user/forgot-password/reset-password",
        {
          password: inputListener.confirmPassword,
          email: user.email,
        }
      );

      if (data.success) {
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoader((prev) => !prev);
    }
  };

  return (
    <>
      <Form heading="Reset Password">
        <p className="text-danger">{error}</p>
        <div className={`${!showPasswordFeild && "d-none"}`}>
          <Input
            htmlFor="email"
            type="email"
            placeholder="enter email"
            name="email"
            id="email"
            required
            autoComplete="on"
            onChange={onchangeInputHandler}
          />
          <div className="d-flex justify-content-between align-content-center">
            {/* <button type="button" className="btn btn-outline-info ">
              <NavLink to={"/user/login"}>cancel</NavLink>
            </button> */}

            <NavLink to={"/user/login"}>
              <button type="button" className="btn btn-outline-info ">
                cancel
              </button>
            </NavLink>
            <button
              type="button"
              className="btn btn-outline-dark "
              onClick={verifyEmaildHandler}
            >
              {loader ? "verifying..." : "Verify Email"}
            </button>
          </div>
        </div>

        <div className={`${showPasswordFeild && "d-none"}`}>
          <Input
            label="Password"
            htmlFor="password"
            type="password"
            placeholder="Enter new password"
            name="password"
            id="password"
            autoComplete="on"
            required
            onChange={onchangeInputHandler}
          />

          <Input
            label="Confirm Password"
            htmlFor="confirm-password"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            id="confirm-password"
            autoComplete="on"
            required
            onChange={onchangeInputHandler}
          />

          <div className="d-flex justify-content-between align-content-center">
            <NavLink to={"/user/login"}>
              <button type="button" className="btn btn-outline-info ">
                cancel
              </button>
            </NavLink>

            <button
              type="button"
              className="btn btn-outline-info rounded-end-3"
              onClick={resetPasswordHandler}
            >
              {loader ? "Resetting" : "Reset Password"}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default VerifyEmail;
