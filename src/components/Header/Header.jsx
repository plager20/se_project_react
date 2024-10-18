import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';

function Header({ handleAddClick, weatherData }) {
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
      <button
        onClick={handleAddClick}
        type='button'
        className='header__add-clothes-btn'
      >
        + Add clothes
      </button>
      <Link to='/profile' className='header__link'>
        <div className='header__user-container'>
          <p className='header__username'>Terrence Tegegne</p>
          <img src={avatar} alt='Terrence Tegegne' className='header__avatar' />
        </div>
      </Link>
    </header>
  );
}

export default Header;
