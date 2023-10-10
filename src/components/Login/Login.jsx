import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Form from '../Form/Form';
import headerLogo from '../../images/header-logo.svg';

import useFormValidation from '../../hooks/useFormValidation';

function Login( {handleLogin, loginError }) {
  const formValidation = useFormValidation();
  const { email, password } = formValidation.values;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
    formValidation.resetValidation();
  };

  return (
    <section className="login">
      <div className="login__container">
        <Link className="login__link" to="/">
          <img src={headerLogo} className="authorization__logo" alt="Логотип проекта Movies Explorer" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <Form
          submitText={{
            buttonText: "Войти",
            confirmation: "Ещё не зарегистрированы?",
            route: "/signup",
            linkText: "Регистрация",
          }}
          onSubmit={handleSubmit}
          validation={formValidation}
          formName="login"
          loginError={loginError}
        />
      </div>
    </section>
  );
}

export default Login;