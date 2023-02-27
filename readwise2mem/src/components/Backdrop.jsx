import React from "react";

const Backdrop = ({ children, onClick, visible }) => {
  return (
    <div
      className={visible ? "backdrop" : "backdop inactive"}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
