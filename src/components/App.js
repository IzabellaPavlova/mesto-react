import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
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

  // Profile

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(data) {
    api.updateProfileAvatar(data).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  // Cards

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCreateCard(data) {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
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

          <EditProfilePopup
            isOpen={isProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCreateCard}
          />

          <EditAvatarPopup
            isOpen={isAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateAvatar}
          />

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
