import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import CitySearch from './CitySearch';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearResults = () => {
    setWeather(null);
    setForecast(null);
    setError(null);
  };

  const clearAll = () => {
    setWeather(null);
    setForecast(null);
    setError(null);
    setCity('');
  };

  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
      <div>
        <CitySearch city={city} setCity={setCity} clearAll={clearAll} />
      </div>
      <div>
        <CurrentWeather
          city={city}
          setLoading={setLoading}
          setWeather={setWeather}
          setError={setError}
          clearResults={clearResults}
          weather={weather}
          loading={loading}
          error={error}
        />
        <WeatherForecast
          city={city}
          setLoading={setLoading}
          setForecast={setForecast}
          setError={setError}
          clearResults={clearResults}
          forecast={forecast}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
