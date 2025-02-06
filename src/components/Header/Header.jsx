import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterModal,
  handleLogInModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='WTWR Logo' className='header__logo' />
      </Link>
      <p className='header__date-and-location'>
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type='button'
            className='header__add-clothes-btn'
          >
            + Add clothes
          </button>
          <Link to='/profile' className='header__link'>
            <div className='header__user-container'>
              <p className='header__username'>{currentUser.name}</p>
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name || 'User Avatar'}
                  className='header__avatar'
                />
              ) : (
                <div className='header__avatar_placeholder'>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className='header__auth-buttons'>
          <button
            onClick={handleRegisterModal}
            type='button'
            className='header__signup'
          >
            Sign Up
          </button>
          <button
            onClick={handleLogInModal}
            type='button'
            className='header__login'
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
