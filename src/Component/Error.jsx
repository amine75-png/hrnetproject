import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useUserInteractionStore } from "../Zustand/store";

const Error = () => {
  const { updatePageLocation } = useUserInteractionStore();

  useEffect(() => {
    updatePageLocation({
      page: "error",
      pageTitle: "HRnet - Page Not Found",
    });
  }, [updatePageLocation]);

  return (
    <div className="pageWrapper">
      <h1 className="errorNumber">404</h1>
      <p className="errorMessage">
        Oups! La page que vous demandez n&apos;existe pas.
      </p>
      <p className="backHomeLink">
        <Link to={"/"}>-Retourner sur la page d&apos;accueil</Link>
      </p>
    </div>
  );
};

export default Error;