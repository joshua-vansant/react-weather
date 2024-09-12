import React from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

const WeatherContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const WeatherTitle = styled.h2`
  color: #333;
  text-align: center;
`;

const WeatherButton = styled.button`
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const WeatherInfo = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 1; 
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

function CurrentWeather({ city, setLoading, setWeather, setError, clearResults, weather, loading, error }) {

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    clearResults();
    setLoading(true);
    setError(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContainer>
      <WeatherTitle>Current Weather</WeatherTitle>
      <WeatherContent>
        <WeatherButton onClick={getWeather}>Get Current Weather</WeatherButton>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && (
          <WeatherInfo>
          <WeatherIcon src={weather.current.condition.icon} alt={weather.current.condition.text} />
          <div>
            <h2>{weather.location.name}</h2>
            <p>{weather.current.condition.text}</p>
            <p>{weather.current.temp_f}°F</p>
          </div>
        </WeatherInfo>
          
        )}
      </WeatherContent>
    </WeatherContainer>
  );
}

export default CurrentWeather;
