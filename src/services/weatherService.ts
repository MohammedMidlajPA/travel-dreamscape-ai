
import { getWeatherApiKey } from './apiKeyService';

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  cityName: string;
}

export async function getWeather(city: string): Promise<WeatherData> {
  const apiKey = getWeatherApiKey();
  
  if (!apiKey) {
    throw new Error('Weather API key is not set');
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cityName: data.name
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
