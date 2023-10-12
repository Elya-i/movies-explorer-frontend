import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import headerLogo from '../../images/header-logo.svg'
import Form from "../Form/Form";

import useFormValidation from '../../hooks/useFormValidation';

function Register({ onRegister, registrationError }) {
  const formValidation = useFormValidation();
  const { email, password, name } = formValidation.values;
  const {
    values,
    onFocus,
    handleChange,
    isFocused,
    errors,
  } = formValidation;

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(email, password, name);
    formValidation.resetValidation();
  };

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img src={headerLogo} className="register__logo" alt="Логотип проекта Movies Explorer" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form
          submitText={{
            buttonText: "Зарегистрироваться",
            confirmation: "Уже зарегистрированы?",
            route: "/signin",
            linkText: "Войти",
          }}
          registrationError={registrationError}
          handleSubmit={handleSubmit}
          validation={formValidation}
          formName="register"
        >
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            autoComplete="off"
            required
            id="name"
            name="name"
            className={`form__input ${errors.name && "form__input-error"}`}
            placeholder="Введите имя"
            minLength="2"
            maxLength="30"
            type="text"
            value={values.name || ''}
            onFocus={onFocus}
            onChange={handleChange}
          />
        <span className="form__input-error">{isFocused && errors.name}</span>
        </Form>
      </div>
    </section>
  );
}

export default Register;