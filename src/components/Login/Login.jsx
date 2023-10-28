import React from 'react';
import { Navigate } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Login.css';

import AuthLayout from '../AuthLayout/AuthLayout';

function Login({ isFormDisabled, onLogin, loggedIn }) {
  const { values, errors, isFormValid, onChange } = useFormWithValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="login">
      <AuthLayout
        title="Рады видеть!"
        name="login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={"Войти"}
      >
        <label className="form__input-container">
          E-mail
          <input
            className={`form__input ${errors.email ? 
              "form__input_incorrect" : ''}`}
            type="text"
            name="email"
            form="login"
            placeholder="Ввведите email"
            required
            autoComplete="off"
            id="email-input"
            disabled={isFormDisabled}
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
            form="login"
            placeholder="Ввведите пароль"
            required
            minLength="8"
            disabled={isFormDisabled}
            id="password-input"
            onChange={onChange}
            value={values.password || ''}
          />
          <span
            className={`form__input-error ${errors.password ? 
              "form__input-error_active" : ''}`}
          >
            {errors.password || ''}
          </span>
        </label>
        <button
          className={`form__button-submit form__button-submit_type_login ${
            (!isFormValid || isFormDisabled) && "form__button-submit_disabled" 
          }`}
          type="submit"
          isFormValid={isFormValid}
          isFormDisabled={isFormDisabled}
        >
          {isFormDisabled ? "Вход..." : "Войти"}
        </button>
      </AuthLayout>
    </main>
  );
}

export default Login;
