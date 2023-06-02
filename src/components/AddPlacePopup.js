import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({
      name, link
    });
  }

  return(
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'add-card'}
      title={'Новое место'}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input className="form__input form__input_text-add-card_name"
            type="text" name="name" placeholder="Название"
            required
            minLength="2" maxLength="30" id="card-name" onChange={handleNameChange} />
          <span className="form__input-error card-name-error"></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_text-add-card_link"
            type="url" name="link"
            placeholder="Ссылка&nbsp;на&nbsp;картинку" required
            id="card-description" onChange={handleLinkChange} />
          <span className="form__input-error card-description-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
