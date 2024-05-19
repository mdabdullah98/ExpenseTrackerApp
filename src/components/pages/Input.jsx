import React from "react";

function Input({ label, htmlFor, ...props }) {
  return (
    <div className="my-3">
      {label && <label htmlFor={htmlFor}>{label}</label>}

      <input {...props} />
    </div>
  );
}

export default Input;
