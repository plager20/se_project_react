import React, { useContext } from 'react';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import Footer from '../Footer/Footer';
import { defaultClothingItems } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayTemp =
    currentTemperatureUnit === 'F' ? weatherData.temp.F : weatherData.temp.C;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className='cards'>
        <p className='cards__text'>
          Today is {displayTemp}&deg; F / You may want to wear:
        </p>
        <ul className='cards__list'>
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
