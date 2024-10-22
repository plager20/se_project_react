import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState('');
  const [link, setUrl] = useState('');
  const [weather, setWeather] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, weather, link);
    closeActiveModal();
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.id);
    console.log(e.target.value);
  };

  return (
    <ModalWithForm
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title='New garment'
      buttonText='Add garment'
    >
      <label htmlFor='name' className='modal__label'>
        Name
        <input
          type='text'
          className='modal__input'
          id='name'
          placeholder='Name'
          minLength='1'
          maxLength='30'
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor='imageUrl' className='modal__label'>
        Image
        <input
          type='url'
          className='modal__input'
          id='imageUrl'
          placeholder='Image URL'
          minLength='1'
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className='modal__radio-buttons'>
        <legend className='modal__legend'>Select the weather type:</legend>
        <label htmlFor='hot' className='modal__label modal__label_type_radio'>
          <input
            type='radio'
            name='weather-type'
            className='modal__radio-input'
            id='hot'
            value='hot'
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor='warm' className='modal__label modal__label_type_radio'>
          <input
            type='radio'
            name='weather-type'
            className='modal__radio-input'
            id='warm'
            value='warm'
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor='cold' className='modal__label modal__label_type_radio'>
          <input
            type='radio'
            name='weather-type'
            className='modal__radio-input'
            id='cold'
            value='cold'
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
