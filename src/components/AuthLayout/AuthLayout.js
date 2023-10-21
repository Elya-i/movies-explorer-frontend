import React from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";
import headerLogo from '../../images/header-logo.svg';
import Form from "../Form /Form";
import AuthTitle from "../AuthTitle/AuthTitle";

function AuthLayout({
  title,
  name,
  onSubmit,
  isFormValid,
  buttonText,
  ...props
}) {
  return (
    <section className="auth-layout">
      <Link className="link" to="/">
        <img src={headerLogo} className="auth-layout__logo" alt="Логотип проекта Movies Explorer" />
      </Link>
      <AuthTitle title={title} />
      <Form
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
      >
        {props.children}
      </Form>
      {name === "register" ? (
        <p className="auth-layout__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth-layout__link link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth-layout__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth-layout__link link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthLayout;
