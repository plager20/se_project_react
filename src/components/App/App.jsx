import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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
import { getItems } from '../../utils/api';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };
  const closeActiveModal = () => {
    setActiveModal('');
  };

  const onAddItem = (values) => {
    e.preventDefault();
    console.log(e);
    console.log(values);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C');
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F');
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
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className='app'>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className='app_content'>
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path='/'
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path='/profile'
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
          </Routes>
          <Footer />
        </div>
        {activeModal === 'add-garment' && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === 'add-garment'}
            onAddItem={onAddItem}
          />
        )}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
