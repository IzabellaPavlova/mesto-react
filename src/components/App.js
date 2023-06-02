import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false)
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false)
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    }).catch((error) => {
      console.error(error);
    });
  }, [])

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((error) => {
        console.error(error);
      });
    }
    else {
      api.removeCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <PopupWithForm
            isOpen={isProfilePopupOpen}
            onClose={closeAllPopups}
            name={'profile'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
          >
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
          </PopupWithForm>

          <PopupWithForm
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            name={'add-card'}
            title={'Новое место'}
            buttonText={'Создать'}
          >
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
          </PopupWithForm>

          <PopupWithForm
            isOpen={isAvatarPopupOpen}
            onClose={closeAllPopups}
            name={'avatar'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
          >
            <fieldset className="form__input-container">
              <label className="form__field">
                <input className="form__input form__input_text-avatar_link"
                  type="url" name="link"
                  placeholder="Ссылка&nbsp;на&nbsp;аватар" required
                  id="avatar" />
                <span className="form__input-error avatar-error"></span>
              </label>
            </fieldset>
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
