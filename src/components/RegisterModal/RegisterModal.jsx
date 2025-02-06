import { useEffect, useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function RegisterModal({ isOpen, closeActiveModal, handleRegistration }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(
      {
        email,
        password,
        name,
        avatar,
      },
      resetForm
    );
  };

  const resetForm = () => {
    setEmail(''), setPassword(''), setName(''), setAvatar('');
  };

  useEffect(() => {
    if (isOpen) {
      resetForm;
    }
  });

  return (
    <ModalWithForm
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title='Sign up'
      buttonText='Next'
    >
      <label htmlFor='register-email' className='modal__label'>
        Email*
        <input
          type='email'
          className='modal__input'
          id='register-email'
          name='register-email'
          placeholder='Email'
          minLength='1'
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor='register-password' className='modal__label'>
        Password*
        <input
          type='password'
          className='modal__input'
          id='register-password'
          name='register-password'
          placeholder='Password'
          minLength='1'
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label htmlFor='name' className='modal__label'>
        Name
        <input
          type='text'
          className='modal__input'
          id='register-name'
          name='name'
          placeholder='Name'
          minLength='1'
          maxLength='30'
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor='avatar' className='modal__label'>
        Image
        <input
          type='url'
          className='modal__input'
          id='register-avatar'
          name='avatar'
          placeholder='Avatar URL'
          minLength='1'
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
