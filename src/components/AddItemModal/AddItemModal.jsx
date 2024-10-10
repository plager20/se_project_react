import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState('');
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState('');
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
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
          maxLength='30'
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
          />
          Hot
        </label>
        <label htmlFor='warm' className='modal__label modal__label_type_radio'>
          <input
            type='radio'
            name='weather-type'
            className='modal__radio-input'
            id='warm'
          />
          Warm
        </label>
        <label htmlFor='cold' className='modal__label modal__label_type_radio'>
          <input
            type='radio'
            name='weather-type'
            className='modal__radio-input'
            id='cold'
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
