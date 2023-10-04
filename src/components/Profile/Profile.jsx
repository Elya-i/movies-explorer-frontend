import React, { useState } from 'react';
import './Profile.css';

function Profile() {

  const [editProfileData, setEditProfileData] = useState(false);

  function handleClickEditButton(event) {
    event.preventDefault();
    setEditProfileData(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEditProfileData(false);
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" name="edit" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__input-container">
            <label className="profile__input-label">Имя</label>
              <input
                id="name-input"
                className="profile__input profile__input_name"
                type="name"
                placeholder="Имя"
                name="name"
                minLength="2"
                maxLength="200"
                required />
            </div>
            <div className="profile__input-container">
            <label className="profile__input-label">E-mail</label>
              <input
                id="email-input"
                className="profile__input profile__input_email"
                type="email"
                placeholder="Email"
                name="email"
                minLength="2"
                maxLength="40"
                required />
            </div>
            <div className="profile__button-container">
              {editProfileData ?
                <button
                  className="profile__button profile__button_submit button"
                  type="submit"
                  onClick={handleSubmit}>
                  Сохранить
                </button>
                :
                <>
                  <button
                    className="profile__button profile__button_edit button"
                    type="button" onClick={handleClickEditButton}>
                    Редактировать
                  </button>
                  <button
                    className="profile__button profile__button_logout button"
                    type="button">
                    Выйти из аккаунта
                  </button>
                </>
              }
            </div>
          </fieldset>
        </form>
      </div>

   </section>   
  )
}

export default Profile;

