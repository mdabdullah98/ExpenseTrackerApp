// import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/alreadyUSer.css";

const AlreadyUser = () => {
  return (
    <>
      <div className="already-user">
        <h3>Already a User ?</h3>
        <p className="mt-3 w-75">
          If you are a new user then please click on I am New user and create a
          account otherwise if you are already a user then please login using
          login button.
        </p>

        <div>
          <>
            <button className="btn btn-sm btn-warning me-1 my-3 ">
              <NavLink
                to={"/user/signup"}
                className="text-decoration-none text-black"
              >
                I am New User
              </NavLink>
            </button>

            <button className="btn btn-sm btn-info m-1">
              <NavLink
                to={"/user/login"}
                className="text-decoration-none text-black  "
              >
                Login
              </NavLink>
            </button>
          </>
        </div>
      </div>
    </>
  );
};

export default AlreadyUser;
