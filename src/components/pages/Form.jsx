import React from "react";

function Form({ children, heading = null }) {
  return (
    <div className="signup-form reset-password ">
      <div className="w1-00 d-flex justify-content-end align-items-center mx-3">
        <form className="modal-content">
          <div className="container">
            {heading && <h6 className="my-4">{heading}</h6>}
            {children}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
