import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useUserInteractionStore } from "../Zustand/store";

export default function Nav() {
  
  const page = useUserInteractionStore((state) => state.page);

  return (
    <nav>
      <div
        className={`navLinkContainer ${
          page === "index" ? "navLinkContainer--selected" : ""
        }`}
      >
        <Link to={"/"} className="linkcustom">
          Current Employees
        </Link>
      </div>

      <div
        className={`navLinkContainer ${
          page === "employee" ? "navLinkContainer--selected" : ""
        }`}
      >
        <Link to={"/addemployee"} className="linkcustom">
          Add Employee
        </Link>
      </div>
    </nav>
  );
}
