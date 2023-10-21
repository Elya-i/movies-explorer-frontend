import React from 'react';
import { Navigate } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Login.css';

import AuthLayout from '../AuthLayout/AuthLayout';

function Login({ onLogin, onLoading, loggedIn }) {
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
        buttonText={onLoading ? "Вход..." : "Войти"}
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
            minLength="6"
            id="email-input"
            disabled={onLoading ? true : false}
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
            minLength="6"
            maxLength="30"
            disabled={onLoading ? true : false}
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
      </AuthLayout>
    </main>
  );
}

export default Login;
