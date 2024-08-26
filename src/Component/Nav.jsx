import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Nav() {
  return (
    <nav>
      <div className="navLinkContainer">
        <Link to={"/"} className="linkcustom">
          Current Employees
        </Link>
      </div>

      <div className="navLinkContainer">
        <Link to={"/addemployee"} className="linkcustom">
          Add Employee
        </Link>
      </div>
    </nav>
  );
}