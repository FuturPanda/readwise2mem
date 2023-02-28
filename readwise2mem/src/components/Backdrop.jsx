import React from "react";

const Backdrop = ({ children, onClick, visible }) => {
  if (!visible) return null;
  return (
    <div
      className={visible ? "backdrop" : "backdrop inactive"}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
