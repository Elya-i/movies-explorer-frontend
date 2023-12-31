import React from 'react';
import { Navigate } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import "./Register.css";

import AuthLayout from '../AuthLayout/AuthLayout';
import { REG_EXP_USER_NAME } from "../../utils/constants";

function Register({ isFormDisabled, onRegister, loggedIn }) {

  const { values, errors, isFormValid, onChange } = useFormWithValidation();

  function onSubmit(event) {
    event.preventDefault();
    onRegister(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="register">
      <AuthLayout
        title="Добро пожаловать!"
        name="register"
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={"Зарегистрироваться"}
      >
        <label className="form__input-container">
          Имя
          <input
            className={`form__input ${errors.name && 
              "form__input_incorrect"}`}
            type="text"
            name="name"
            form="register"
            required
            placeholder="Введите имя"
            minLength="2"
            maxLength="30"
            pattern={REG_EXP_USER_NAME}
            disabled={isFormDisabled}
            id="name-input"
            onChange={onChange}
            value={values.name || ''}
          />
          <span
            className={`form__input-error ${errors.name ? 
              "form__input-error_active" : ""}`}
          >
            {errors.name || ''}
          </span>
        </label>
        <label className="form__input-container">
          E-mail
          <input
            className={`form__input ${errors.email ? 
              "form__input_incorrect" : ''}`}
            type="text"
            name="email"
            form="register"
            required
            placeholder="Введите email"
            disabled={isFormDisabled}
            id="email-input"
            onChange={onChange}
            value={values.email || ''}
          />
          <span
            className={`form__input-error ${errors.email ? 
              "form__input-error_active" : ''}`}
          >
            {errors.email || ''}
          </span>
        </label>
        <label className="form__input-container">
          Пароль
          <input
            className={`form__input ${errors.password ? 
              "form__input_incorrect" : ''}`}
            type="password"
            name="password"
            form="register"
            required
            autoComplete="off"
            placeholder="Введите пароль"
            minLength="8"
            disabled={isFormDisabled}
            id="password-input"
            onChange={onChange}
            value={values.password || ""}
          />
          <span
            className={`form__input-error ${
              errors.password ? "form__input-error_active" : ""
            }`}
          >
            {errors.password || ""}
          </span>
        </label>
        <button
          className={`form__button-submit form__button-submit_type_register ${
            (!isFormValid || isFormDisabled) && "form__button-submit_disabled"
          }`}
          type="submit"
          isFormValid={isFormValid}
          isFormDisabled={isFormDisabled}
        >
          {isFormDisabled ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </AuthLayout>
    </main>
  );
}

export default Register;
