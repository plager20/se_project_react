import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from '../../utils/api';
import DeleteModal from '../DeleteModal/DeleteModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { register, logIn, getUserInfo, editUserInfo } from '../../utils/auth';
import { getToken, removeToken, setToken } from '../../utils/token';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const handleRegistration = (data) => {
    register(data)
      .then(() => {
        handleLogIn({ email: data.email, password: data.password });
      })
      .catch(console.error);
  };

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    logIn({ email, password })
      .then((data) => {
        if (!data.token) console.error('JWT Token not found');
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname || '/profile';
        navigate(redirectPath);
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Error logging in: ', err);
      });
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    removeToken();
    navigate('/');
  };

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      getUserInfo(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedInLoading(false);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Invalid token: ', err);
          removeToken();
          setIsLoggedInLoading(false);
        });
    } else {
      setIsLoggedInLoading(false);
    }
  }, []);

  const handleRegisterModal = () => {
    setActiveModal('register');
  };

  const handleLogInModal = () => {
    setActiveModal('login');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleDeleteClick = () => {
    setActiveModal('delete');
  };

  const handleEditProfileModal = () => {
    setActiveModal('edit');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  const onAddItem = (name, weather, link) => {
    const token = getToken();
    if (!token) {
      console.error('No token found');
      return;
    }

    postItems({ name, weather, link }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const handleDeleteCard = (id) => {
    const token = getToken();
    if (!token) {
      console.error('No token found');
      return;
    }

    deleteItems(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C');
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F');
  };

  const handleEditUser = ({ name, avatar }) => {
    const token = localStorage.getItem('jwt');
    editUserInfo({ name, avatar }, token)
      .then((newData) => {
        setCurrentUser(newData);
        closeActiveModal();
      })
      .catch((err) => console.error('Edit profile error:', err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className='app_content'>
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterModal={handleRegisterModal}
              handleLogInModal={handleLogInModal}
            />
            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path='/profile'
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleEditProfileModal={handleEditProfileModal}
                      onCardLike={handleCardLike}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === 'add-garment'}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteClick={handleDeleteClick}
          />
          <DeleteModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleDeleteCard={handleDeleteCard}
            card={selectedCard}
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === 'register'}
            handleRegistration={handleRegistration}
          />
          <LoginModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === 'login'}
            handleLogIn={handleLogIn}
          />
          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === 'edit'}
            onEdit={handleEditUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
