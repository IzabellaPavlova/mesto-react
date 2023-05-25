function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li>
      <article className="card">
        <img className="card__image" alt={props.card.name} src={props.card.link} title="Просмотреть фото" onClick={handleClick} />
        <div className="card__description">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-container">
            <button className="card__like-button" type="button"
              title="Понравилось"></button>
            <p className="card__like-count">{props.card.likes.length}</p>
          </div>
        </div>
        <button className="card__delete-button" type="button" title="Удалить"></button>
      </article>
    </li>
  )
}

export default Card;
