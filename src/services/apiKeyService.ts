
// Local storage key names
const GEMINI_API_KEY = 'gemini_api_key';
const WEATHER_API_KEY = 'weather_api_key';

// Save API keys
export const saveGeminiApiKey = (key: string): void => {
  localStorage.setItem(GEMINI_API_KEY, key);
};

export const saveWeatherApiKey = (key: string): void => {
  localStorage.setItem(WEATHER_API_KEY, key);
};

// Get API keys
export const getGeminiApiKey = (): string | null => {
  return localStorage.getItem(GEMINI_API_KEY);
};

export const getWeatherApiKey = (): string | null => {
  return localStorage.getItem(WEATHER_API_KEY);
};

// Check if API keys are set
export const areApiKeysSet = (): boolean => {
  return !!getGeminiApiKey() && !!getWeatherApiKey();
};
