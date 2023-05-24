function Card(props) {
    function handleClick() {
      props.onCardClick(props.card);
    }

    return (
        <li>
            <article className="card">
            <img className="card__image" alt={props.title} src={props.imageSrc} title="Просмотреть фото" onClick={handleClick}/>
            <div className="card__description">
                <h2 className="card__title">{props.title}</h2>
                <div className="card__like-container">
                <button className="card__like-button" type="button"
                    title="Понравилось"></button>
                    <p className="card__like-count">{props.likesNum}</p>
                </div>
            </div>
            <button className="card__delete-button" type="button" title="Удалить"></button>
            </article>
        </li>
    )
}

export default Card;
