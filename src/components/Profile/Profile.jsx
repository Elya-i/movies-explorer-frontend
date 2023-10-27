import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import AuthTitle from "../AuthTitle/AuthTitle";
import Form from '../Form /Form';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { REG_EXP_USER_NAME } from '../../utils/constants';

function Profile({ isFormDisabled, onUpdateUser, onLogout }) {

  const currentUser = useContext(CurrentUserContext);
  const [isUserDataChanged, setUserDataChanged] = useState(true);
  const [isModifying, setModifying] = useState(false);
  const { values, errors, isFormValid, onChange, resetValidation } =
    useFormWithValidation();

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setUserDataChanged(false)
      : setUserDataChanged(true);
  }, [currentUser, values]);

  useEffect(() => {
    resetValidation(false, currentUser);
  }, [resetValidation, currentUser]);

  function handleEditClick() {
    setModifying(!isModifying);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(values);
  }

  return (
    <main className="profile">
      <section className="profile__container">
        <AuthTitle
          title={`Привет, ${currentUser.name || ""}!`}
          reference="profile"
        />
        <Form
          name="profile"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          isUserDataChanged={isUserDataChanged}
          buttonText={"Сохранить"}
          isModifying={isModifying}
        >
          <label className="form__input-container form__input-container_type_profile">
            Имя
            <input
              className={`form__input form__input_type_profile ${
                errors.name ? "form__input_incorrect" : ""
              }`}
              type="text"
              name="name"
              form="profile"
              required
              autoComplete="off"
              minLength="2"
              maxLength="30"
              pattern={REG_EXP_USER_NAME}
              id="name-input"
              readOnly={!isModifying && true}
              onChange={onChange}
              value={values.name || ""}
            />
          </label>
          <label className="form__input-container form__input-container_type_profile">
            E-mail
            <input
              className={`form__input form__input_type_profile ${
                errors.email ? "form__input_incorrect" : ""
              }`}
              type="text"
              name="email"
              form="profile"
              required
              id="email-input"
              readOnly={!isModifying && true}
              onChange={onChange}
              value={values.email || ""}
            />
          </label>
          <div
            className={`form__errors-container ${
              errors.name || errors.email ? "form__errors-container_active" : ""
            }`}
          >
            <div className="form__error-container">
              <p
                className={`form__error-name ${
                  errors.name ? "form__error-name_active" : ""
                }`}
              >
                Имя:
              </p>
              <span
                className={`form__input-error form__input-error_type_profile ${
                  errors.name ? "form__input-error_active" : ""
                }`}
              >
                {errors.name || ""}
              </span>
            </div>
            <div className="form__error-container">
              <p
                className={`form__error-name ${
                  errors.email ? "form__error-name_active" : ""
                }`}
              >
                E-mail:
              </p>
              <span
                className={`form__input-error form__input-error_type_profile ${
                  errors.email ? "form__input-error_active" : ""
                }`}
              >
                {errors.email || ""}
              </span>
            </div>
          </div>
        </Form>
        <div
          className={`profile__edit ${
            isModifying ? "profile__edit_hidden" : ""
          }`}
        >
          <button
            className="profile__button profile__button_type_edit link"
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_logout link"
            type="button"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;