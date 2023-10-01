import React from 'react';
import headerLogo from '../../images/header-logo.svg'
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <section className="authorization">
      <div className="authorization__container">
      <Link to="/" className="link">
          <img src={headerLogo} className="authorization__logo" alt="Логотип проекта Movies Explorer" />
        </Link>
        <h1 className="authorization__title">Добро пожаловать!</h1>
        <form className="authorization__form" name="register">
          <fieldset className="authorization__fieldset">
            <div className="authorization__input-container">
              <label className="authorization__input-label">Имя</label>
              <input
                type="text"
                id="name-input"
                className="authorization__input"
                placeholder="Введите ваше имя"
                name="name"
                minLength="2"
                maxLength='30'
                value="Виталий"
                required />
            </div>
            <div className="authorization__input-container">
              <label className="authorization__input-label">E-mail</label>
              <input
                id="email-input"
                className="authorization__input"
                type="email"
                placeholder="Введите email"
                name="email"
                minLength="5"
                maxLength="30"
                value='pochta@yandex.ru'
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
          <span className="authorization__error">Что-то пошло не так...</span>
          <button className="authorization__button button" type="submit">Зарегистрироваться</button>
          <div className="authorization__confirmation-container">
            <p className="authorization__confirmation">Уже зарегистрированы?</p>
            <Link className="authorization__confirmation authorization__confirmation_link link" to='/signin'>Войти</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;