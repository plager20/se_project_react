import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function LoginModal({
  closeActiveModal,
  isOpen,
  handleLogIn,
  handleRegisterModal,
}) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleEmailChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    handleLogIn({ email: data.email, password: data.password }, resetForm);
  };

  const resetForm = () => {
    setEmail(''), setPassword('');
  };

  return (
    <ModalWithForm
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title='Log in'
    >
      <label htmlFor='login-email' className='modal__label'>
        Email
        <input
          type='email'
          name='login-email'
          className='modal__input'
          id='login-email'
          placeholder='Email'
          minLength='1'
          value={data.email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor='login-password' className='modal__label'>
        Password
        <input
          type='password'
          name='login-password'
          className='modal__input'
          id='login-password'
          placeholder='Password'
          minLength='1'
          value={data.password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <div className='login_button-container'>
        <button type='submit' className='modal__submit'>
          Login
        </button>
        <button
          className='modal__redirect-button'
          type='button'
          onClick={handleRegisterModal}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
