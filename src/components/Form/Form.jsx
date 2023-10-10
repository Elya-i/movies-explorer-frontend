import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

function Form({
  formName,
  submitText,
  children,
  handleSubmit,
  registrationError,
  validation,
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    isFocused,
    onFocus,
  } = validation;

  return (
    <form 
      className="form" 
      onSubmit={handleSubmit} 
      noValidate
      name={`${formName}-form`} >
      {children}
      <label htmlFor="email" className="form__label">
        E-mail
      </label>
      <input
        autoComplete="off"
        required
        id="email"
        name="email"
        className={`form__input ${errors.email && "form__input-error"}`}
        placeholder="Введите email"
        minLength="5"
        maxLength="30"
        type="email"
        value={values.email || ""}
        onFocus={onFocus}
        onChange={handleChange}
      />
      <span className="form__input-error">{isFocused && errors.email}</span>
      <label htmlFor="password" className="form__label">
        Пароль
      </label>
      <input
        autoComplete="off"
        required
        id="password"
        name="password"
        className={`form__input ${errors.password && "form__input-error"}`}
        placeholder="Введите пароль"
        minLength="8"
        maxLength="30"
        type="password"
        value={values.password || ""}
        onFocus={onFocus}
        onChange={handleChange}
      />
      <span className="form__input-error">{isFocused && errors.password}</span>
      <button className="form__button button" type="submit" disabled={!isValid}>
        {submitText.buttonText}
      </button>
      {registrationError && (
        <p className="form__input-error">При регистрации пользователя произошла ошибка</p>
      )}
      <p className="form__confirmation">
        {`${submitText.confirmation} `}
        <Link className="form__link link" to={submitText.route}>
          {submitText.linkText}
        </Link>
      </p>
    </form>
  );
}

export default Form;