import React from "react";

const Button = ({ text, fonction, onClick }) => {
  return (
    <button aria-label={fonction} id="btnCpn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
