import React from "react";
import "./AuthTitle.css";

function AuthTitle({ title, reference }) {
  return (
    <h1 className={`auth-title ${reference === "profile" ? "auth-title_reference_profile" : ""}`}>{title}</h1>
  );
}

export default AuthTitle;
