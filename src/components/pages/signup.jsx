import { useState } from "react";

import "../../styles/signup.css";

import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";

import { signupUser } from "../../store/slices/user";

import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, message } = useSelector((state) => state.user);

  const [pswToggle, setPswToggle] = useState({
    showPsw: false,
    showRepeatPsw: false,
  });

  const [input, setInput] = useState({
    username: null,
    email: null,
    psw: null,
    pswRepeat: null,
  });

  const ShowPswHandler = () => {
    setPswToggle({
      ...pswToggle,
      showPsw: !pswToggle.showPsw,
    });
  };
  const ShowRepeatPswHandler = () => {
    setPswToggle({
      ...pswToggle,
      showRepeatPsw: !pswToggle.showRepeatPsw,
    });
  };

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const sumbitForm = async (e) => {
    e.preventDefault();

    if (input.psw === input.pswRepeat) {
      dispatch(signupUser(input));
      navigate("/user/login");
    }
  };

  return (
    <>
      <div className="signup-form">
        <p className="">{status}</p>
        <p className="message">{message}</p>
        <form className="modal-content" onSubmit={sumbitForm}>
          <div className="container">
            <h3 className="my-1">Sign Up</h3>
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              id="username"
              required
              onChange={inputHandler}
            />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email "
              required
              onChange={inputHandler}
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={pswToggle.showPsw ? "text" : "password"}
                placeholder="Enter Password"
                minLength={6}
                maxLength={12}
                name="psw"
                id="psw"
                required
                autoComplete="new-password"
                onChange={inputHandler}
              />
              <span className={`${input.psw ? "check-psw" : ""}`}>
                {input.psw ? (
                  pswToggle.showPsw ? (
                    <AiFillEye onClick={ShowPswHandler} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={ShowPswHandler} />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>

            <label htmlFor="pswRepeat">
              <b>Repeat Password</b>
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={pswToggle.showRepeatPsw ? "text" : "password"}
                placeholder="Repeat Password"
                minLength={6}
                maxLength={12}
                name="pswRepeat"
                id="pswRepeat"
                required
                autoComplete="new-password"
                onChange={inputHandler}
              />
              <span className={`${input.pswRepeat ? "check-psw" : ""}`}>
                {input.pswRepeat ? (
                  pswToggle.showRepeatPsw ? (
                    <AiFillEye
                      onClick={ShowRepeatPswHandler}
                      className="eye-icon"
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={ShowRepeatPswHandler}
                      className="eye-icon"
                    />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
            {input.pswRepeat ? (
              input.psw != input.pswRepeat ? (
                <p className="text-bg-danger p-1 ">password do not match</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            <div className="clearfix">
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
              {/*  already have an acount login */}
              <p>have already have an account login ?</p>
              <button type="button" className="signupbtn">
                <NavLink to={"/user/login"}>Login</NavLink>
              </button>
              <button type="button" className="cancelbtn">
                <NavLink to={"/"}>Cancel</NavLink>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
