import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false)
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false)
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          name={'profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          children={(
            <fieldset className="form__input-container">
              <label className="form__field">
                <input className="form__input form__input_text-profile_name"
                  type="text" name="name" placeholder="Имя" required
                  minLength="2" maxLength="40" id="profile-name" />
                <span className="form__input-error profile-name-error"></span>
              </label>
              <label className="form__field">
                <input className="form__input form__input_text-profile_description"
                  type="text" name="description" placeholder="Описание"
                  required minLength="2" maxLength="200"
                  id="profile-description" />
                <span className="form__input-error profile-description-error">Error
                  is here</span>
              </label>
            </fieldset>
          )}
        />

        <PopupWithForm
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          name={'add-card'}
          title={'Новое место'}
          buttonText={'Создать'}
          children={(
            <fieldset className="form__input-container">
              <label className="form__field">
                <input className="form__input form__input_text-add-card_name"
                  type="text" name="name" placeholder="Название"
                  required
                  minLength="2" maxLength="30" id="card-name" />
                <span className="form__input-error card-name-error"></span>
              </label>
              <label className="form__field">
                <input className="form__input form__input_text-add-card_link"
                  type="url" name="link"
                  placeholder="Ссылка&nbsp;на&nbsp;картинку" required
                  id="card-description" />
                <span className="form__input-error card-description-error"></span>
              </label>
            </fieldset>
          )}
        />

        <PopupWithForm
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          name={'avatar'}
          title={'Обновить аватар'}
          buttonText={'Сохранить'}
          children={(
            <fieldset className="form__input-container">
              <label className="form__field">
                <input className="form__input form__input_text-avatar_link"
                  type="url" name="link"
                  placeholder="Ссылка&nbsp;на&nbsp;аватар" required
                  id="avatar" />
                <span className="form__input-error avatar-error"></span>
              </label>
            </fieldset>
          )}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
