import React from 'react';
import Card from './Card.js';
import api from '../utils/api.js';

function Main(props) {
  const [userInfo, setUserInfo] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cards]) => {
      setUserInfo(userData);
      setCards(cards);
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user-card">
          <button className="profile__edit-avatar-button" type="button"
            title="Обновить аватар" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userInfo.avatar} alt="Аватар
              пользователя Место"/></button>
          <div className="profile__info">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button className="profile__edit-button" type="button"
              title="Редактировать профиль" onClick={props.onEditProfile}></button>
            <p className="profile__description">{userInfo.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" title="Добавить
          новое место" onClick={props.onAddCard}></button>
      </section>
      <section className="galery">
        <ul className="galery__cards">
          {
            cards.map((card, id) => (
              <Card
                key={id}
                card={card}
                title={card.name}
                imageSrc={card.link}
                likesNum={card.likes.length}
                onCardClick={props.onCardClick}
              />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;
