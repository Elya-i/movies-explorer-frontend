import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';


function Login() {
  return (
    <section className="authorization">
      <div className="authorization__container">
      <Link to="/" className="link">
          <img src={headerLogo} className="authorization__logo" alt="Логотип проекта Movies Explorer" />
        </Link>
        <h1 className="authorization__title">Рады видеть!</h1>
        <form className="authorization__form" name="login">
          <fieldset className="authorization__fieldset">
            <div className="authorization__input-container">
              <label className="authorization__input-label">E-mail</label>
              <input
                id="email-input"
                className="authorization__input"
                type="email"
                placeholder="Введите ваш email"
                name="email"
                minLength="5"
                maxLength="30"
                required />
            </div>
            <div className="authorization__input-container">
              <label className="authorization__input-label">Пароль</label>
              <input
                id="password-input"
                className="authorization__input"
                type="password"
                placeholder="Введите пароль"
                name="password"
                minLength="8"
                maxLength="30"
                required />
            </div>
          </fieldset>
          <span className=" authorization__error authorization__error_login">Что-то пошло не так...</span>
          <button className="authorization__button button" type="submit">Войти</button>
          <div className="authorization__confirmation-container">
            <p className="authorization__confirmation">Ещё не зарегистрированы?</p>
            <Link className="authorization__confirmation authorization__confirmation_link link" to='/signup'>&nbsp;Регистрация</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;