import React from 'react';
import styled from 'styled-components';

const ForecastContainer = styled.div`
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  `;

const ForecastButton = styled.button`
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ForecastTitle = styled.h2`
  color: #333;
  text-align: center;
`;

const ForecastInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  align-items: center;
`;

const ForecastDay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ForecastIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

function WeatherForecast({
  city,
  setLoading,
  setForecast,
  setError,
  clearResults,
  forecast,
  loading,
  error
}) {
  const getForecast = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    clearResults();
    setLoading(true);
    setError(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForecastContainer>
      <ForecastTitle>Weather Forecast</ForecastTitle>
      <ForecastButton onClick={getForecast}>Get Weather Forecast</ForecastButton>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {forecast && forecast.forecast && forecast.forecast.forecastday && (
        <ForecastInfo>
          {forecast.forecast.forecastday.map((day, index) => (
            <ForecastDay key={index}>
              <ForecastIcon src={day.day.condition.icon} alt={day.day.condition.text} />
              <div>
                <h3>{day.date}</h3>
                <p>{day.day.condition.text}</p>
                <p>Avg Temp: {day.day.avgtemp_f}°F</p>
                <p>Max Temp: {day.day.maxtemp_f}°F</p>
              </div>
            </ForecastDay>
          ))}
        </ForecastInfo>
      )}
    </ForecastContainer>
  );
}

export default WeatherForecast;
