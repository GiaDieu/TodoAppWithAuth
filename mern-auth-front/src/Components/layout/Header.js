import React from "react";
import AuthOptions from "../auth/AuthOptions";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>Todo Application</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
