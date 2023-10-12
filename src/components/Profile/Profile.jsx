import React, { useEffect, useContext } from 'react';
import './Profile.css';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({
  handleLogout,
  onUpdateUser,
  isUpdateError,
  isUpdateComplete
 }) {

  const currentUser = useContext(CurrentUserContext);
  const formValidation = useFormValidation();
  const { name, email } = formValidation.values;

  useEffect(() => {
    formValidation.setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, []);

  console.log({name});

  const submitEditProfile = (event) => {
    event.preventDefault();
    onUpdateUser(name, email);
  };

  return (
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">
            Привет, {currentUser && currentUser.name}
            !
          </h1>
          <form
            noValidate
            onSubmit={submitEditProfile}
            className="profile__form"
            name="edit-form"
          >
            <label className="profile__label" htmlFor="name">
              Имя
              <input 
                autoComplete="off"
                id="name"
                type="text"
                onChange={formValidation.handleChange}
                value={name || ""}
                required
                minLength="2"
                maxLength="30"
                className="profile__input"
                name="name"
              />
            </label>
            <label className="profile__label" htmlFor="email">
              Почта
              <input
                autoComplete="off"
                id="email"
                type="email"
                onChange={formValidation.handleChange}
                value={email || ""}
                required
                className="profile__input"
                name="email"
              />
            </label>
            <p className="profile__form-error">
              {formValidation.errors.name ||
                formValidation.errors.email}
            </p>
            {isUpdateError && (
              <p className="profile__form-error">Ошибка обновления данных</p>
            )}
            {isUpdateComplete && (
              <p className="profile__form-complete">Данные успешно обновлены</p>
            )}
            <button
              className="profile__button-edit button"
              type="submit"
              disabled={
                (currentUser &&
                  name === currentUser.name &&
                  email === currentUser.email) ||
                !formValidation.isValid
              }
            >
              Редактировать
            </button>
            <button
              onClick={handleLogout}
              className="profile__button-logout button"
              type="button"
            >
              Выйти из аккаунта
            </button>
          </form>
        </div>
      </section>
  )}

export default Profile;