import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../Asset/logoHrNet.svg";
import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      <div className="enterprise">
        <Link to={"/"}>
          <div className="logoContainer">
            <img src={Logo} alt="Logo Wealth Health" />
          </div>
          <div className="name">
            Wealth Health - <span>HRnet</span>
          </div>
        </Link>
      </div>
      <div className="navContainer">
        <Nav />
      </div>
    </header>
  );
}
