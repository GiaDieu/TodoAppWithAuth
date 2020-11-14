import React from "react";

const ErrorHandling = ({ message, clearError }) => {
  return (
    <div className="error">
      <span>{message}</span>
      <button onClick={clearError}>x</button>
    </div>
  );
};

export default ErrorHandling;
