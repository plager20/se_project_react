import { useContext } from 'react';
import './WeatherCard.css';
import { weatherOptions } from '../../utils/constants';
import { defaultWeatherOptions } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? 'day' : 'night'];
  } else {
    weatherOption = filteredOptions[0];
  }

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const displayTemp =
    currentTemperatureUnit === 'F' ? weatherData.temp.F : weatherData.temp.C;

  return (
    <section className='weather-card'>
      <p className='weather-card__temp'>
        {displayTemp}&deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className='weather-card__image'
      />
    </section>
  );
}

export default WeatherCard;
