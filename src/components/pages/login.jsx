import { useState } from "react";
import "../../styles/signup.css";
import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { tokenLoader } from "../../store/slices/user";
import { BASE_URL } from "../../utils/utils";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [pswToggle, setPswToggle] = useState(false);

  const [status, setStatus] = useState(null);

  //updating status for forgot password feild
  const [mailStatus, setMailStatus] = useState({
    status: false,
    statusTxt: null,
  });

  // usestaye for  userinput handler
  const [input, setInput] = useState({
    email: null,
    psw: null,
  });

  // toggle for password hide and show
  const ShowPswHandler = () => {
    setPswToggle((prev) => !prev);
  };

  //updating input handler input using onchange evnet listnener
  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //login handler function to login the user after checking the database
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setStatus(null);
      setStatus("sending...");

      const res = await axios.post(BASE_URL + "user/login", input);

      if (res.data) {
        setStatus("login succesfully");
        sessionStorage.setItem("token", JSON.stringify(res.data));
        dispatch(tokenLoader(res.data));
        navigate("/");
      }
    } catch (err) {
      if (
        err.response.status === 401 ||
        err.response.status === 404 ||
        err.response.status === 500
      ) {
        setStatus(err.response.data);
      }
    }
  };

  return (
    <>
      <div className="signup-form">
        <form className="modal-content" onSubmit={loginHandler}>
          <div className="container">
            <p className="login-alert">{status}</p>
            <h3 className="my-1">Login</h3>
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              required
              autoComplete="on"
              onChange={inputHandler}
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={pswToggle ? "text" : "password"}
                placeholder="Enter Password"
                name="psw"
                id="psw"
                required
                autoComplete="new-password"
                onChange={inputHandler}
              />
              <span className={`${input.psw ? "check-psw" : ""}`}>
                {input.psw ? (
                  pswToggle ? (
                    <AiFillEye onClick={ShowPswHandler} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={ShowPswHandler} />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="clearfix">
              <label className="w-100 d-flex justify-content-end my-3">
                <NavLink
                  to={"/user/forgot-password/verify-email"}
                  className="text-decoration-none "
                  id="forgot_password"
                >
                  Forgot password !
                </NavLink>
              </label>
              <button type="submit" className="signupbtn">
                Login
              </button>
              <p>do not have an account signup ?</p>
              <button type="button" className="signupbtn">
                <NavLink to={"/user/signup"}>Signup</NavLink>
              </button>
              <button type="button" className="cancelbtn">
                <NavLink to={"/"}>Cancel</NavLink>
              </button>
            </div>
          </div>
        </form>
        {mailStatus.status && (
          <p
            className={`status p-1 ${
              mailStatus.statusTxt.startsWith("email") || input.email == ""
                ? "bg-danger"
                : "bg-success"
            } text-light rounded`}
          >
            {mailStatus.statusTxt}
          </p>
        )}
      </div>
    </>
  );
};

export default Login;
